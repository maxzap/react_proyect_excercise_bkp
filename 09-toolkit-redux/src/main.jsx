import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './store'
import { PokemonApp } from './store/PokemonApp'
import { TodoApp } from './TodoApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      {/* <PokemonApp /> */}
      <TodoApp />
    </Provider>
  </React.StrictMode>
)
