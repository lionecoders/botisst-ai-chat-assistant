/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/Dashboard.jsx"
/*!*********************************!*\
  !*** ./src/admin/Dashboard.jsx ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dashboard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ApiKeysTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ApiKeysTab */ "./src/admin/components/ApiKeysTab.jsx");
/* harmony import */ var _components_ChatbotSettingsTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ChatbotSettingsTab */ "./src/admin/components/ChatbotSettingsTab.jsx");
/* harmony import */ var _components_DisplaySettingsTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/DisplaySettingsTab */ "./src/admin/components/DisplaySettingsTab.jsx");
/* harmony import */ var _components_InstructionsTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/InstructionsTab */ "./src/admin/components/InstructionsTab.jsx");
/* harmony import */ var _components_KnowledgeBaseTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/KnowledgeBaseTab */ "./src/admin/components/KnowledgeBaseTab.jsx");
/* harmony import */ var _components_ChatSessionsTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/ChatSessionsTab */ "./src/admin/components/ChatSessionsTab.jsx");
/* harmony import */ var _components_ChatPreviewTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/ChatPreviewTab */ "./src/admin/components/ChatPreviewTab.jsx");
/* harmony import */ var _components_SetupWizard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/SetupWizard */ "./src/admin/components/SetupWizard.jsx");











const TABS = [{
  id: 'api-keys',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API Keys', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-rest-api',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Configure your AI providers and select your preferred chatbot models.', 'botisst-ai-chat-assistant'),
  component: _components_ApiKeysTab__WEBPACK_IMPORTED_MODULE_3__["default"]
}, {
  id: 'chatbot-settings',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chatbot', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-admin-settings',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customize your chatbot name, greeting message, and behavioral features.', 'botisst-ai-chat-assistant'),
  component: _components_ChatbotSettingsTab__WEBPACK_IMPORTED_MODULE_4__["default"]
}, {
  id: 'display-settings',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display Options', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-align-center',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Configure where and how your chatbot appears on the frontend.', 'botisst-ai-chat-assistant'),
  component: _components_DisplaySettingsTab__WEBPACK_IMPORTED_MODULE_5__["default"]
}, {
  id: 'instructions',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Instructions', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-edit',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Set how your chatbot talks, what it helps with, and how creative its replies are.', 'botisst-ai-chat-assistant'),
  component: _components_InstructionsTab__WEBPACK_IMPORTED_MODULE_6__["default"]
}, {
  id: 'knowledge-base',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Knowledge Base', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-database',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provide custom text, links, documents, and index your website content for the chatbot to learn from.', 'botisst-ai-chat-assistant'),
  component: _components_KnowledgeBaseTab__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  id: 'chat-sessions',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Sessions', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-format-chat',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View and manage recent conversations with your AI assistant.', 'botisst-ai-chat-assistant'),
  component: _components_ChatSessionsTab__WEBPACK_IMPORTED_MODULE_8__["default"]
}, {
  id: 'chat-preview',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Preview', 'botisst-ai-chat-assistant'),
  icon: 'dashicons-welcome-view-site',
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('See how your chatbot appears to your website visitors.', 'botisst-ai-chat-assistant'),
  component: _components_ChatPreviewTab__WEBPACK_IMPORTED_MODULE_9__["default"]
}];
const NAV_GROUPS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Setup', 'botisst-ai-chat-assistant'),
  items: ['api-keys', 'chatbot-settings', 'display-settings', 'instructions']
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Knowledge', 'botisst-ai-chat-assistant'),
  items: ['knowledge-base']
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Monitor', 'botisst-ai-chat-assistant'),
  items: ['chat-sessions', 'chat-preview']
}];
function Dashboard({
  settings: initialSettings
}) {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(initialSettings);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [showWizard, setShowWizard] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(!!window.baca_data?.show_setup_wizard);
  const isSaveChatEnabled = !!settings?.chatbot?.save_chat;
  const availableTabs = TABS.filter(tab => {
    if (tab.id === 'chat-sessions') {
      return isSaveChatEnabled;
    }
    return true;
  });
  const [activeTab, setActiveTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && availableTabs.some(t => t.id === hash)) {
      return hash;
    }
    return availableTabs[0].id;
  });
  const showNotice = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)((message, type = 'success') => {
    setNotice({
      message,
      type
    });
    setTimeout(() => setNotice(null), 10000);
  }, []);
  const updateSettingsData = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newData => {
    setSettings(prev => ({
      ...prev,
      ...newData
    }));
  }, []);
  const activeTabData = availableTabs.find(t => t.id === activeTab) || availableTabs[0];
  const ActiveComponent = activeTabData?.component;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!availableTabs.some(t => t.id === activeTab)) {
      const fallbackTab = availableTabs[0].id;
      setActiveTab(fallbackTab);
      window.location.hash = fallbackTab;
    }
  }, [activeTab, availableTabs]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Keep the active tab visible inside the scrollable mobile tab bar.
    const activeButton = document.querySelector('.baca-tabs .baca-tab.active');
    if (activeButton && typeof activeButton.scrollIntoView === 'function') {
      activeButton.scrollIntoView({
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [activeTab]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const syncTabFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && availableTabs.some(tab => tab.id === hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', syncTabFromHash);
    return () => window.removeEventListener('hashchange', syncTabFromHash);
  }, [availableTabs]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (showWizard) {
      const url = new URL(window.location.href);
      if (url.searchParams.has('baca_open_wizard')) {
        url.searchParams.delete('baca_open_wizard');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [showWizard]);
  const handleTabClick = tabId => () => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-dashboard-wrapper"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SetupWizard__WEBPACK_IMPORTED_MODULE_10__["default"], {
    open: showWizard,
    settings: settings,
    onSave: updateSettingsData,
    onClose: () => setShowWizard(false),
    showNotice: showNotice
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-dashboard-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-brand"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-format-chat",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Botisst', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "baca-tabs",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings sections', 'botisst-ai-chat-assistant')
  }, NAV_GROUPS.map(group => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-nav-group",
    key: group.label
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-nav-group__label"
  }, group.label), group.items.map(tabId => {
    const tab = availableTabs.find(t => t.id === tabId);
    if (!tab) {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: tab.id,
      type: "button",
      role: "tab",
      title: tab.label,
      "aria-selected": activeTab === tab.id,
      tabIndex: activeTab === tab.id ? 0 : -1,
      className: `baca-tab ${activeTab === tab.id ? 'active' : ''}`,
      onClick: handleTabClick(tab.id)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: `dashicons ${tab.icon}`,
      "aria-hidden": "true"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-tab-label"
    }, tab.label));
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("main", {
    className: "baca-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-content-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    id: "baca-tab-title"
  }, activeTabData?.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    id: "baca-tab-desc"
  }, activeTabData?.desc)), notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-toast baca-toast-${notice.type}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons ${notice.type === 'success' ? 'dashicons-yes-alt' : 'dashicons-warning'}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-toast-message"
  }, notice.message), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-toast-close",
    onClick: () => setNotice(null),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close notice', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-tab-panel active"
  }, ActiveComponent && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(ActiveComponent, {
    settings: settings,
    onSave: updateSettingsData,
    showNotice: showNotice
  }))));
}

/***/ },

/***/ "./src/admin/components/ApiKeysTab.jsx"
/*!*********************************************!*\
  !*** ./src/admin/components/ApiKeysTab.jsx ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiKeysTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./src/admin/components/ui.jsx");





const PROVIDERS = {
  openai: {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OpenAI', 'botisst-ai-chat-assistant'),
    link: 'https://platform.openai.com/settings/organization/api-keys'
  },
  google: {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Gemini', 'botisst-ai-chat-assistant'),
    link: 'https://aistudio.google.com/api-keys'
  }
};
function ApiKeysTab({
  settings,
  onSave,
  showNotice
}) {
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [resetting, setResetting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const [confirmingProvider, setConfirmingProvider] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [modelsList, setModelsList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => window.baca_data?.models_list || {});
  const [formData, setFormData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    openai_key: '',
    google_key: '',
    models: settings?.models || {},
    default_provider: settings?.chatbot?.default_provider || 'openai'
  });
  const isConnected = id => !!settings.api_keys?.[id];
  const getMaskedKey = id => settings.api_keys?.[id] || '';
  const handleModelChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      models: {
        ...prev.models,
        [id]: value
      }
    }));
  };
  const handleKeyChange = (id, value) => {
    setFormData(prev => ({
      ...prev,
      [`${id}_key`]: value
    }));
  };
  const handleReset = async provider => {
    setResetting(prev => ({
      ...prev,
      [provider]: true
    }));
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/reset-key',
        method: 'POST',
        data: {
          provider
        }
      });
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Key reset successfully!', 'botisst-ai-chat-assistant'), 'success');
      const updatedApiKeys = {
        ...settings?.api_keys
      };
      delete updatedApiKeys[provider];
      const updatedModels = {
        ...settings?.models
      };
      delete updatedModels[provider];
      onSave({
        api_keys: updatedApiKeys,
        models: updatedModels,
        chatbot: response.chatbot || settings?.chatbot
      });
      setFormData(prev => ({
        ...prev,
        [`${provider}_key`]: '',
        default_provider: response.chatbot?.default_provider || '',
        models: {
          ...prev.models,
          [provider]: ''
        }
      }));
    } catch (error) {
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to reset key', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setResetting(prev => ({
        ...prev,
        [provider]: false
      }));
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-settings',
        method: 'POST',
        data: formData
      });
      showNotice(response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved successfully!', 'botisst-ai-chat-assistant'), 'success');
      onSave({
        api_keys: response.api_keys || {},
        chatbot: response.chatbot || {}
      });
      if (response.models_list) {
        setModelsList(response.models_list);
      }
      setFormData(prev => {
        const updated = {
          ...prev
        };
        Object.keys(PROVIDERS).forEach(id => {
          updated[`${id}_key`] = '';
        });
        if (response.chatbot?.default_provider) {
          updated.default_provider = response.chatbot.default_provider;
        }
        return updated;
      });
    } catch (error) {
      let errorMsg = error.message;
      if (error.errors && typeof error.errors === 'object') {
        errorMsg = Object.values(error.errors).join(' | ');
      }
      showNotice(errorMsg || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setSaving(false);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-keys"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, Object.entries(PROVIDERS).map(([id, providerData]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    key: id,
    className: "baca-api-provider-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-api-provider-card__header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, providerData.name), isConnected(id) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-provider-toggle",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    style: {
      fontSize: '12px',
      fontWeight: '500',
      color: formData.default_provider === id ? 'var(--baca-success, #10b981)' : '#6b7280'
    }
  }, formData.default_provider === id ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'botisst-ai-chat-assistant') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inactive', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-toggle",
    htmlFor: `toggle_${id}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: `toggle_${id}`,
    type: "checkbox",
    checked: formData.default_provider === id,
    onChange: e => {
      const checked = e.target.checked;
      if (checked) {
        setFormData(prev => ({
          ...prev,
          default_provider: id
        }));
      } else {
        const other = Object.keys(PROVIDERS).find(pId => pId !== id && isConnected(pId));
        setFormData(prev => ({
          ...prev,
          default_provider: other || ''
        }));
      }
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-toggle-slider",
    "aria-hidden": "true"
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-provider-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-field__label-row"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `${id}_key`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API Key', 'botisst-ai-chat-assistant')), isConnected(id) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-api-btn-reset",
    onClick: () => setConfirmingProvider(id),
    disabled: resetting[id]
  }, resetting[id] ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Key', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: `${id}_key`,
    className: `baca-api-input${isConnected(id) ? ' baca-api-input--masked' : ''}`,
    value: isConnected(id) ? getMaskedKey(id) : formData[`${id}_key`],
    onChange: e => handleKeyChange(id, e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`Enter your ${providerData.name} API key`, 'botisst-ai-chat-assistant'),
    disabled: isConnected(id)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: providerData.link,
    className: "baca-api-help-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`Generate your ${providerData.name} API key here`, 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-external",
    "aria-hidden": "true"
  }))), isConnected(id) && modelsList[id] && Object.keys(modelsList[id]).length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-api-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: `models_${id}`
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Model', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: `models_${id}`,
    className: "baca-api-select",
    value: formData.models[id] || '',
    onChange: e => handleModelChange(id, e.target.value)
  }, Object.entries(modelsList[id]).map(([modelId, modelName]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: modelId,
    value: modelId
  }, modelName))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-api-keys-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "baca-btn baca-btn-primary",
    disabled: saving
  }, saving ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'botisst-ai-chat-assistant')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ui__WEBPACK_IMPORTED_MODULE_4__.ConfirmDialog, {
    open: !!confirmingProvider,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset API key', 'botisst-ai-chat-assistant'),
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)(`Are you sure you want to reset the ${PROVIDERS[confirmingProvider]?.name || ''} API key? This cannot be undone.`, 'botisst-ai-chat-assistant'),
    confirmLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Key', 'botisst-ai-chat-assistant'),
    busy: resetting[confirmingProvider],
    onCancel: () => setConfirmingProvider(null),
    onConfirm: () => {
      const provider = confirmingProvider;
      setConfirmingProvider(null);
      handleReset(provider);
    }
  }));
}

/***/ },

