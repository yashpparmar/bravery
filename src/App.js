import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import store from './redux/store/store'
import routes from './routes/routes'

function App() {
  console.log('routes', routes)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, i) => {
            return <Route key={i} {...route} />
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
