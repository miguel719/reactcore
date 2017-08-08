import validator from '../validator.js';


// dP                          oo          
// 88                                      
// 88        .d8888b. .d8888b. dP 88d888b. 
// 88        88'  `88 88'  `88 88 88'  `88 
// 88        88.  .88 88.  .88 88 88    88 
// 88888888P `88888P' `8888P88 dP dP    dP 
//                         .88             
//                     d8888P              

const loginInitialState = {
  email: '',
  password: '',
  errors: {
    email: '',
    password: ''
  },
  valid: false
};

const loginReducer = (state = loginInitialState, action) => {  
  switch (action.type) {
    case 'LOGIN_RESET':
      return Object.assign({}, state, loginInitialState);
    case 'LOGIN_ONCHANGE':
      let obj = {};
      obj[action.field] = action.value;
      return Object.assign({}, state, obj);
    case 'LOGIN_VALIDATE':
      let errors = {};
      errors.email = validator('email',state.email, true);
      errors.password = validator('password',state.password, true);
      let valid = validator('validate', errors);
      return Object.assign({}, state, {errors: errors, valid: valid});
    default:
      return state;
  }
};
export default loginReducer;