/***/ "./src/admin/components/ChatPreviewTab.jsx"
/*!*************************************************!*\
  !*** ./src/admin/components/ChatPreviewTab.jsx ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatPreviewTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


const PREVIEW_FEATURES = [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Header & User Message colors', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Assistant Name & Greeting', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Bot Avatar updates', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Message bubble styling', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Chat Launcher visibility', 'botisst-ai-chat-assistant')];
const SAMPLE_USER_MSG = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('How do I customize this chat window?', 'botisst-ai-chat-assistant');
const SAMPLE_BOT_REPLY = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("It's easy! Just use the settings in the dashboard to change the name, colors, and more.", 'botisst-ai-chat-assistant');
function ChatPreviewTab({
  settings
}) {
  const botSettings = settings?.chatbot || {};
  const primaryColor = botSettings.primary_color || '#6366f1';
  const botName = botSettings.bot_name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Botisst', 'botisst-ai-chat-assistant');
  const greetingMsg = botSettings.greeting_msg || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Hello! I am your AI assistant. How can I help you today?', 'botisst-ai-chat-assistant');
  const bubbleClass = `baca-preview-widget--${botSettings.bubble_style || 'rounded'}`;
  const avatarSrc = botSettings.bot_avatar || '';
  const avatarInitial = botName.trim().charAt(0).toUpperCase() || 'B';
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview__stage"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-preview-widget ${bubbleClass}`,
    style: {
      '--baca-preview-primary': primaryColor
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-preview-widget__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__header-main"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__avatar",
    "aria-hidden": "true"
  }, avatarSrc ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: avatarSrc,
    alt: ""
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, avatarInitial)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__info"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, botName), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-preview-widget__status"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-preview-widget__status-dot",
    "aria-hidden": "true"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Online', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-preview-widget__close",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close chat', 'botisst-ai-chat-assistant'),
    tabIndex: -1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt",
    "aria-hidden": "true"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__messages"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__row baca-preview-widget__row--bot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__bot-avatar",
    "aria-hidden": "true"
  }, avatarSrc ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: avatarSrc,
    alt: ""
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-admin-users",
    "aria-hidden": "true"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__bubble baca-preview-widget__bubble--bot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, greetingMsg))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__row baca-preview-widget__row--user"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__bubble baca-preview-widget__bubble--user"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, SAMPLE_USER_MSG))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__row baca-preview-widget__row--bot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__bot-avatar",
    "aria-hidden": "true"
  }, avatarSrc ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: avatarSrc,
    alt: ""
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-admin-users",
    "aria-hidden": "true"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview-widget__bubble baca-preview-widget__bubble--bot"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, SAMPLE_BOT_REPLY)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-preview-widget__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "baca-preview-widget__input",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type a message…', 'botisst-ai-chat-assistant'),
    disabled: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Message input', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-preview-widget__send",
    disabled: true,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Send', 'botisst-ai-chat-assistant'),
    tabIndex: -1
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview__launcher",
    style: {
      background: primaryColor
    },
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-format-chat"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("aside", {
    className: "baca-preview__panel"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-preview__panel-icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-visibility"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-preview__panel-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Live Preview', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-preview__panel-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Any changes you make in the Chatbot Settings will immediately reflect here. Test your user experience before going live.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "baca-preview__features"
  }, PREVIEW_FEATURES.map(feature => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: feature
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-preview__check",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-yes"
  })), feature)))));
}

/***/ },

