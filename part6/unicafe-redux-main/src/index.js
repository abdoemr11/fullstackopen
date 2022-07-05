import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducers/reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const badHandler = () => {
    store.dispatch({
      type:'BAD'
    })
  }
  const okHandler = () => {
    store.dispatch({
      type:'OK'
    })
  }
  const zeroHandler = () =>{
    store.dispatch({
      type:'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={okHandler}>ok</button>
      <button onClick={badHandler}>bad</button>
      <button onClick={zeroHandler}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
