// React ==================================================
import React from 'react'
import ReactDOM from 'react-dom/client'

// App ====================================================
import App from './App'

// Styles =================================================
import './assets/styles/main.scss'

// LazySizes ==============================================
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

// Render ==================================================
ReactDOM.createRoot(document.getElementById('_root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
