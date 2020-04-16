//console.log("Hello Aakash");

console.log(store.getState());

import { store } from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/Main'


ReactDOM.render(<Main/>, document.getElementById("app"));