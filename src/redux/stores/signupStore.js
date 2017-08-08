import validator from '../validator.js';


// .d88888b  oo                   dP     dP          
// 88.    "'                      88     88          
// `Y88888b. dP .d8888b. 88d888b. 88     88 88d888b. 
//       `8b 88 88'  `88 88'  `88 88     88 88'  `88 
// d8'   .8P 88 88.  .88 88    88 Y8.   .8P 88.  .88 
//  Y88888P  dP `8888P88 dP    dP `Y88888P' 88Y888P' 
//                   .88                    88       
//               d8888P                     dP       

const signupInitialState = {
  email: '',
  phoneNumber: '',
  password: '',
  passwordRepeat:'',
  verificationCode: '',
  verificationCodeUser: '',
  errors: {
    email: '',
    phoneNumber: '',
    password: '',
    passwordRepeat:'',
    signUpId: '',
    verificationCode: ''
  },
  valid: false
};

const signupReducer = (state = signupInitialState, action) => {  
  switch (action.type) {
    case 'SIGNUP_RESET':
      return Object.assign({}, state, signupInitialState);
    case 'SIGNUP_ONCHANGE':
      let obj = {};
      obj[action.field] = action.value;
      return Object.assign({}, state, obj);
    case 'SIGNUP_VALIDATE':
      let errors = {};
      errors.email = validator('email',state.email, true);
      errors.password = validator('password',state.password, true);
      errors.passwordRepeat = validator('passwordRepeat',{val1: state.password, val2: state.passwordRepeat}, true);
      errors.phoneNumber = validator('phone',state.phoneNumber, true);
      let valid = validator('validate', errors);
      return Object.assign({}, state, {errors: errors, valid: valid});
    default:
      return state;
  }
};

export default signupReducer;