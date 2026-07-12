import { useState, useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { ConfirmDialog } from './ui';

const SUB_TABS = [
	{ id: 'sources', label: __( 'Sources', 'botisst-ai-chat-assistant' ) },
	{ id: 'vector-db', label: __( 'Vector Database', 'botisst-ai-chat-assistant' ) },
	{ id: 'indexing', label: __( 'Indexing Rules', 'botisst-ai-chat-assistant' ) },
];

const TEXT_KNOWLEDGE_HINT = __(
	'Add facts, FAQs, or company info you want the chatbot to rely on when answering.',
	'botisst-ai-chat-assistant'
);

const URLS_HINT = __(
	'We will read these pages from time to time and use what we find in replies.',
	'botisst-ai-chat-assistant'
);

export default function KnowledgeBaseTab({ settings, onSave, showNotice }) {
	const [saving, setSaving] = useState(false);
	const [indexing, setIndexing] = useState(false);
	const [indexProgress, setIndexProgress] = useState(null);
	const [stats, setStats] = useState(null);
	const [postTypes, setPostTypes] = useState([]);
	const [activeSubTab, setActiveSubTab] = useState('sources');
	const [confirmingPineconeReset, setConfirmingPineconeReset] = useState(false);

	const botSettings = settings?.chatbot || {};
	const ragSettings = settings?.rag || {};
	const hasPineconeSavedSettings = !!(
		ragSettings.vector_db?.api_key ||
		ragSettings.vector_db?.host ||
		ragSettings.vector_db?.index_name
	);

	const [knowledgeText, setKnowledgeText] = useState(botSettings.knowledge_text || '');
	const [urls, setUrls] = useState(
		Array.isArray(botSettings.knowledge_urls) && botSettings.knowledge_urls.length
			? botSettings.knowledge_urls
			: []
	);
	const [trainingFiles, setTrainingFiles] = useState(
		Array.isArray(botSettings.training_files) ? botSettings.training_files : []
	);
	const [selectedPostTypes, setSelectedPostTypes] = useState(
		ragSettings.post_types || ['post', 'page']
	);
	const [maxChunkSize, setMaxChunkSize] = useState(ragSettings.chunk_size || 1000);
	const [maxResults, setMaxResults] = useState(ragSettings.max_results || 5);
	const [vectorDb, setVectorDb] = useState(ragSettings.vector_db?.provider || 'sqlite');
	const [requireIndexedData, setRequireIndexedData] = useState(ragSettings.require_indexed_data || false);
	const [noDataMessage, setNoDataMessage] = useState(ragSettings.no_data_message || 'I don\'t have information about your question in my knowledge base. Please rephrase or ask about topics I have knowledge of.');
	const [pineconeApiKey, setPineconeApiKey] = useState(
		ragSettings.vector_db?.api_key || ''
	);

	const [pineconeHost, setPineconeHost] = useState(
		ragSettings.vector_db?.host || ''
	);

	const [pineconeIndexName, setPineconeIndexName] = useState(
		ragSettings.vector_db?.index_name || ''
	);

	const [embeddingProviderName, setEmbeddingProviderName] = useState(
		ragSettings.embeddings?.provider || 'openai'
	);

	// Get dimensions and model based on explicit selection
	const getEmbeddingProviderInfo = () => {
		const allSettings = settings || {};
		const apiKeys = allSettings.api_keys || {};

		if (embeddingProviderName === 'google') {
			const hasKey = !!apiKeys.google; // Only check Google key
			return { 
				provider: 'Google Gemini', 
				model: 'gemini-embedding-001', 
				key: hasKey ? 'google' : null, 
				dimensions: 768 
			};
		}
		
		// Default to OpenAI
		return { 
			provider: 'OpenAI', 
			model: 'text-embedding-3-small', 
			key: apiKeys.openai ? 'openai' : null, 
			dimensions: 1536 
		};
	};

	const embeddingProvider = getEmbeddingProviderInfo();

	// Index what to include checkboxes. "website" is derived from whether any
	// post type is selected below, instead of being a separate toggle, since
	// the two controls previously had to be set in sync to take effect.
	const [indexWhat, setIndexWhat] = useState({
		knowledge_text: true,
		urls: true,
		files: true,
	});

	const vectorDatabaseOptions = [
		{ value: 'sqlite', label: __('SQLite (Local)', 'botisst-ai-chat-assistant'), desc: __('Local vector storage - no setup needed', 'botisst-ai-chat-assistant') },
		{ value: 'pinecone', label: __('Pinecone (Cloud)', 'botisst-ai-chat-assistant'), desc: __('Managed cloud service - requires API key', 'botisst-ai-chat-assistant') },
		// { value: 'weaviate', label: __('Weaviate', 'botisst-ai-chat-assistant'), desc: __('Self-hosted or cloud - requires host URL', 'botisst-ai-chat-assistant') },
		// { value: 'milvus', label: __('Milvus', 'botisst-ai-chat-assistant'), desc: __('Open-source - requires host and port', 'botisst-ai-chat-assistant') },
	];

	useEffect(() => {
		fetchPostTypes();
		fetchRAGStats();
	}, []);

	const fetchPostTypes = async () => {
		try {
			const response = await apiFetch({
				path: '/baca/v1/rag/post-types',
				method: 'GET',
			});
			setPostTypes(response.types || []);
		} catch (error) {
			console.error('Failed to fetch post types:', error);
		}
	};

	const fetchRAGStats = async () => {
		try {
			const response = await apiFetch({
				path: '/baca/v1/rag/stats',
				method: 'GET',
			});
			setStats(response);
		} catch (error) {
			console.error('Failed to fetch RAG stats:', error);
		}
	};

	const updateUrl = (index, value) => {
		setUrls((prev) => {
			const next = [...prev];
			next[index] = value;
			return next;
		});
	};

	const removeUrl = (index) => {
		setUrls((prev) => prev.filter((_, idx) => idx !== index));
	};

	const handleTogglePostType = (postType) => {
		setSelectedPostTypes((prev) => {
			if (prev.includes(postType)) {
				return prev.filter((pt) => pt !== postType);
			}
			return [...prev, postType];
		});
	};

	// Indexing and embedding now run in background batches on the server
	// (see baca_index_rag_content), so the REST call returns immediately
	// with status "queued" and we poll for progress instead of assuming
	// the work is done when the request resolves.
	const pollIndexStatus = () => {
		const poll = async () => {
			let response;
			try {
				response = await apiFetch({ path: '/baca/v1/rag/index/status', method: 'GET' });
				setIndexProgress(response);
			} catch (error) {
				console.error('Failed to fetch indexing status:', error);
				setIndexing(false);
				return;
			}

			if (response.status === 'indexing' || response.status === 'embedding') {
				setTimeout(poll, 2000);
				return;
			}

			setIndexing(false);
			fetchRAGStats();
		};

		poll();
	};

	const handleIndexContent = async () => {
		const indexWebsite = selectedPostTypes.length > 0;
		const typesToIndex = indexWebsite ? [...selectedPostTypes] : [];

		const indexSources = {
			knowledge_text: indexWhat.knowledge_text,
			urls: indexWhat.urls,
			files: indexWhat.files,
			website: indexWebsite,
		};

		if (typesToIndex.length === 0) {
			showNotice(__('Please select at least one content type to index or enable website indexing', 'botisst-ai-chat-assistant'), 'error');
			return;
		}

		setIndexing(true);
		setIndexProgress(null);
		try {
			const response = await apiFetch({
				path: '/baca/v1/rag/index',
				method: 'POST',
				data: {
					post_types: typesToIndex,

					index_sources:
						indexSources,
				},
			});

			if (!response.success) {
				showNotice(response.message || __('Failed to start indexing', 'botisst-ai-chat-assistant'), 'error');
				setIndexing(false);
				return;
			}

			showNotice(response.message || __('Content indexing started!', 'botisst-ai-chat-assistant'));

			if (response.status === 'queued') {
				pollIndexStatus();
			} else {
				setIndexing(false);
				fetchRAGStats();
			}
		} catch (error) {
			console.error('Indexing error:', error);
			showNotice(
				error.message || __('Failed to index content', 'botisst-ai-chat-assistant'),
				'error'
			);
			setIndexing(false);
		}
	};

	const indexProgressPercent = (() => {
		if (!indexProgress) {
			return 0;
		}
		if (indexProgress.status === 'indexing' && indexProgress.docs_total > 0) {
			return Math.round((indexProgress.docs_processed / indexProgress.docs_total) * 100);
		}
		if (indexProgress.status === 'embedding' && indexProgress.embed_total > 0) {
			return Math.round((indexProgress.embed_processed / indexProgress.embed_total) * 100);
		}
		if (indexProgress.status === 'completed') {
			return 100;
		}
		return 0;
	})();

	const indexProgressLabel = (() => {
		if (!indexProgress) {
			return '';
		}
		if (indexProgress.status === 'indexing') {
			return sprintf(
				__('Indexing documents… %1$d/%2$d', 'botisst-ai-chat-assistant'),
				indexProgress.docs_processed,
				indexProgress.docs_total
			);
		}
		if (indexProgress.status === 'embedding') {
			return indexProgress.embed_total > 0
				? sprintf(
					__('Generating embeddings… %1$d/%2$d', 'botisst-ai-chat-assistant'),
					indexProgress.embed_processed,
					indexProgress.embed_total
				)
				: __('Generating embeddings…', 'botisst-ai-chat-assistant');
		}
		return '';
	})();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSaving(true);
		const fileIds = trainingFiles.map((f) => (typeof f === 'object' ? f.id : parseInt(f, 10)));
		const filteredUrls = urls.filter((u) => !!u.trim());

		const botPayload = {
			knowledge_text: knowledgeText,
			knowledge_urls: filteredUrls,
			training_files: fileIds,
		};

		const ragPayload = {
			post_types: selectedPostTypes,

			chunk_size: parseInt(
				maxChunkSize,
				10
			),

			max_results: parseInt(
				maxResults,
				10
			),

			require_indexed_data: requireIndexedData,
			no_data_message: noDataMessage,

			vector_db: {
				provider: vectorDb,

				api_key:
					vectorDb === 'pinecone'
						? pineconeApiKey
						: '',

				host:
					vectorDb === 'pinecone'
						? pineconeHost
						: '',

				index_name:
					vectorDb === 'pinecone'
						? pineconeIndexName
						: '',
			},

			embeddings: {
				provider: embeddingProviderName,
			},
		};

		try {
			// Save bot settings
			await apiFetch({
				path: '/baca/v1/save-bot-settings',
				method: 'POST',
				data: botPayload,
			});

			// Save RAG settings
			await apiFetch({
				path: '/baca/v1/rag/settings',
				method: 'POST',
				data: ragPayload,
			});

			onSave({
				chatbot: { ...botSettings, ...botPayload },
				rag: { ...ragSettings, ...ragPayload }
			});
			showNotice(__('Knowledge base and RAG settings saved successfully!', 'botisst-ai-chat-assistant'));
		} catch (error) {
			console.error('Save error:', error);
			showNotice(error.message || __('Failed to save settings', 'botisst-ai-chat-assistant'), 'error');
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="baca-kb-settings">
			<nav className="baca-kb-subnav" role="tablist" aria-label={__('Knowledge base sections', 'botisst-ai-chat-assistant')}>
				{SUB_TABS.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={activeSubTab === tab.id}
						className={`baca-kb-subtab ${activeSubTab === tab.id ? 'active' : ''}`}
						onClick={() => setActiveSubTab(tab.id)}
					>
						{tab.label}
					</button>
				))}
			</nav>
			<form onSubmit={handleSubmit}>
				<div className={activeSubTab === 'sources' ? '' : 'baca-kb-panel--hidden'}>
				<article className="baca-kb-card">
					<header className="baca-kb-card__header">
						<span className="baca-kb-card__icon" aria-hidden="true">
							<span className="dashicons dashicons-media-text" />
						</span>
						<div className="baca-kb-card__heading">
							<h3 className="baca-kb-card__title">
								{__('Direct Text Knowledge', 'botisst-ai-chat-assistant')}
							</h3>
							<p className="baca-kb-card__desc">{TEXT_KNOWLEDGE_HINT}</p>
						</div>
					</header>
					<div className="baca-kb-card__body">
						<textarea
							className="baca-kb-textarea"
							rows="8"
							value={knowledgeText}
							onChange={(e) => setKnowledgeText(e.target.value)}
							placeholder={__('Enter factual information directly…', 'botisst-ai-chat-assistant')}
						/>
					</div>
				</article>

				<article className="baca-kb-card">
					<header className="baca-kb-card__header">
						<span className="baca-kb-card__icon" aria-hidden="true">
							<span className="dashicons dashicons-admin-site-alt3" />
						</span>
						<div className="baca-kb-card__heading">
							<h3 className="baca-kb-card__title">
								{__('Web Pages (URLs)', 'botisst-ai-chat-assistant')}
							</h3>
							<p className="baca-kb-card__desc">{URLS_HINT}</p>
						</div>
					</header>
					<div className="baca-kb-card__body">
						<div className="baca-kb-url-list">
							{urls.map((url, i) => (
								<div key={i} className="baca-kb-url-item">
									<span className="baca-kb-url-item__icon dashicons dashicons-admin-links" aria-hidden="true" />
									<input
										type="url"
										className="baca-kb-url-input"
										value={url}
										onChange={(e) => updateUrl(i, e.target.value)}
										placeholder="https://example.com/page"
									/>
									<button
										type="button"
										className="baca-kb-url-remove"
										onClick={() => removeUrl(i)}
										aria-label={__('Remove URL', 'botisst-ai-chat-assistant')}
									>
										<span className="dashicons dashicons-trash" aria-hidden="true" />
									</button>
								</div>
							))}
						</div>
						<button
							type="button"
							className="baca-kb-add-url"
							onClick={() => setUrls([...urls, ''])}
						>
							{__('+ Add URL', 'botisst-ai-chat-assistant')}
						</button>
					</div>
				</article>

				</div>

				<div className={activeSubTab === 'vector-db' ? '' : 'baca-kb-panel--hidden'}>
				{/* Vector Database Selection */}
				<article className="baca-kb-card">
					<header className="baca-kb-card__header">
						<span className="baca-kb-card__icon" aria-hidden="true">
							<span className="dashicons dashicons-database" />
						</span>
						<div className="baca-kb-card__heading">
							<h3 className="baca-kb-card__title">
								{__('Vector Database', 'botisst-ai-chat-assistant')}
							</h3>
							<p className="baca-kb-card__desc">
								{__('Choose where to store your document embeddings for semantic search.', 'botisst-ai-chat-assistant')}
							</p>
						</div>
					</header>
					<div className="baca-kb-card__body">
						<div className="baca-kb-db-options">
							{vectorDatabaseOptions.map((option) => (
								<label key={option.value} className="baca-radio-card">
									<input
										type="radio"
										name="vector_db"
										value={option.value}
										checked={vectorDb === option.value}
										onChange={(e) => setVectorDb(e.target.value)}
									/>
									<span className="baca-radio-card__label">
										<strong>{option.label}</strong>
										<br />
										<small>{option.desc}</small>
									</span>
								</label>
							))}
						</div>
					</div>
				</article>


				{vectorDb === 'pinecone' && (
					<article className="baca-kb-card">

						<header className="baca-kb-card__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
							<div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', minWidth: 0, flex: 1 }}>
								<span className="baca-kb-card__icon" aria-hidden="true" style={{ flexShrink: 0 }}>
									<span className="dashicons dashicons-cloud" />
								</span>
								<div className="baca-kb-card__heading" style={{ minWidth: 0 }}>
									<h3 className="baca-kb-card__title">
										{__('Pinecone Configuration', 'botisst-ai-chat-assistant')}
									</h3>
									<p className="baca-kb-card__desc" style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
										{__('Connect your Pinecone cloud vector database.', 'botisst-ai-chat-assistant')} 
										{' '}
										<a href="https://app.pinecone.io/" target="_blank" rel="noopener noreferrer" style={{ fontWeight: '500' }}>
											{__('Open Pinecone Console', 'botisst-ai-chat-assistant')} &rarr;
										</a>
									</p>
								</div>
							</div>
							{hasPineconeSavedSettings && (
								<button
									type="button"
									className="baca-btn baca-btn-secondary baca-btn-sm"
									onClick={() => setConfirmingPineconeReset(true)}
									style={{ fontSize: '0.8125rem', padding: '0.5rem 0.875rem', flexShrink: 0 }}
								>
									{__('Reset Settings', 'botisst-ai-chat-assistant')}
								</button>
							)}
						</header>

						<div className="baca-kb-card__body">

							{embeddingProvider.dimensions && (
								<div className="baca-kb-info-block">
									<p>
										<strong>{__('Important:', 'botisst-ai-chat-assistant')}</strong>
										{' '}
										{__('Because you are using', 'botisst-ai-chat-assistant')} <strong>{embeddingProvider.provider}</strong>, {__('you must create your Pinecone index with exactly', 'botisst-ai-chat-assistant')} <strong>{embeddingProvider.dimensions} {__('dimensions', 'botisst-ai-chat-assistant')}</strong>.
									</p>
									<p>
										<em>{__('Note: If you change your API provider later, you must delete your Pinecone index, create a new one with the new dimensions, and click "Index Content" again.', 'botisst-ai-chat-assistant')}</em>
									</p>
								</div>
							)}

							<div className="baca-kb-form-group">
								<label className="baca-label">
									{__('Pinecone API Key', 'botisst-ai-chat-assistant')}
									<input
										type="password"
										className="baca-input"
										value={pineconeApiKey}
										onChange={(e) => setPineconeApiKey(e.target.value)}
										placeholder="pcsk_..."
									/>
								</label>
								<p className="baca-hint">
									{__('You can generate an API key from the "API Keys" section in your Pinecone dashboard.', 'botisst-ai-chat-assistant')}
								</p>
							</div>

							<div className="baca-kb-form-group">
								<label className="baca-label">
									{__('Pinecone Host', 'botisst-ai-chat-assistant')}
									<input
										type="text"
										className="baca-input"
										value={pineconeHost}
										onChange={(e) => setPineconeHost(e.target.value)}
										placeholder="https://index-xxxxx.svc.aped-4627-b74a.pinecone.io"
									/>
								</label>
								<p className="baca-hint">
									{__('The host URL for your index. Find this by clicking on your index in the Pinecone dashboard.', 'botisst-ai-chat-assistant')}
								</p>
							</div>

							<div className="baca-kb-form-group">
								<label className="baca-label">
									{__('Index Name', 'botisst-ai-chat-assistant')}
									<input
										type="text"
										className="baca-input"
										value={pineconeIndexName}
										onChange={(e) => setPineconeIndexName(e.target.value)}
										placeholder="e.g. botisst-index"
									/>
								</label>
								<p className="baca-hint">
									{__('The exact name of the index you created.', 'botisst-ai-chat-assistant')}
								</p>
							</div>

							{hasPineconeSavedSettings && (
								<div className="baca-kb-pinecone-reset">
									<button
										type="button"
										className="baca-btn baca-btn-secondary"
										onClick={() => setConfirmingPineconeReset(true)}
									>
										{__('Reset Pinecone Settings', 'botisst-ai-chat-assistant')}
									</button>
									<p className="baca-hint">
										{__('Click this to clear your Pinecone API Key, Host, and Index Name.', 'botisst-ai-chat-assistant')}
									</p>
								</div>
							)}

						</div>

					</article>
				)}

				{/* Embedding Provider Info */}
				<article className="baca-kb-card">
					<header className="baca-kb-card__header">
						<span className="baca-kb-card__icon" aria-hidden="true">
							<span className="dashicons dashicons-lightbulb" />
						</span>
						<div className="baca-kb-card__heading">
							<h3 className="baca-kb-card__title">
								{__('Embedding Configuration', 'botisst-ai-chat-assistant')}
							</h3>
							<p className="baca-kb-card__desc">
								{__('Select the AI provider to generate vector embeddings.', 'botisst-ai-chat-assistant')}
							</p>
						</div>
					</header>
					<div className="baca-kb-card__body">
						<div className="baca-kb-form-group">
							<label className="baca-label">
								{__('Embedding Provider', 'botisst-ai-chat-assistant')}
								<select
									className="baca-select baca-kb-embedding-select"
									value={embeddingProviderName}
									onChange={(e) => setEmbeddingProviderName(e.target.value)}
								>
									<option value="openai">{__('OpenAI (text-embedding-3-small)', 'botisst-ai-chat-assistant')}</option>
									<option value="google">{__('Google Gemini (gemini-embedding-001)', 'botisst-ai-chat-assistant')}</option>
								</select>
							</label>
							<p className="baca-hint">
								{__('Select the provider to use for processing your knowledge base into vectors.', 'botisst-ai-chat-assistant')}
							</p>
						</div>

						<div className="baca-kb-info-block">
							<p>
								<strong>{__('Status:', 'botisst-ai-chat-assistant')}</strong>
								{embeddingProvider.key ? (
									<span className="baca-kb-status baca-kb-status--ok">
										✓ {__('API Key Configured', 'botisst-ai-chat-assistant')}
									</span>
								) : (
									<span className="baca-kb-status baca-kb-status--missing">
										✗ {__('API Key Missing', 'botisst-ai-chat-assistant')}
									</span>
								)}
							</p>
							<p>
								<strong>{__('Required Index Dimensions:', 'botisst-ai-chat-assistant')}</strong> {embeddingProvider.dimensions}
							</p>
							{!embeddingProvider.key && (
								<p className="baca-kb-warning">
									{__('⚠️ No AI API key found for the selected provider. Please add an API key in the API Keys tab to enable RAG indexing.', 'botisst-ai-chat-assistant')}
								</p>
							)}
						</div>
					</div>
				</article>
				</div>

				<div className={activeSubTab === 'indexing' ? '' : 'baca-kb-panel--hidden'}>

				{/* RAG Content to Index */}
				<article className="baca-kb-card">
						<header className="baca-kb-card__header">
							<span className="baca-kb-card__icon" aria-hidden="true">
								<span className="dashicons dashicons-media-text" />
							</span>
							<div className="baca-kb-card__heading">
								<h3 className="baca-kb-card__title">
									{__('Website Content to Index', 'botisst-ai-chat-assistant')}
								</h3>
								<p className="baca-kb-card__desc">
									{__('Select which post types to include. Leave all unchecked to skip indexing your website content.', 'botisst-ai-chat-assistant')}
								</p>
							</div>
						</header>
						<div className="baca-kb-card__body">
							<div className="baca-kb-post-types">
								{postTypes.length > 0 ? (
									postTypes.map((pt) => (
										<label key={pt.value} className="baca-checkbox">
											<input
												type="checkbox"
												checked={selectedPostTypes.includes(pt.value)}
												onChange={() => handleTogglePostType(pt.value)}
											/>
											<span className="baca-checkbox__label">
												{pt.label} ({pt.count})
											</span>
										</label>
									))
								) : (
									<p className="baca-hint">{__('No post types available.', 'botisst-ai-chat-assistant')}</p>
								)}
							</div>

							{indexing && indexProgress && (
								<div className="baca-kb-index-progress" role="status">
									<div className="baca-kb-index-progress__bar">
										<div
											className="baca-kb-index-progress__fill"
											style={{ width: `${indexProgressPercent}%` }}
										/>
									</div>
									<p className="baca-kb-index-progress__label">
										{indexProgressLabel}
									</p>
								</div>
							)}
						</div>
					</article>
				</div>

				<footer className="baca-kb-footer">
					<button type="submit" className="baca-btn baca-btn-primary" disabled={saving}>
						<span className="dashicons dashicons-saved" aria-hidden="true" />
						{saving
							? __('Saving…', 'botisst-ai-chat-assistant')
							: __('Save All Settings', 'botisst-ai-chat-assistant')}
					</button>

					{activeSubTab === 'indexing' && selectedPostTypes.length > 0 && (
						<button
							type="button"
							className="baca-btn baca-btn-secondary"
							onClick={handleIndexContent}
							disabled={indexing}
						>
							<span className="dashicons dashicons-update" aria-hidden="true" />
							{indexing
								? __('Indexing…', 'botisst-ai-chat-assistant')
								: __('Index Content Now', 'botisst-ai-chat-assistant')}
						</button>
					)}
				</footer>
			</form>

			<ConfirmDialog
				open={confirmingPineconeReset}
				title={__('Reset Pinecone settings', 'botisst-ai-chat-assistant')}
				message={__('Are you sure you want to clear your Pinecone API Key, Host, and Index Name?', 'botisst-ai-chat-assistant')}
				confirmLabel={__('Reset Pinecone Settings', 'botisst-ai-chat-assistant')}
				onCancel={() => setConfirmingPineconeReset(false)}
				onConfirm={async () => {
					setConfirmingPineconeReset(false);
					setSaving(true);
					try {
						const resetRagPayload = {
							...ragSettings,
							vector_db: {
								provider: vectorDb,
								api_key: '',
								host: '',
								index_name: '',
							}
						};

						await apiFetch({
							path: '/baca/v1/rag/settings',
							method: 'POST',
							data: resetRagPayload,
						});

						setPineconeApiKey('');
						setPineconeHost('');
						setPineconeIndexName('');

						onSave({
							rag: {
								...ragSettings,
								vector_db: {
									...ragSettings.vector_db,
									api_key: '',
									host: '',
									index_name: '',
								}
							}
						});

						showNotice(__('Pinecone settings reset successfully!', 'botisst-ai-chat-assistant'));
					} catch (error) {
						showNotice(error.message || __('Failed to reset Pinecone settings', 'botisst-ai-chat-assistant'), 'error');
					} finally {
						setSaving(false);
					}
				}}
			/>
		</div>
	);
}


