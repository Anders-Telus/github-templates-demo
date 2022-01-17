import "regenerator-runtime/runtime.js";
// import config from './config';

// make a real api call to get app configurations here
// window.SEARCH_EXPERIENCE_HOST = config.SEARCH_EXPERIENCE_HOST
// window.DIALOG_EXPERIENCE_HOST = config.DIALOG_EXPERIENCE_HOST
window.SEARCH_EXPERIENCE_HOST = window.__RUNTIME_CONFIG__.SEARCH_EXPERIENCE_HOST
window.DIALOG_EXPERIENCE_HOST = window.__RUNTIME_CONFIG__.DIALOG_EXPERIENCE_HOST

import('./bootstrap')

