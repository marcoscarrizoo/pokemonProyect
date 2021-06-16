import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducer/index' //el reducer
import thunk from 'redux-thunk' //nos ayuda a trabajar con promesas con redux
import {composeWithDevTools} from 'redux-devtools-extension' //nos ayuda a ver los state de la herramienta

const store = createStore(
rootReducer, 
composeWithDevTools(applyMiddleware(thunk)),
)


export default store ;

//la store en donde van todos los estados de mi app 
//npm install --save redux-devtools-extension: se visualize la herramienta redux
//npm i redux thunk: que nos sirve para trabajar con promesas
//axios sirve para hacer llamados a apis

//compose from redux
// nos ayuda a combiar varios reducers con la store