/***/ "./src/admin/components/ChatSessionsTab.jsx"
/*!**************************************************!*\
  !*** ./src/admin/components/ChatSessionsTab.jsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatSessionsTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./src/admin/components/ui.jsx");





function parseMessages(content) {
  if (!content) {
    return [];
  }
  try {
    const msgs = typeof content === 'string' ? JSON.parse(content) : content;
    return Array.isArray(msgs) ? msgs : [];
  } catch {
    return [];
  }
}
function getDisplayUser(session) {
  if (session.email) {
    return session.email;
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Guest User', 'botisst-ai-chat-assistant');
}
function formatProviderLabel(provider) {
  if (!provider) {
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'botisst-ai-chat-assistant');
  }
  const labels = {
    openai: 'OpenAI',
    google: 'Google'
  };
  return labels[provider.toLowerCase()] || provider.charAt(0).toUpperCase() + provider.slice(1);
}
function getSessionMeta(session) {
  return {
    provider: session?.provider ? formatProviderLabel(session.provider) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'botisst-ai-chat-assistant'),
    model: session?.model || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'botisst-ai-chat-assistant')
  };
}
function escapeHtml(value) {
  return String(value !== null && value !== void 0 ? value : '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function getLastMessageSnippet(session) {
  const msgs = parseMessages(session.content);
  if (!msgs.length) {
    return '';
  }
  const last = msgs[msgs.length - 1];
  const text = (last?.content || '').replace(/\s+/g, ' ').trim();
  if (!text) {
    return '';
  }
  const max = 72;
  const clipped = text.length > max ? `${text.slice(0, max)}…` : text;
  return `"${clipped}"`;
}
function formatMessageTime(value) {
  if (!value) {
    return '';
  }
  const normalized = String(value).includes('T') ? value : String(value).replace(' ', 'T');
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  const now = new Date();
  const timeOpts = {
    hour: 'numeric',
    minute: '2-digit'
  };
  const dateOpts = {
    month: 'short',
    day: 'numeric',
    ...(date.getFullYear() !== now.getFullYear() ? {
      year: 'numeric'
    } : {})
  };
  return `${date.toLocaleDateString(undefined, dateOpts)} · ${date.toLocaleTimeString(undefined, timeOpts)}`;
}
function sessionMatchesSearch(session, query) {
  if (!query) {
    return true;
  }
  const q = query.toLowerCase();
  const name = getDisplayUser(session);
  const lastMsg = getLastMessageSnippet(session).toLowerCase();
  return session.session_id?.toLowerCase().includes(q) || name.toLowerCase().includes(q) || (session.provider || '').toLowerCase().includes(q) || (session.model || '').toLowerCase().includes(q) || lastMsg.includes(q);
}
function buildPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({
      length: total
    }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current]);
  if (current > 2) {
    pages.add(current - 1);
  }
  if (current < total - 1) {
    pages.add(current + 1);
  }
  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push('…');
    }
    result.push(sorted[i]);
  }
  return result;
}
function ChatSessionsTab({
  showNotice
}) {
  const [sessionsList, setSessionsList] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loadingSessions, setLoadingSessions] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [providerFilter, setProviderFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('all');
  const [currentPage, setCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
  const [perPage, setPerPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(10);
  const [selectedSession, setSelectedSession] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [modalOpen, setModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [deletingId, setDeletingId] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [confirmingSession, setConfirmingSession] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [filterOpen, setFilterOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const filterRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [loadLimit, setLoadLimit] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.baca_data?.load_limit || '100');
  const [localLimit, setLocalLimit] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(loadLimit);
  const [sortOrder, setSortOrder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(window.baca_data?.sort_order || 'desc');
  const [localPerPage, setLocalPerPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(String(perPage));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setLocalLimit(loadLimit);
  }, [loadLimit]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setLocalPerPage(String(perPage));
  }, [perPage]);
  const handleLimitCommit = val => {
    const parsed = val.trim();
    if (parsed === '') {
      setLoadLimit('all');
    } else {
      const num = parseInt(parsed, 10);
      if (!isNaN(num) && num > 0) {
        setLoadLimit(String(num));
      } else {
        setLocalLimit(loadLimit); // Reset to valid value.
      }
    }
  };
  const handlePerPageCommit = val => {
    const parsed = val.trim();
    const num = parseInt(parsed, 10);
    if (!isNaN(num) && num > 0) {
      setPerPage(num);
    } else {
      setLocalPerPage(String(perPage)); // Reset to valid value.
    }
  };
  const providers = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const set = new Set();
    sessionsList.forEach(s => {
      if (s.provider) {
        set.add(s.provider);
      }
    });
    return [...set].sort();
  }, [sessionsList]);
  const filteredSessions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return sessionsList.filter(session => {
      if (providerFilter !== 'all' && (session.provider || '') !== providerFilter) {
        return false;
      }
      return sessionMatchesSearch(session, searchQuery.trim());
    });
  }, [sessionsList, searchQuery, providerFilter]);
  const totalPages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => Math.max(1, Math.ceil(filteredSessions.length / perPage)), [filteredSessions.length, perPage]);
  const paginatedSessions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const page = Math.min(currentPage, totalPages);
    const start = (page - 1) * perPage;
    return filteredSessions.slice(start, start + perPage);
  }, [filteredSessions, currentPage, totalPages, perPage]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    let cancelled = false;
    const loadSessions = async () => {
      setLoadingSessions(true);
      try {
        const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
          path: `/baca/v1/sessions?limit=${loadLimit}&order=${sortOrder}`
        });
        if (!cancelled) {
          setSessionsList(Array.isArray(response?.sessions) ? response.sessions : []);
          if (response?.load_limit) {
            setLoadLimit(response.load_limit);
          }
          if (response?.sort_order) {
            setSortOrder(response.sort_order);
          }
        }
      } catch {
        if (!cancelled) {
          setSessionsList([]);
          showNotice?.((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not load chat sessions. Please refresh the page.', 'botisst-ai-chat-assistant'), 'error');
        }
      } finally {
        if (!cancelled) {
          setLoadingSessions(false);
        }
      }
    };
    loadSessions();
    return () => {
      cancelled = true;
    };
  }, [showNotice, loadLimit, sortOrder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setCurrentPage(1);
  }, [searchQuery, providerFilter, perPage, loadLimit, sortOrder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!filterOpen) {
      return undefined;
    }
    const handlePointerDown = event => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filterOpen]);
  const filterOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => [{
    value: 'all',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All providers', 'botisst-ai-chat-assistant')
  }, ...providers.map(provider => ({
    value: provider,
    label: formatProviderLabel(provider)
  }))], [providers]);
  const activeFilterLabel = filterOptions.find(option => option.value === providerFilter)?.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All providers', 'botisst-ai-chat-assistant');
  const selectProvider = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(value => {
    setProviderFilter(value);
    setFilterOpen(false);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selectedSession) {
      setModalOpen(true);
      document.body.classList.add('baca-modal-open');
    } else {
      setModalOpen(false);
      document.body.classList.remove('baca-modal-open');
    }
    return () => document.body.classList.remove('baca-modal-open');
  }, [selectedSession]);
  const openSession = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(session => {
    setSelectedSession(session);
  }, []);
  const closeModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setSelectedSession(null);
  }, []);
  const handleDelete = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async session => {
    setDeletingId(session.session_id);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/delete-session',
        method: 'POST',
        data: {
          session_id: session.session_id
        }
      });
      setSessionsList(prev => prev.filter(s => s.session_id !== session.session_id));
      if (selectedSession?.session_id === session.session_id) {
        closeModal();
      }
      showNotice?.((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Session deleted.', 'botisst-ai-chat-assistant'), 'success');
    } catch {
      showNotice?.((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not delete this session. Please try again.', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setDeletingId(null);
    }
  }, [selectedSession, closeModal, showNotice]);
  const handleExportCsv = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!filteredSessions.length) {
      showNotice?.((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No sessions to export.', 'botisst-ai-chat-assistant'), 'error');
      return;
    }
    const escape = val => `"${String(val !== null && val !== void 0 ? val : '').replace(/"/g, '""')}"`;
    const header = ['Email', 'Provider', 'Model', 'Last Message', 'Created', 'Updated'];
    const rows = filteredSessions.map(session => {
      const name = getDisplayUser(session);
      return [name, session.provider || '', session.model || '', getLastMessageSnippet(session).replace(/^"|"$/g, ''), session.created_at || '', session.updated_at || ''].map(escape).join(',');
    });
    const csv = [header.map(escape).join(','), ...rows].join('\n');
    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `botisst-chat-sessions-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [filteredSessions, showNotice]);
  const handlePrintTranscript = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    if (!selectedSession) {
      return;
    }
    const name = getDisplayUser(selectedSession);
    const meta = getSessionMeta(selectedSession);
    const msgs = parseMessages(selectedSession.content);
    const printWindow = window.open('', '_blank', 'width=720,height=900');
    if (!printWindow) {
      showNotice?.((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Allow pop-ups to download or print the transcript.', 'botisst-ai-chat-assistant'), 'error');
      return;
    }
    printWindow.document.write(`<!DOCTYPE html><html><head><title>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Session Transcript', 'botisst-ai-chat-assistant')}</title>
			<style>
				body { font-family: system-ui, sans-serif; padding: 2rem; color: #111827; line-height: 1.5; }
				h1 { font-size: 1.25rem; margin-bottom: 0.25rem; }
				.meta { color: #6b7280; font-size: 0.875rem; margin-bottom: 2rem; }
				.msg { margin-bottom: 1.25rem; }
				.role { font-weight: 600; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.04em; color: #6366f1; }
				.time { color: #9ca3af; font-size: 0.75rem; font-weight: 400; margin-left: 0.5rem; }
				.body { margin-top: 0.35rem; white-space: pre-wrap; }
			</style></head><body>
			<h1>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Session Transcript', 'botisst-ai-chat-assistant')}</h1>
			<p class="meta">${escapeHtml(name)}</p>
			<p class="meta"><strong>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provider', 'botisst-ai-chat-assistant')}:</strong> ${escapeHtml(meta.provider)} · <strong>${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Model', 'botisst-ai-chat-assistant')}:</strong> ${escapeHtml(meta.model)}</p>
			${msgs.map(msg => {
      const role = msg.role === 'user' ? name : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Assistant', 'botisst-ai-chat-assistant');
      return `<div class="msg"><div class="role">${role}<span class="time">${formatMessageTime(msg.created_at)}</span></div><div class="body">${msg.content.replace(/</g, '&lt;')}</div></div>`;
    }).join('')}
			</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, [selectedSession, showNotice]);
  const pageNumbers = buildPageNumbers(Math.min(currentPage, totalPages), totalPages);
  const showingFrom = filteredSessions.length ? (Math.min(currentPage, totalPages) - 1) * perPage + 1 : 0;
  const showingTo = Math.min(Math.min(currentPage, totalPages) * perPage, filteredSessions.length);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-toolbar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-toolbar__left"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-search"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-search",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "search",
    className: "baca-sessions-search__input",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search sessions…', 'botisst-ai-chat-assistant'),
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search sessions', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: filterRef,
    className: `baca-sessions-filter ${filterOpen ? 'is-open' : ''}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-sessions-filter__trigger",
    onClick: () => setFilterOpen(open => !open),
    "aria-expanded": filterOpen,
    "aria-haspopup": "listbox",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter by provider', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-filter",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-sessions-filter__label"
  }, activeFilterLabel), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons dashicons-arrow-down-alt2 baca-sessions-filter__chevron ${filterOpen ? 'is-open' : ''}`,
    "aria-hidden": "true"
  })), filterOpen && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "baca-sessions-filter__menu",
    role: "listbox",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Providers', 'botisst-ai-chat-assistant')
  }, filterOptions.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    key: option.value,
    role: "presentation"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    role: "option",
    "aria-selected": providerFilter === option.value,
    className: `baca-sessions-filter__option ${providerFilter === option.value ? 'is-selected' : ''}`,
    onClick: () => selectProvider(option.value)
  }, option.label))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-limit"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-database",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-sessions-limit__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Limit:', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    className: "baca-sessions-limit__input",
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'botisst-ai-chat-assistant'),
    value: localLimit === 'all' ? '' : localLimit,
    onChange: e => setLocalLimit(e.target.value),
    onBlur: () => handleLimitCommit(localLimit),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLimitCommit(localLimit);
        e.target.blur();
      }
    },
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sessions load limit (empty for all)', 'botisst-ai-chat-assistant'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sessions load limit', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-switcher"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `baca-sessions-switcher__btn ${sortOrder === 'desc' ? 'is-active' : ''}`,
    onClick: () => setSortOrder('desc'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort by newest first', 'botisst-ai-chat-assistant')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Newest', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `baca-sessions-switcher__btn ${sortOrder === 'asc' ? 'is-active' : ''}`,
    onClick: () => setSortOrder('asc'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort by oldest first', 'botisst-ai-chat-assistant')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Oldest', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-toolbar__right"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-sessions-export",
    onClick: handleExportCsv
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Export CSV', 'botisst-ai-chat-assistant')))), loadingSessions ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner baca-spinner--muted",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Loading sessions…', 'botisst-ai-chat-assistant'))) : sessionsList.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-empty"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-format-chat",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No sessions yet', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conversations will show up here once visitors start chatting with your bot.', 'botisst-ai-chat-assistant'))) : filteredSessions.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-empty baca-sessions-empty--compact"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-search",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No matching sessions', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Try a different search term or filter.', 'botisst-ai-chat-assistant'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-table-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
    className: "baca-sessions-table"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Email', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provider', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Created', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Last message', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
    className: "baca-sessions-table__actions-col"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Actions', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tbody", null, paginatedSessions.map(session => {
    const name = getDisplayUser(session);
    const snippet = getLastMessageSnippet(session);
    const isDeleting = deletingId === session.session_id;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", {
      key: session.session_id
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-user__name"
    }, name)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "baca-sessions-provider"
    }, session.provider ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-provider__badge"
    }, formatProviderLabel(session.provider)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-last-msg--empty"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "baca-sessions-date"
    }, session.created_at ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, formatMessageTime(session.created_at)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-last-msg--empty"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "baca-sessions-last-msg"
    }, snippet || (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-last-msg--empty"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No messages', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("td", {
      className: "baca-sessions-table__actions"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "baca-sessions-icon-btn",
      onClick: () => openSession(session),
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View session', 'botisst-ai-chat-assistant'),
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View session', 'botisst-ai-chat-assistant')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dashicons dashicons-visibility",
      "aria-hidden": "true"
    })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "baca-sessions-icon-btn baca-sessions-icon-btn--danger",
      onClick: e => {
        e.stopPropagation();
        setConfirmingSession(session);
      },
      disabled: isDeleting,
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete session', 'botisst-ai-chat-assistant'),
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete session', 'botisst-ai-chat-assistant')
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "dashicons dashicons-trash",
      "aria-hidden": "true"
    }))));
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-sessions-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-sessions-footer__count"
  }, filteredSessions.length ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: 1: start index, 2: end index, 3: total count */
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Showing %1$d–%2$d of %3$d sessions', 'botisst-ai-chat-assistant'), showingFrom, showingTo, filteredSessions.length) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No sessions', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-footer__right"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-sessions-per-page-input-wrap"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-sessions-per-page-input__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rows per page:', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    className: "baca-sessions-per-page-input__field",
    value: localPerPage,
    onChange: e => setLocalPerPage(e.target.value),
    onBlur: () => handlePerPageCommit(localPerPage),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePerPageCommit(localPerPage);
        e.target.blur();
      }
    },
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sessions per page', 'botisst-ai-chat-assistant')
  })), totalPages > 1 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "baca-sessions-pagination",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sessions pagination', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-sessions-page-btn",
    disabled: currentPage <= 1,
    onClick: () => setCurrentPage(p => Math.max(1, p - 1)),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous page', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-arrow-left-alt2",
    "aria-hidden": "true"
  })), pageNumbers.map((page, idx) => page === '…' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    key: `ellipsis-${idx}`,
    className: "baca-sessions-page-ellipsis"
  }, "\u2026") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: page,
    type: "button",
    className: `baca-sessions-page-num ${currentPage === page ? 'is-active' : ''}`,
    onClick: () => setCurrentPage(page),
    "aria-current": currentPage === page ? 'page' : undefined
  }, page)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-sessions-page-btn",
    disabled: currentPage >= totalPages,
    onClick: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next page', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-arrow-right-alt2",
    "aria-hidden": "true"
  })))))), selectedSession && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-modal baca-sessions-modal ${modalOpen ? 'is-visible' : ''}`,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "baca-session-modal-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-overlay",
    onClick: closeModal
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-modal-title-icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-format-chat"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    id: "baca-session-modal-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Session Transcript', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-modal-close",
    onClick: closeModal,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt",
    "aria-hidden": "true"
  }))), (() => {
    const meta = getSessionMeta(selectedSession);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-sessions-modal-meta"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-sessions-modal-meta__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-modal-meta__label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provider', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-modal-meta__value"
    }, meta.provider)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-sessions-modal-meta__item"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-modal-meta__label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Model', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-sessions-modal-meta__value"
    }, meta.model)));
  })(), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-body"
  }, (() => {
    const msgs = parseMessages(selectedSession.content);
    if (!msgs.length) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        className: "baca-text-muted"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No messages in this session.', 'botisst-ai-chat-assistant'));
    }
    return msgs.map((msg, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      key: i,
      className: `baca-modal-msg ${msg.role === 'user' ? 'baca-modal-msg-user' : 'baca-modal-msg-assistant'}`
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-modal-msg-content"
    }, msg.content), msg.created_at && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-modal-msg-time"
    }, formatMessageTime(msg.created_at))));
  })()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-modal-footer-link",
    onClick: handlePrintTranscript
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Print Chat Transcript', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-primary",
    onClick: closeModal
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Return to Sessions', 'botisst-ai-chat-assistant'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ui__WEBPACK_IMPORTED_MODULE_4__.ConfirmDialog, {
    open: !!confirmingSession,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete chat session', 'botisst-ai-chat-assistant'),
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete this chat session permanently? This cannot be undone.', 'botisst-ai-chat-assistant'),
    confirmLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delete Session', 'botisst-ai-chat-assistant'),
    busy: !!deletingId && confirmingSession?.session_id === deletingId,
    onCancel: () => setConfirmingSession(null),
    onConfirm: () => {
      const session = confirmingSession;
      setConfirmingSession(null);
      handleDelete(session);
    }
  }));
}

/***/ },

/***/ "./src/admin/components/ChatbotSettingsTab.jsx"
/*!*****************************************************!*\
  !*** ./src/admin/components/ChatbotSettingsTab.jsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChatbotSettingsTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




const PROVIDER_LABELS = {
  openai: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OpenAI', 'botisst-ai-chat-assistant'),
  google: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Gemini', 'botisst-ai-chat-assistant')
};
const SUB_TABS = [{
  id: 'general',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('General', 'botisst-ai-chat-assistant')
}, {
  id: 'advanced',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Advance', 'botisst-ai-chat-assistant')
}, {
  id: 'style',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Style', 'botisst-ai-chat-assistant')
}];
function ChatbotSettingsTab({
  settings,
  onSave,
  showNotice
}) {
  var _botSettings$save_cha, _botSettings$ask_emai, _botSettings$enable_p, _botSettings$rate_lim, _formData$ask_email;
  const botSettings = settings?.chatbot || {};
  const [activeSubTab, setActiveSubTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('general');
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [formData, setFormData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    bot_name: botSettings.bot_name || '',
    primary_color: botSettings.primary_color || '#6366f1',
    greeting_msg: botSettings.greeting_msg || '',
    api_error_msg: botSettings.api_error_msg || '',
    support_url: botSettings.support_url || '',
    pre_question_1: botSettings.pre_question_1 || '',
    pre_question_2: botSettings.pre_question_2 || '',
    pre_question_3: botSettings.pre_question_3 || '',
    pre_question_4: botSettings.pre_question_4 || '',
    pre_questions_bg_color: botSettings.pre_questions_bg_color || '#ffffff',
    pre_questions_text_color: botSettings.pre_questions_text_color || '#475569',
    pre_questions_border_color: botSettings.pre_questions_border_color || '#e2e8f0',
    pre_questions_border_radius: botSettings.pre_questions_border_radius || 'rounded',
    bot_avatar: botSettings.bot_avatar || '',
    bubble_style: botSettings.bubble_style || 'rounded',
    save_chat: (_botSettings$save_cha = botSettings.save_chat) !== null && _botSettings$save_cha !== void 0 ? _botSettings$save_cha : false,
    ask_email: (_botSettings$ask_emai = botSettings.ask_email) !== null && _botSettings$ask_emai !== void 0 ? _botSettings$ask_emai : false,
    enable_pre_questions: (_botSettings$enable_p = botSettings.enable_pre_questions) !== null && _botSettings$enable_p !== void 0 ? _botSettings$enable_p : false,
    rate_limit_per_minute: (_botSettings$rate_lim = botSettings.rate_limit_per_minute) !== null && _botSettings$rate_lim !== void 0 ? _botSettings$rate_lim : 20
  });
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleUploadImage = () => {
    if (!window.wp?.media) {
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('WordPress media modal is not available.', 'botisst-ai-chat-assistant'), 'error');
      return;
    }
    const frame = window.wp.media({
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select Bot Avatar', 'botisst-ai-chat-assistant'),
      button: {
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use as Avatar', 'botisst-ai-chat-assistant')
      },
      multiple: false
    });
    frame.on('select', () => {
      const attachment = frame.state().get('selection').first().toJSON();
      handleChange('bot_avatar', attachment.url);
    });
    frame.open();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-bot-settings',
        method: 'POST',
        data: formData
      });
      onSave({
        chatbot: {
          ...botSettings,
          ...formData
        }
      });
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bot settings saved successfully!', 'botisst-ai-chat-assistant'));
    } catch (error) {
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setSaving(false);
    }
  };
  const avatarInitial = (formData.bot_name || 'B').charAt(0).toUpperCase();
  const renderToggleCard = (id, title, description, checked, onChange) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-setting-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-setting-card__text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, description)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-toggle",
    htmlFor: id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    onChange: e => onChange(e.target.checked)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-toggle-slider",
    "aria-hidden": "true"
  })));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "baca-kb-subnav",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chatbot settings sections', 'botisst-ai-chat-assistant')
  }, SUB_TABS.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.id,
    type: "button",
    role: "tab",
    "aria-selected": activeSubTab === tab.id,
    className: `baca-kb-subtab ${activeSubTab === tab.id ? 'active' : ''}`,
    onClick: () => setActiveSubTab(tab.id)
  }, tab.label))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-bot-panel ${activeSubTab === 'general' ? '' : 'baca-kb-panel--hidden'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bot Identity', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col--stack"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "bot_name"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('AI Assistant Name', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "bot_name",
    className: "baca-bot-input",
    value: formData.bot_name,
    onChange: e => handleChange('bot_name', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Botisst', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This name will appear in the chat window header for your users.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "greeting_msg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Greeting Message', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "greeting_msg",
    className: "baca-bot-input baca-bot-textarea",
    rows: "4",
    value: formData.greeting_msg,
    onChange: e => handleChange('greeting_msg', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hello! I am your AI assistant. How can I help you today?', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The first message your chatbot sends to initiate a conversation.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "support_url"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Support System URL', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "support_url",
    className: "baca-bot-input",
    value: formData.support_url,
    onChange: e => handleChange('support_url', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('https://example.com/support', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The link users will be redirected to when they click "support agent" in case of errors.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "api_error_msg"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API/Server Error Message', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "api_error_msg",
    className: "baca-bot-input baca-bot-textarea",
    rows: "3",
    value: formData.api_error_msg,
    onChange: e => handleChange('api_error_msg', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('There is some error on server, please contact our [support agent]({support_url}).', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The message shown when a connection or API error occurs. You can use the {support_url} placeholder to insert the Support URL link.', 'botisst-ai-chat-assistant')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-bot-panel ${activeSubTab === 'advanced' ? '' : 'baca-kb-panel--hidden'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Security', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "rate_limit_per_minute"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Rate Limit (requests per minute per visitor)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    id: "rate_limit_per_minute",
    className: "baca-bot-input",
    min: "1",
    max: "300",
    value: formData.rate_limit_per_minute,
    onChange: e => handleChange('rate_limit_per_minute', parseInt(e.target.value, 10) || 1)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The public chat endpoint is throttled per visitor IP to stop it being used to run up your AI provider bill. Lower this if you\'re seeing abuse, or raise it if legitimate users are being blocked.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conversation Features', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-features"
  }, renderToggleCard('save_chat', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Chat History', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable user session continuity', 'botisst-ai-chat-assistant'), formData.save_chat, v => handleChange('save_chat', v)), formData.save_chat && renderToggleCard('ask_email', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Ask User Email', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Prompt user to enter their email to save chat continuity', 'botisst-ai-chat-assistant'), (_formData$ask_email = formData.ask_email) !== null && _formData$ask_email !== void 0 ? _formData$ask_email : false, v => handleChange('ask_email', v)), renderToggleCard('enable_pre_questions', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Suggested Questions', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provide quick suggestion questions to start a conversation', 'botisst-ai-chat-assistant'), formData.enable_pre_questions, v => handleChange('enable_pre_questions', v)))), formData.enable_pre_questions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Questions', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint",
    style: {
      marginBottom: '1.25rem'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Provide up to 4 suggested questions that users can click to instantly start a conversation.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-grid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_question_1"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Question 1', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "pre_question_1",
    className: "baca-bot-input",
    value: formData.pre_question_1,
    onChange: e => handleChange('pre_question_1', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. What services do you offer?', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_question_2"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Question 2', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "pre_question_2",
    className: "baca-bot-input",
    value: formData.pre_question_2,
    onChange: e => handleChange('pre_question_2', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. How can I contact support?', 'botisst-ai-chat-assistant')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_question_3"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Question 3', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "pre_question_3",
    className: "baca-bot-input",
    value: formData.pre_question_3,
    onChange: e => handleChange('pre_question_3', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. What are your pricing plans?', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_question_4"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Question 4', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "pre_question_4",
    className: "baca-bot-input",
    value: formData.pre_question_4,
    onChange: e => handleChange('pre_question_4', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. Tell me about your company.', 'botisst-ai-chat-assistant')
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Suggested Questions Styling', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-grid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_questions_bg_color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Background Color', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-color-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    id: "pre_questions_bg_color",
    className: "baca-bot-color-picker",
    value: formData.pre_questions_bg_color,
    onChange: e => handleChange('pre_questions_bg_color', e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-bot-color-value"
  }, formData.pre_questions_bg_color))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_questions_text_color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Text Color', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-color-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    id: "pre_questions_text_color",
    className: "baca-bot-color-picker",
    value: formData.pre_questions_text_color,
    onChange: e => handleChange('pre_questions_text_color', e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-bot-color-value"
  }, formData.pre_questions_text_color)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_questions_border_color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Color', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-color-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    id: "pre_questions_border_color",
    className: "baca-bot-color-picker",
    value: formData.pre_questions_border_color,
    onChange: e => handleChange('pre_questions_border_color', e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-bot-color-value"
  }, formData.pre_questions_border_color))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "pre_questions_border_radius"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Border Radius Style', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "pre_questions_border_radius",
    className: "baca-bot-select",
    value: formData.pre_questions_border_radius,
    onChange: e => handleChange('pre_questions_border_radius', e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "rounded"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rounded (Default)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "square"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Square', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "pill"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pill', 'botisst-ai-chat-assistant'))))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-bot-panel ${activeSubTab === 'style' ? '' : 'baca-kb-panel--hidden'}`
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-grid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bot Avatar', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-avatar-card",
    style: {
      margin: '0 auto'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-avatar-preview"
  }, formData.bot_avatar ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
    src: formData.bot_avatar,
    alt: ""
  }) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, avatarInitial)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-primary baca-bot-upload-btn",
    onClick: handleUploadImage
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-upload",
    "aria-hidden": "true"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upload New', 'botisst-ai-chat-assistant')), !!formData.bot_avatar && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-bot-remove-avatar",
    onClick: () => handleChange('bot_avatar', '')
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint baca-bot-hint--center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('JPG, PNG or SVG. Max size 2MB.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
    className: "baca-bot-section"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-bot-section__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Branding & Styles', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-col--stack"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "primary_color"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Primary Color', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-color-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "color",
    id: "primary_color",
    className: "baca-bot-color-picker",
    value: formData.primary_color,
    onChange: e => handleChange('primary_color', e.target.value),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Primary color', 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-bot-color-value"
  }, formData.primary_color)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Used for the chat header, launcher button, and your messages.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "bubble_style"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Bubble Style', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "bubble_style",
    className: "baca-bot-select",
    value: formData.bubble_style,
    onChange: e => handleChange('bubble_style', e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "rounded"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rounded (Default)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "square"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Square', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "pill"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pill', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Controls the corner rounding of chat message bubbles.', 'botisst-ai-chat-assistant'))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-bot-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "baca-btn baca-btn-primary",
    disabled: saving
  }, saving ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'botisst-ai-chat-assistant')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'botisst-ai-chat-assistant')))));
}

