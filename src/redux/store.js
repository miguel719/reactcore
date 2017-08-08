import {  
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import middleware from './middleware.js';
import cookie from './cookie';

//  888888ba                 dP                                              
//  88    `8b                88                                              
// a88aaaa8P' .d8888b. .d888b88 dP    dP .d8888b. .d8888b. 88d888b. .d8888b. 
//  88   `8b. 88ooood8 88'  `88 88    88 88'  `"" 88ooood8 88'  `88 Y8ooooo. 
//  88     88 88.  ... 88.  .88 88.  .88 88.  ... 88.  ... 88             88 
//  dP     dP `88888P' `88888P8 `88888P' `88888P' `88888P' dP       `88888P' 


import navReducer from './stores/navStore.js';
import loginReducer from './stores/loginStore.js';
import signupReducer from './stores/signupStore.js';
import userReducer from './stores/userStore.js';




                                                                    
const reducers = combineReducers({ 
  userState: userReducer,
  navState: navReducer,
  loginState: loginReducer,
  signupState: signupReducer,
});                                                              

function configureStore(initialState = {}) {  

  let state = {};
  let cs = cookie.load("state")
  if(cs){ state = cs}


  const store = createStore(
    reducers,
    state,
    applyMiddleware(middleware)
  )
  return store;
};

export const store = configureStore();