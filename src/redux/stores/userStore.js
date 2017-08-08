

// dP     dP                            
// 88     88                            
// 88     88 .d8888b. .d8888b. 88d888b. 
// 88     88 Y8ooooo. 88ooood8 88'  `88 
// Y8.   .8P       88 88.  ... 88       
// `Y88888P' `88888P' `88888P' dP       
                                     
const userInitialState = {
  token: false,
  userId: false,
  clientId: false,
  providerId: false
};

const userReducer = (state = userInitialState, action) => {  
  switch (action.type) {
    case 'USER_LOGOUT':
      return Object.assign({}, state, userInitialState);
    case 'USER_LOGIN':
      return Object.assign({}, state, action.userData);
    default:
      return state;
  }
};

export default userReducer;