/***/ },

/***/ "./src/admin/components/DisplaySettingsTab.jsx"
/*!*****************************************************!*\
  !*** ./src/admin/components/DisplaySettingsTab.jsx ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DisplaySettingsTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




function DisplaySettingsTab({
  settings,
  onSave,
  showNotice
}) {
  var _display$entire_site, _display$show_on_mobi, _display$trigger_dela;
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const display = settings?.display || {};
  const [formData, setFormData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    entire_site: (_display$entire_site = display.entire_site) !== null && _display$entire_site !== void 0 ? _display$entire_site : false,
    show_on_mobile: (_display$show_on_mobi = display.show_on_mobile) !== null && _display$show_on_mobi !== void 0 ? _display$show_on_mobi : true,
    exclude_pages: display.exclude_pages || '',
    position: display.position || 'bottom-right',
    launcher_text: display.launcher_text || '',
    trigger_type: display.trigger_type || 'click',
    trigger_delay: (_display$trigger_dela = display.trigger_delay) !== null && _display$trigger_dela !== void 0 ? _display$trigger_dela : 5
  });
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-display-settings',
        method: 'POST',
        data: formData
      });
      onSave({
        display: {
          ...display,
          ...formData
        }
      });
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display settings saved successfully!', 'botisst-ai-chat-assistant'));
    } catch (error) {
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setSaving(false);
    }
  };
  const renderToggleCard = (id, title, description, checked, onChange, icon = null) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-setting-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-setting-card__main"
  }, icon, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-setting-card__text"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, description))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-toggle",
    htmlFor: id
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    id: id,
    type: "checkbox",
    checked: checked,
    onChange: e => onChange(e.target.checked)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-toggle-slider",
    "aria-hidden": "true"
  })));
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-display-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, renderToggleCard('entire_site', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Site-wide Chatbot', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate the chatbot across all pages of your website', 'botisst-ai-chat-assistant'), formData.entire_site, v => handleChange('entire_site', v)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-display-grid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "launcher_text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Button Text', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "launcher_text",
    className: "baca-bot-input",
    value: formData.launcher_text,
    onChange: e => handleChange('launcher_text', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('How can we help?', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "exclude_pages"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Exclude Pages (comma-separated page IDs)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "exclude_pages",
    className: "baca-bot-input",
    value: formData.exclude_pages,
    onChange: e => handleChange('exclude_pages', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. 12, 45, 103', 'botisst-ai-chat-assistant')
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "trigger_type"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Auto-Open Trigger', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "trigger_type",
    className: "baca-bot-select",
    value: formData.trigger_type,
    onChange: e => handleChange('trigger_type', e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "delay"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('On Page Load', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "click"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wait for Click', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "position"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Widget Position on Screen', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "position",
    className: "baca-bot-select",
    value: formData.position,
    onChange: e => handleChange('position', e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "bottom-right"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom Right', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "bottom-left"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Bottom Left', 'botisst-ai-chat-assistant'))))), formData.trigger_type === 'delay' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field baca-display-delay-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "trigger_delay"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Delay (seconds)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    id: "trigger_delay",
    className: "baca-bot-input",
    min: "1",
    max: "60",
    value: formData.trigger_delay,
    onChange: e => handleChange('trigger_delay', e.target.value)
  })), renderToggleCard('show_on_mobile', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show on Mobile', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Optimize interface for mobile devices', 'botisst-ai-chat-assistant'), formData.show_on_mobile, v => handleChange('show_on_mobile', v), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-display-mobile-icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-smartphone"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-display-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "baca-btn baca-btn-primary",
    disabled: saving
  }, saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'botisst-ai-chat-assistant') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'botisst-ai-chat-assistant')))));
}

/***/ },

