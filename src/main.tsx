import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import 'src/assets/styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
)
