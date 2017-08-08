import {store} from '../store';
import {Apicall} from '../apicall';
import nav from './navActions.js';
import user from './userActions.js';


// dP                          oo          
// 88                                      
// 88        .d8888b. .d8888b. dP 88d888b. 
// 88        88'  `88 88'  `88 88 88'  `88 
// 88        88.  .88 88.  .88 88 88    88 
// 88888888P `88888P' `8888P88 dP dP    dP 
//                         .88             
//                     d8888P       
let login = {};

login.onChange = function(field, value) {
	store.dispatch({
		type: "LOGIN_ONCHANGE",
		field: field,
		value: value,
	});
}

login.reset = function(field, value) {
	store.dispatch({
		type: "LOGIN_RESET",
	});
}

login.validate = function(field, value) {
	store.dispatch({
		type: "LOGIN_VALIDATE",
	});
}

login.submit = function(field, value) {
	
	var s = store.getState().loginState;

	if(!s.valid) {
		return;
	}

	let data = {
	  "email": s.email,
	  "password": s.password,
	};

	nav.loaderOpen();
	Apicall.post('/users/login', data)
	.then( res => {
		user.login(res);
		login.reset();
		nav.screenLoad('Main');
		nav.loaderClose();
	})
	.catch( err => {
		if(err.statusCode === 401){
			nav.dialogOpen("Email o password incorrectos", "Error");
		}
		nav.loaderClose();
	});
}
export default login;