/***/ "./src/admin/components/InstructionsTab.jsx"
/*!**************************************************!*\
  !*** ./src/admin/components/InstructionsTab.jsx ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InstructionsTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




const SYSTEM_PROMPT_HELP = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Explain how your chatbot should sound and behave—its tone, what it helps with, and any rules it should follow.', 'botisst-ai-chat-assistant');
function InstructionsTab({
  settings,
  onSave,
  showNotice
}) {
  var _botSettings$temperat, _botSettings$max_toke;
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const botSettings = settings?.chatbot || {};
  const [formData, setFormData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    system_prompt: botSettings.system_prompt || '',
    temperature: (_botSettings$temperat = botSettings.temperature) !== null && _botSettings$temperat !== void 0 ? _botSettings$temperat : 0.7,
    max_tokens: (_botSettings$max_toke = botSettings.max_tokens) !== null && _botSettings$max_toke !== void 0 ? _botSettings$max_toke : 500
  });
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-bot-settings',
        method: 'POST',
        data: formData
      });
      onSave({
        chatbot: {
          ...botSettings,
          ...formData
        }
      });
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Instructions saved successfully!', 'botisst-ai-chat-assistant'));
    } catch (error) {
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save instructions', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setSaving(false);
    }
  };
  const temperatureValue = Number(formData.temperature);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-instructions-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-instructions-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-instructions-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-edit"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-instructions-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('System Instructions', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "system_prompt",
    className: "baca-instructions-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom ChatBot Prompt', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "system_prompt",
    className: "baca-instructions-textarea",
    rows: "6",
    value: formData.system_prompt,
    onChange: e => handleChange('system_prompt', e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("For example: You're a friendly assistant on our site. Answer clearly, stay helpful, and keep replies short.", 'botisst-ai-chat-assistant')
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, SYSTEM_PROMPT_HELP))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-instructions-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-instructions-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-instructions-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-admin-settings"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-instructions-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Model Parameters', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-params-grid"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-param"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-param__head"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "temperature"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Chat Accuracy', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-instructions-value-badge"
  }, temperatureValue.toFixed(1))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "range",
    id: "temperature",
    className: "baca-instructions-range",
    min: "0",
    max: "2",
    step: "0.1",
    value: formData.temperature,
    onChange: e => handleChange('temperature', e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-range-labels"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Focused/Deterministic', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Creative', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Turn it up for more creative replies; turn it down for shorter, more predictable answers. Values above 1.0 make replies noticeably more random and are rarely needed.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-instructions-param"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "max_tokens",
    className: "baca-instructions-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max Tokens', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "number",
    id: "max_tokens",
    className: "baca-bot-input",
    value: formData.max_tokens,
    onChange: e => handleChange('max_tokens', e.target.value),
    min: "100",
    max: "8192"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-bot-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sets the longest reply the chatbot can send in one message.', 'botisst-ai-chat-assistant')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-instructions-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "baca-btn baca-btn-primary",
    disabled: saving
  }, saving ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'botisst-ai-chat-assistant')) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'botisst-ai-chat-assistant')))));
}

/***/ },

