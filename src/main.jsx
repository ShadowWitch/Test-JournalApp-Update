import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './styles.css'

import { JournalApp } from './JournalApp'

// Redux imports
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
)
