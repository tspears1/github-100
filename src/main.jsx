import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/main.scss'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'

ReactDOM.createRoot(document.getElementById('_root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