/***/ "./src/admin/components/KnowledgeBaseTab.jsx"
/*!***************************************************!*\
  !*** ./src/admin/components/KnowledgeBaseTab.jsx ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ KnowledgeBaseTab)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./src/admin/components/ui.jsx");





const SUB_TABS = [{
  id: 'sources',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sources', 'botisst-ai-chat-assistant')
}, {
  id: 'vector-db',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Database', 'botisst-ai-chat-assistant')
}, {
  id: 'indexing',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Indexing Rules', 'botisst-ai-chat-assistant')
}];
const TEXT_KNOWLEDGE_HINT = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add facts, FAQs, or company info you want the chatbot to rely on when answering.', 'botisst-ai-chat-assistant');
const URLS_HINT = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('We will read these pages from time to time and use what we find in replies.', 'botisst-ai-chat-assistant');
function KnowledgeBaseTab({
  settings,
  onSave,
  showNotice
}) {
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [indexing, setIndexing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [indexProgress, setIndexProgress] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [stats, setStats] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [postTypes, setPostTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [activeSubTab, setActiveSubTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('sources');
  const [confirmingPineconeReset, setConfirmingPineconeReset] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const botSettings = settings?.chatbot || {};
  const ragSettings = settings?.rag || {};
  const hasPineconeSavedSettings = !!(ragSettings.vector_db?.api_key || ragSettings.vector_db?.host || ragSettings.vector_db?.index_name);
  const [knowledgeText, setKnowledgeText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(botSettings.knowledge_text || '');
  const [urls, setUrls] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(Array.isArray(botSettings.knowledge_urls) && botSettings.knowledge_urls.length ? botSettings.knowledge_urls : []);
  const [trainingFiles, setTrainingFiles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(Array.isArray(botSettings.training_files) ? botSettings.training_files : []);
  const [selectedPostTypes, setSelectedPostTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.post_types || ['post', 'page']);
  const [maxChunkSize, setMaxChunkSize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.chunk_size || 1000);
  const [maxResults, setMaxResults] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.max_results || 5);
  const [vectorDb, setVectorDb] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.vector_db?.provider || 'sqlite');
  const [requireIndexedData, setRequireIndexedData] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.require_indexed_data || false);
  const [noDataMessage, setNoDataMessage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.no_data_message || 'I don\'t have information about your question in my knowledge base. Please rephrase or ask about topics I have knowledge of.');
  const [pineconeApiKey, setPineconeApiKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.vector_db?.api_key || '');
  const [pineconeHost, setPineconeHost] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.vector_db?.host || '');
  const [pineconeIndexName, setPineconeIndexName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.vector_db?.index_name || '');
  const [embeddingProviderName, setEmbeddingProviderName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(ragSettings.embeddings?.provider || 'openai');

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
  const [indexWhat, setIndexWhat] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)({
    knowledge_text: true,
    urls: true,
    files: true
  });
  const vectorDatabaseOptions = [{
    value: 'sqlite',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SQLite (Local)', 'botisst-ai-chat-assistant'),
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Local vector storage - no setup needed', 'botisst-ai-chat-assistant')
  }, {
    value: 'pinecone',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone (Cloud)', 'botisst-ai-chat-assistant'),
    desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Managed cloud service - requires API key', 'botisst-ai-chat-assistant')
  }
  // { value: 'weaviate', label: __('Weaviate', 'botisst-ai-chat-assistant'), desc: __('Self-hosted or cloud - requires host URL', 'botisst-ai-chat-assistant') },
  // { value: 'milvus', label: __('Milvus', 'botisst-ai-chat-assistant'), desc: __('Open-source - requires host and port', 'botisst-ai-chat-assistant') },
  ];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchPostTypes();
    fetchRAGStats();
  }, []);
  const fetchPostTypes = async () => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/post-types',
        method: 'GET'
      });
      setPostTypes(response.types || []);
    } catch (error) {
      console.error('Failed to fetch post types:', error);
    }
  };
  const fetchRAGStats = async () => {
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/stats',
        method: 'GET'
      });
      setStats(response);
    } catch (error) {
      console.error('Failed to fetch RAG stats:', error);
    }
  };
  const updateUrl = (index, value) => {
    setUrls(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };
  const removeUrl = index => {
    setUrls(prev => prev.filter((_, idx) => idx !== index));
  };
  const handleTogglePostType = postType => {
    setSelectedPostTypes(prev => {
      if (prev.includes(postType)) {
        return prev.filter(pt => pt !== postType);
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
        response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
          path: '/baca/v1/rag/index/status',
          method: 'GET'
        });
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
      website: indexWebsite
    };
    if (typesToIndex.length === 0) {
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Please select at least one content type to index or enable website indexing', 'botisst-ai-chat-assistant'), 'error');
      return;
    }
    setIndexing(true);
    setIndexProgress(null);
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/index',
        method: 'POST',
        data: {
          post_types: typesToIndex,
          index_sources: indexSources
        }
      });
      if (!response.success) {
        showNotice(response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to start indexing', 'botisst-ai-chat-assistant'), 'error');
        setIndexing(false);
        return;
      }
      showNotice(response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Content indexing started!', 'botisst-ai-chat-assistant'));
      if (response.status === 'queued') {
        pollIndexStatus();
      } else {
        setIndexing(false);
        fetchRAGStats();
      }
    } catch (error) {
      console.error('Indexing error:', error);
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to index content', 'botisst-ai-chat-assistant'), 'error');
      setIndexing(false);
    }
  };
  const indexProgressPercent = (() => {
    if (!indexProgress) {
      return 0;
    }
    if (indexProgress.status === 'indexing' && indexProgress.docs_total > 0) {
      return Math.round(indexProgress.docs_processed / indexProgress.docs_total * 100);
    }
    if (indexProgress.status === 'embedding' && indexProgress.embed_total > 0) {
      return Math.round(indexProgress.embed_processed / indexProgress.embed_total * 100);
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
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Indexing documents… %1$d/%2$d', 'botisst-ai-chat-assistant'), indexProgress.docs_processed, indexProgress.docs_total);
    }
    if (indexProgress.status === 'embedding') {
      return indexProgress.embed_total > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Generating embeddings… %1$d/%2$d', 'botisst-ai-chat-assistant'), indexProgress.embed_processed, indexProgress.embed_total) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Generating embeddings…', 'botisst-ai-chat-assistant');
    }
    return '';
  })();
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const fileIds = trainingFiles.map(f => typeof f === 'object' ? f.id : parseInt(f, 10));
    const filteredUrls = urls.filter(u => !!u.trim());
    const botPayload = {
      knowledge_text: knowledgeText,
      knowledge_urls: filteredUrls,
      training_files: fileIds
    };
    const ragPayload = {
      post_types: selectedPostTypes,
      chunk_size: parseInt(maxChunkSize, 10),
      max_results: parseInt(maxResults, 10),
      require_indexed_data: requireIndexedData,
      no_data_message: noDataMessage,
      vector_db: {
        provider: vectorDb,
        api_key: vectorDb === 'pinecone' ? pineconeApiKey : '',
        host: vectorDb === 'pinecone' ? pineconeHost : '',
        index_name: vectorDb === 'pinecone' ? pineconeIndexName : ''
      },
      embeddings: {
        provider: embeddingProviderName
      }
    };
    try {
      // Save bot settings
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-bot-settings',
        method: 'POST',
        data: botPayload
      });

      // Save RAG settings
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/settings',
        method: 'POST',
        data: ragPayload
      });
      onSave({
        chatbot: {
          ...botSettings,
          ...botPayload
        },
        rag: {
          ...ragSettings,
          ...ragPayload
        }
      });
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Knowledge base and RAG settings saved successfully!', 'botisst-ai-chat-assistant'));
    } catch (error) {
      console.error('Save error:', error);
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setSaving(false);
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-settings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("nav", {
    className: "baca-kb-subnav",
    role: "tablist",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Knowledge base sections', 'botisst-ai-chat-assistant')
  }, SUB_TABS.map(tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    key: tab.id,
    type: "button",
    role: "tab",
    "aria-selected": activeSubTab === tab.id,
    className: `baca-kb-subtab ${activeSubTab === tab.id ? 'active' : ''}`,
    onClick: () => setActiveSubTab(tab.id)
  }, tab.label))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("form", {
    onSubmit: handleSubmit
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: activeSubTab === 'sources' ? '' : 'baca-kb-panel--hidden'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-media-text"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Direct Text Knowledge', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc"
  }, TEXT_KNOWLEDGE_HINT))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    className: "baca-kb-textarea",
    rows: "8",
    value: knowledgeText,
    onChange: e => setKnowledgeText(e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter factual information directly…', 'botisst-ai-chat-assistant')
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-admin-site-alt3"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Web Pages (URLs)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc"
  }, URLS_HINT))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-url-list"
  }, urls.map((url, i) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    key: i,
    className: "baca-kb-url-item"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-url-item__icon dashicons dashicons-admin-links",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "url",
    className: "baca-kb-url-input",
    value: url,
    onChange: e => updateUrl(i, e.target.value),
    placeholder: "https://example.com/page"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-kb-url-remove",
    onClick: () => removeUrl(i),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove URL', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-trash",
    "aria-hidden": "true"
  }))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-kb-add-url",
    onClick: () => setUrls([...urls, ''])
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add URL', 'botisst-ai-chat-assistant'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: activeSubTab === 'vector-db' ? '' : 'baca-kb-panel--hidden'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-database"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Database', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose where to store your document embeddings for semantic search.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-db-options"
  }, vectorDatabaseOptions.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: option.value,
    className: "baca-radio-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "radio",
    name: "vector_db",
    value: option.value,
    checked: vectorDb === option.value,
    onChange: e => setVectorDb(e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-radio-card__label"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, option.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, option.desc))))))), vectorDb === 'pinecone' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      minWidth: 0,
      flex: 1
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-cloud"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading",
    style: {
      minWidth: 0
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone Configuration', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc",
    style: {
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connect your Pinecone cloud vector database.', 'botisst-ai-chat-assistant'), ' ', (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://app.pinecone.io/",
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      fontWeight: '500'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Open Pinecone Console', 'botisst-ai-chat-assistant'), " \u2192")))), hasPineconeSavedSettings && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-secondary baca-btn-sm",
    onClick: () => setConfirmingPineconeReset(true),
    style: {
      fontSize: '0.8125rem',
      padding: '0.5rem 0.875rem',
      flexShrink: 0
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Settings', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, embeddingProvider.dimensions && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-info-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Important:', 'botisst-ai-chat-assistant')), ' ', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Because you are using', 'botisst-ai-chat-assistant'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, embeddingProvider.provider), ", ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('you must create your Pinecone index with exactly', 'botisst-ai-chat-assistant'), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, embeddingProvider.dimensions, " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('dimensions', 'botisst-ai-chat-assistant')), "."), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Note: If you change your API provider later, you must delete your Pinecone index, create a new one with the new dimensions, and click "Index Content" again.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone API Key', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "password",
    className: "baca-input",
    value: pineconeApiKey,
    onChange: e => setPineconeApiKey(e.target.value),
    placeholder: "pcsk_..."
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You can generate an API key from the "API Keys" section in your Pinecone dashboard.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone Host', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "baca-input",
    value: pineconeHost,
    onChange: e => setPineconeHost(e.target.value),
    placeholder: "https://index-xxxxx.svc.aped-4627-b74a.pinecone.io"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The host URL for your index. Find this by clicking on your index in the Pinecone dashboard.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Index Name', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    className: "baca-input",
    value: pineconeIndexName,
    onChange: e => setPineconeIndexName(e.target.value),
    placeholder: "e.g. botisst-index"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The exact name of the index you created.', 'botisst-ai-chat-assistant'))), hasPineconeSavedSettings && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-pinecone-reset"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-secondary",
    onClick: () => setConfirmingPineconeReset(true)
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Pinecone Settings', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Click this to clear your Pinecone API Key, Host, and Index Name.', 'botisst-ai-chat-assistant'))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-lightbulb"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding Configuration', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select the AI provider to generate vector embeddings.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-form-group"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    className: "baca-label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding Provider', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    className: "baca-select baca-kb-embedding-select",
    value: embeddingProviderName,
    onChange: e => setEmbeddingProviderName(e.target.value)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "openai"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OpenAI (text-embedding-3-small)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    value: "google"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Gemini (gemini-embedding-001)', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select the provider to use for processing your knowledge base into vectors.', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-info-block"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Status:', 'botisst-ai-chat-assistant')), embeddingProvider.key ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-status baca-kb-status--ok"
  }, "\u2713 ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API Key Configured', 'botisst-ai-chat-assistant')) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-status baca-kb-status--missing"
  }, "\u2717 ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API Key Missing', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Required Index Dimensions:', 'botisst-ai-chat-assistant')), " ", embeddingProvider.dimensions), !embeddingProvider.key && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-warning"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('⚠️ No AI API key found for the selected provider. Please add an API key in the API Keys tab to enable RAG indexing.', 'botisst-ai-chat-assistant')))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: activeSubTab === 'indexing' ? '' : 'baca-kb-panel--hidden'
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("article", {
    className: "baca-kb-card"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "baca-kb-card__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-kb-card__icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-media-text"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__heading"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "baca-kb-card__title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Website Content to Index', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-card__desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select which post types to include. Leave all unchecked to skip indexing your website content.', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-card__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-post-types"
  }, postTypes.length > 0 ? postTypes.map(pt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: pt.value,
    className: "baca-checkbox"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: selectedPostTypes.includes(pt.value),
    onChange: () => handleTogglePostType(pt.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-checkbox__label"
  }, pt.label, " (", pt.count, ")"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No post types available.', 'botisst-ai-chat-assistant'))), indexing && indexProgress && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-index-progress",
    role: "status"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-index-progress__bar"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-index-progress__fill",
    style: {
      width: `${indexProgressPercent}%`
    }
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-kb-index-progress__label"
  }, indexProgressLabel))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("footer", {
    className: "baca-kb-footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "submit",
    className: "baca-btn baca-btn-primary",
    disabled: saving
  }, saving ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Saving…', 'botisst-ai-chat-assistant') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save', 'botisst-ai-chat-assistant')), activeSubTab === 'indexing' && selectedPostTypes.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-secondary",
    onClick: handleIndexContent,
    disabled: indexing
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-update",
    "aria-hidden": "true"
  }), indexing ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Indexing…', 'botisst-ai-chat-assistant') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Index Content Now', 'botisst-ai-chat-assistant')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ui__WEBPACK_IMPORTED_MODULE_4__.ConfirmDialog, {
    open: confirmingPineconeReset,
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Pinecone settings', 'botisst-ai-chat-assistant'),
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to clear your Pinecone API Key, Host, and Index Name?', 'botisst-ai-chat-assistant'),
    confirmLabel: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reset Pinecone Settings', 'botisst-ai-chat-assistant'),
    onCancel: () => setConfirmingPineconeReset(false),
    onConfirm: async () => {
      setConfirmingPineconeReset(false);
      setSaving(true);
      try {
        const resetRagPayload = {
          ...ragSettings,
          vector_db: {
            provider: vectorDb,
            api_key: '',
            host: '',
            index_name: ''
          }
        };
        await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
          path: '/baca/v1/rag/settings',
          method: 'POST',
          data: resetRagPayload
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
              index_name: ''
            }
          }
        });
        showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone settings reset successfully!', 'botisst-ai-chat-assistant'));
      } catch (error) {
        showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to reset Pinecone settings', 'botisst-ai-chat-assistant'), 'error');
      } finally {
        setSaving(false);
      }
    }
  }));
}

/***/ },

/***/ "./src/admin/components/SetupWizard.jsx"
/*!**********************************************!*\
  !*** ./src/admin/components/SetupWizard.jsx ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetupWizard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);




const PROVIDERS = {
  openai: {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OpenAI', 'botisst-ai-chat-assistant'),
    link: 'https://platform.openai.com/settings/organization/api-keys'
  },
  google: {
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Gemini', 'botisst-ai-chat-assistant'),
    link: 'https://aistudio.google.com/api-keys'
  }
};
const VECTOR_DB_OPTIONS = [{
  value: 'sqlite',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SQLite (Local)', 'botisst-ai-chat-assistant'),
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Local vector storage - no setup needed', 'botisst-ai-chat-assistant')
}, {
  value: 'pinecone',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone (Cloud)', 'botisst-ai-chat-assistant'),
  desc: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Managed cloud service - requires API key', 'botisst-ai-chat-assistant')
}];
async function updateWizardStatus(status) {
  try {
    await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/baca/v1/setup-wizard',
      method: 'POST',
      data: {
        status
      }
    });
  } catch (e) {
    // Non-fatal — worst case the wizard offers to run again next visit.
  }
}
function SetupWizard({
  open,
  settings,
  onSave,
  onClose,
  showNotice
}) {
  const [step, setStep] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
  const [busy, setBusy] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const getInitialProvider = () => {
    if (settings?.api_keys?.openai) return 'openai';
    if (settings?.api_keys?.google) return 'google';
    return settings?.chatbot?.default_provider || 'openai';
  };
  const [selectedProvider, setSelectedProvider] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(getInitialProvider);
  const hasSavedApiKey = !!settings?.api_keys?.[selectedProvider];
  const [apiKey, setApiKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.api_keys?.[getInitialProvider()] || '');
  const [vectorDb, setVectorDb] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.vector_db?.provider || 'sqlite');
  const [embeddingProvider, setEmbeddingProvider] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.embeddings?.provider || 'openai');
  const [pineconeApiKey, setPineconeApiKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.vector_db?.api_key || '');
  const [pineconeHost, setPineconeHost] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.vector_db?.host || '');
  const [pineconeIndexName, setPineconeIndexName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.vector_db?.index_name || '');
  const [knowledgeText, setKnowledgeText] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [availablePostTypes, setAvailablePostTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [selectedPostTypes, setSelectedPostTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(() => settings?.rag?.post_types || ['post', 'page']);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    document.body.classList.add('baca-modal-open');
    const initialProvider = getInitialProvider();
    setSelectedProvider(initialProvider);
    setApiKey(settings?.api_keys?.[initialProvider] || '');
    setVectorDb(settings?.rag?.vector_db?.provider || 'sqlite');
    setEmbeddingProvider(settings?.rag?.embeddings?.provider || 'openai');
    setPineconeApiKey(settings?.rag?.vector_db?.api_key || '');
    setPineconeHost(settings?.rag?.vector_db?.host || '');
    setPineconeIndexName(settings?.rag?.vector_db?.index_name || '');
    setSelectedPostTypes(settings?.rag?.post_types || ['post', 'page']);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
      path: '/baca/v1/rag/post-types'
    }).then(res => setAvailablePostTypes(res.types || [])).catch(() => {});
    return () => document.body.classList.remove('baca-modal-open');
  }, [open, settings]);
  if (!open) {
    return null;
  }
  const changeStep = next => {
    setStep(next);
  };
  const handleClose = async status => {
    setBusy(true);
    await updateWizardStatus(status);
    setBusy(false);
    onClose();
  };
  const handleProviderNext = async () => {
    if (!apiKey.trim()) {
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('An API key is required to continue.', 'botisst-ai-chat-assistant'), 'error');
      return;
    }
    if (settings?.api_keys?.[selectedProvider] && apiKey === settings.api_keys[selectedProvider]) {
      changeStep(2);
      return;
    }
    setBusy(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-settings',
        method: 'POST',
        data: {
          [`${selectedProvider}_key`]: apiKey
        }
      });
      const maskedKey = apiKey.length < 8 ? '********' : apiKey.slice(0, 4) + '...' + apiKey.slice(-4);
      onSave({
        api_keys: {
          ...settings?.api_keys,
          [selectedProvider]: maskedKey
        }
      });
      changeStep(2);
    } catch (error) {
      const message = error?.errors?.[selectedProvider] || error?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not validate this API key. Please try again.', 'botisst-ai-chat-assistant');
      showNotice(message, 'error');
    } finally {
      setBusy(false);
    }
  };
  const handleVectorDbNext = async () => {
    setBusy(true);
    try {
      const vectorDbConfig = vectorDb === 'pinecone' ? {
        provider: 'pinecone',
        api_key: pineconeApiKey,
        host: pineconeHost,
        index_name: pineconeIndexName
      } : {
        provider: 'sqlite'
      };
      const embeddingsConfig = {
        provider: embeddingProvider
      };
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/settings',
        method: 'POST',
        data: {
          vector_db: vectorDbConfig,
          embeddings: embeddingsConfig
        }
      });
      onSave({
        rag: {
          ...settings?.rag,
          vector_db: vectorDbConfig,
          embeddings: {
            ...settings?.rag?.embeddings,
            ...embeddingsConfig
          }
        }
      });
      changeStep(vectorDb === 'pinecone' ? 4 : 3);
    } catch (error) {
      showNotice(error?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not connect to this vector database. Please check your details.', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setBusy(false);
    }
  };
  const handlePostTypesNext = async () => {
    setBusy(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/settings',
        method: 'POST',
        data: {
          post_types: selectedPostTypes
        }
      });
      onSave({
        rag: {
          ...settings?.rag,
          post_types: selectedPostTypes
        }
      });

      // Trigger RAG indexing for website content of selected post types immediately
      const indexResponse = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/rag/index',
        method: 'POST',
        data: {
          post_types: selectedPostTypes,
          index_sources: {
            knowledge_text: false,
            urls: false,
            files: false,
            website: selectedPostTypes.length > 0
          }
        }
      });
      if (indexResponse && indexResponse.success === false) {
        throw new Error(indexResponse.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding generation failed.', 'botisst-ai-chat-assistant'));
      }
      changeStep(vectorDb === 'pinecone' ? 5 : 4);
    } catch (error) {
      showNotice(error.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not save post types.', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setBusy(false);
    }
  };
  const handleFinish = async () => {
    setBusy(true);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/baca/v1/save-bot-settings',
        method: 'POST',
        data: {
          knowledge_text: knowledgeText
        }
      });
      onSave({
        chatbot: {
          ...settings?.chatbot,
          knowledge_text: knowledgeText
        }
      });

      // Trigger RAG indexing for manual knowledge text only if provided
      if (knowledgeText.trim()) {
        const indexResponse = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
          path: '/baca/v1/rag/index',
          method: 'POST',
          data: {
            post_types: selectedPostTypes,
            index_sources: {
              knowledge_text: true,
              urls: false,
              files: false,
              website: false
            }
          }
        });
        if (indexResponse && indexResponse.success === false) {
          throw new Error(indexResponse.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding generation failed.', 'botisst-ai-chat-assistant'));
        }
      }
      showNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding generation and setup completed successfully!', 'botisst-ai-chat-assistant'));
      await updateWizardStatus('completed');
      changeStep('done');
    } catch (error) {
      showNotice(error?.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Could not complete the setup process. Please try again.', 'botisst-ai-chat-assistant'), 'error');
    } finally {
      setBusy(false);
    }
  };
  const stepsCount = vectorDb === 'pinecone' ? 5 : 4;
  const stepLabels = vectorDb === 'pinecone' ? [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connect an AI provider', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose vector database', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone settings', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Content for Your Chatbot', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add chatbot knowledge', 'botisst-ai-chat-assistant')] : [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connect an AI provider', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose vector database', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Content for Your Chatbot', 'botisst-ai-chat-assistant'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add chatbot knowledge', 'botisst-ai-chat-assistant')];
  const renderProgress = () => {
    if (step === 'done') {
      return null;
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-wizard-progress"
    }, Array.from({
      length: stepsCount
    }, (_, i) => i + 1).map(n => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      key: n,
      type: "button",
      className: `baca-wizard-progress__dot ${n === step ? 'is-active' : ''} ${n < step ? 'is-done' : ''}`,
      onClick: () => n < step && changeStep(n),
      disabled: n >= step || busy,
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go back to step', 'botisst-ai-chat-assistant') + ': ' + stepLabels[n - 1],
      "aria-current": n === step ? 'step' : undefined
    })));
  };
  const renderStepOne = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-wizard-step-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Connect an AI provider', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-wizard-step-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose an AI provider and enter your API key to continue.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_provider"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('AI Provider', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
    id: "wizard_provider",
    className: "baca-bot-select",
    value: selectedProvider,
    onChange: e => {
      const newProvider = e.target.value;
      setSelectedProvider(newProvider);
      setApiKey(settings?.api_keys?.[newProvider] || '');
    }
  }, Object.entries(PROVIDERS).map(([id, provider]) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
    key: id,
    value: id
  }, provider.name)))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_api_key"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('API Key', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "wizard_api_key",
    className: "baca-bot-input",
    value: apiKey,
    onChange: e => setApiKey(e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Paste your API key here', 'botisst-ai-chat-assistant'),
    disabled: hasSavedApiKey
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: PROVIDERS[selectedProvider].link,
    className: "baca-api-help-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Generate your API key here', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-external",
    "aria-hidden": "true"
  }))));
  const renderStepTwo = () => {
    const isKeyConfigured = !!settings?.api_keys?.[embeddingProvider];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
      className: "baca-wizard-step-title"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose your database', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "baca-wizard-step-desc"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your knowledge base is stored here so the AI can quickly search and use it when answering questions.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-kb-db-options"
    }, VECTOR_DB_OPTIONS.map(option => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      key: option.value,
      className: "baca-radio-card",
      style: {
        margin: 0
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
      type: "radio",
      name: "wizard_vector_db",
      value: option.value,
      checked: vectorDb === option.value,
      onChange: () => setVectorDb(option.value)
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      className: "baca-radio-card__label"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, option.label), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("small", null, option.desc))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-bot-field",
      style: {
        marginTop: '1.5rem'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      htmlFor: "wizard_embedding_provider"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Embedding Provider', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      id: "wizard_embedding_provider",
      className: "baca-bot-select",
      value: embeddingProvider,
      onChange: e => setEmbeddingProvider(e.target.value)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "openai"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('OpenAI (text-embedding-3-small)', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("option", {
      value: "google"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Google Gemini (gemini-embedding-001)', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
      className: "baca-bot-hint",
      style: {
        marginTop: '0.375rem'
      }
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select the AI provider to generate vector embeddings.', 'botisst-ai-chat-assistant')), !isKeyConfigured && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "baca-bot-warning",
      style: {
        marginTop: '0.75rem',
        padding: '0.75rem 1rem',
        background: '#fef2f2',
        border: '1px solid #fee2e2',
        borderRadius: '8px',
        fontSize: '0.8125rem',
        color: '#b91c1c',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('You need to add an API key to generate embeddings.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      type: "button",
      className: "baca-bot-link",
      style: {
        display: 'inline-flex',
        padding: 0,
        border: 'none',
        background: 'none',
        color: '#2563eb',
        textDecoration: 'underline',
        cursor: 'pointer',
        fontSize: 'inherit',
        fontWeight: '600'
      },
      onClick: () => changeStep(1)
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go back to Step 1 to add the API key', 'botisst-ai-chat-assistant')))));
  };
  const renderPineconeStep = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-wizard-step-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone Settings', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-wizard-step-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Configure your Pinecone connection details below.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_pinecone_key"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone API Key', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "password",
    id: "wizard_pinecone_key",
    className: "baca-bot-input",
    value: pineconeApiKey,
    onChange: e => setPineconeApiKey(e.target.value),
    placeholder: "pcsk_..."
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_pinecone_host"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Pinecone Host', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "wizard_pinecone_host",
    className: "baca-bot-input",
    value: pineconeHost,
    onChange: e => setPineconeHost(e.target.value),
    placeholder: "https://index-xxxxx.svc.aped-4627-b74a.pinecone.io"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "https://app.pinecone.io/",
    className: "baca-api-help-link",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Find your Pinecone API details and host URL here', 'botisst-ai-chat-assistant'), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-external",
    "aria-hidden": "true"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_pinecone_index"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Index Name', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    id: "wizard_pinecone_index",
    className: "baca-bot-input",
    value: pineconeIndexName,
    onChange: e => setPineconeIndexName(e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. botisst-index', 'botisst-ai-chat-assistant')
  })));
  const renderStepThree = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-wizard-step-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add what your bot should know', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-wizard-step-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add facts, FAQs, or company information for your chatbot. You can add more content later in the Knowledge Base.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-bot-field"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    htmlFor: "wizard_knowledge_text"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Knowledge Base Text', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    id: "wizard_knowledge_text",
    className: "baca-bot-input baca-bot-textarea",
    rows: "6",
    value: knowledgeText,
    onChange: e => setKnowledgeText(e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('e.g. We are open Monday-Friday, 9am-5pm. Our return policy is...', 'botisst-ai-chat-assistant')
  })));
  const renderPostTypesStep = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-wizard-step-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Content for Your Chatbot', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-wizard-step-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose which WordPress content the chatbot can use to answer questions.', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-kb-post-types",
    style: {
      marginTop: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem'
    }
  }, availablePostTypes.length > 0 ? availablePostTypes.map(pt => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
    key: pt.value,
    className: "baca-checkbox",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#374151',
      cursor: 'pointer'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    checked: selectedPostTypes.includes(pt.value),
    onChange: () => {
      setSelectedPostTypes(prev => prev.includes(pt.value) ? prev.filter(v => v !== pt.value) : [...prev, pt.value]);
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-checkbox__label"
  }, pt.label, " (", pt.count, ")"))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-hint",
    style: {
      fontSize: '0.8125rem',
      color: '#6b7280'
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Fetching available content types...', 'botisst-ai-chat-assistant'))));
  const renderDone = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-wizard-done"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-wizard-done__icon dashicons dashicons-yes-alt",
    "aria-hidden": "true"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "baca-wizard-step-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)("You're all set!", 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "baca-wizard-step-desc"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your chatbot is ready to go. You can fine-tune everything else from the dashboard at any time.', 'botisst-ai-chat-assistant')));
  const isLastStep = vectorDb === 'pinecone' ? step === 5 : step === 4;
  const handleSkip = () => {
    const total = vectorDb === 'pinecone' ? 5 : 4;
    if (step === total) {
      handleClose('skipped');
    } else {
      changeStep(step + 1);
    }
  };
  const handleNextClick = () => {
    if (step === 1) {
      handleProviderNext();
    } else if (step === 2) {
      if (vectorDb === 'pinecone') {
        changeStep(3);
      } else {
        handleVectorDbNext();
      }
    } else if (step === 3) {
      if (vectorDb === 'pinecone') {
        handleVectorDbNext();
      } else {
        handlePostTypesNext();
      }
    } else if (step === 4) {
      if (vectorDb === 'pinecone') {
        handlePostTypesNext();
      } else {
        handleFinish();
      }
    } else if (step === 5) {
      handleFinish();
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal baca-wizard-modal is-visible",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "baca-wizard-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-overlay"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-content baca-wizard-modal__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-modal-title-icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-format-chat"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    id: "baca-wizard-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Welcome to Botisst — quick setup', 'botisst-ai-chat-assistant'))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-modal-close",
    onClick: () => handleClose('skipped'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'botisst-ai-chat-assistant'),
    disabled: busy
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt",
    "aria-hidden": "true"
  }))), renderProgress(), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-body baca-wizard-modal__body"
  }, step === 1 && renderStepOne(), step === 2 && renderStepTwo(), vectorDb === 'pinecone' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, step === 3 && renderPineconeStep(), step === 4 && renderPostTypesStep(), step === 5 && renderStepThree()) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, step === 3 && renderPostTypesStep(), step === 4 && renderStepThree()), step === 'done' && renderDone()), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-footer baca-wizard-modal__footer"
  }, step === 'done' ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-primary",
    onClick: () => {
      if (window.location.href.includes('page=baca')) {
        onClose();
      } else {
        window.location.href = 'admin.php?page=baca';
      }
    }
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go to Settings', 'botisst-ai-chat-assistant'))) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, step === 1 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-bot-link baca-wizard-skip",
    onClick: handleSkip,
    disabled: busy
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Skip for now', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-primary",
    onClick: handleNextClick,
    disabled: busy || step === 2 && !settings?.api_keys?.[embeddingProvider]
  }, busy ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }) : isLastStep ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Finish', 'botisst-ai-chat-assistant') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'botisst-ai-chat-assistant'))))));
}

/***/ },

/***/ "./src/admin/components/ui.jsx"
/*!*************************************!*\
  !*** ./src/admin/components/ui.jsx ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmDialog: () => (/* binding */ ConfirmDialog)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);




/**
 * Shared confirmation dialog, replacing native window.confirm() calls so
 * destructive actions look consistent with the rest of the dashboard.
 */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  danger = true,
  busy = false,
  onConfirm,
  onCancel
}) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!open) {
      return undefined;
    }
    document.body.classList.add('baca-modal-open');
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('baca-modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onCancel]);
  if (!open) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal baca-confirm-modal is-visible",
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "baca-confirm-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-overlay",
    onClick: onCancel
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-content baca-confirm-modal__content"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-title"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-modal-title-icon",
    "aria-hidden": "true"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-warning"
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    id: "baca-confirm-title"
  }, title)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-modal-close",
    onClick: onCancel,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close', 'botisst-ai-chat-assistant')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt",
    "aria-hidden": "true"
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-body baca-confirm-modal__body"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, message)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "baca-modal-footer baca-confirm-modal__footer"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-btn baca-btn-secondary",
    onClick: onCancel,
    disabled: busy
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'botisst-ai-chat-assistant')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: `baca-btn ${danger ? 'baca-btn-danger' : 'baca-btn-primary'}`,
    onClick: onConfirm,
    disabled: busy
  }, busy ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-spinner",
    "aria-hidden": "true"
  }) : confirmLabel || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Confirm', 'botisst-ai-chat-assistant')))));
}

/***/ },

/***/ "./src/admin/baca-dashboard.css"
/*!**************************************!*\
  !*** ./src/admin/baca-dashboard.css ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _baca_dashboard_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./baca-dashboard.css */ "./src/admin/baca-dashboard.css");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Dashboard */ "./src/admin/Dashboard.jsx");
/* harmony import */ var _components_SetupWizard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/SetupWizard */ "./src/admin/components/SetupWizard.jsx");





function StandaloneWizard() {
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(() => window.baca_data?.settings);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const handleTrigger = e => {
      if (e.target.classList.contains('baca-run-wizard-trigger') || e.target.closest('.baca-run-wizard-trigger')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', handleTrigger);
    return () => document.removeEventListener('click', handleTrigger);
  }, []);
  const showNotice = (message, type = 'success') => {
    setNotice({
      message,
      type
    });
    setTimeout(() => setNotice(null), 10000);
  };
  if (!open) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_SetupWizard__WEBPACK_IMPORTED_MODULE_4__["default"], {
    open: open,
    settings: settings,
    onSave: updatedSettings => {
      if (window.baca_data) {
        window.baca_data.settings = {
          ...window.baca_data.settings,
          ...updatedSettings
        };
      }
      setSettings(prev => ({
        ...prev,
        ...updatedSettings
      }));
    },
    onClose: () => {
      setOpen(false);
      const noticeEl = document.querySelector('.baca-setup-notice');
      if (noticeEl) {
        noticeEl.style.display = 'none';
      }
    },
    showNotice: showNotice
  }), notice && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: `baca-toast baca-toast-${notice.type}`,
    style: {
      zIndex: 9999999
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: `dashicons ${notice.type === 'success' ? 'dashicons-yes-alt' : 'dashicons-warning'}`
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "baca-toast-message"
  }, notice.message), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    type: "button",
    className: "baca-toast-close",
    onClick: () => setNotice(null),
    "aria-label": "Close notice"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "dashicons dashicons-no-alt"
  }))));
}
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('baca-admin-root');
  if (root) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Dashboard__WEBPACK_IMPORTED_MODULE_3__["default"], {
      settings: window.baca_data.settings
    }), root);
  }
  const standaloneRoot = document.getElementById('baca-wizard-standalone-root');
  if (standaloneRoot) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(StandaloneWizard, null), standaloneRoot);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=baca-dashboard.js.map