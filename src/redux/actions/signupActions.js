import {store} from '../store';
import {Apicall} from '../apicall';
import nav from './navActions.js';
import login from './loginActions.js';



// .d88888b  oo                   dP     dP          
// 88.    "'                      88     88          
// `Y88888b. dP .d8888b. 88d888b. 88     88 88d888b. 
//       `8b 88 88'  `88 88'  `88 88     88 88'  `88 
// d8'   .8P 88 88.  .88 88    88 Y8.   .8P 88.  .88 
//  Y88888P  dP `8888P88 dP    dP `Y88888P' 88Y888P' 
//                   .88                    88       
//               d8888P                     dP     


let signup = {};

signup.onChange = function(field, value) {
	if(field === 'verificationCodeUser') {
		if(isNaN(value)){
			value = '';
		} else if(value.length > 4) {
			value = value.substring(0,4);
		}
	}

	store.dispatch({
		type: "SIGNUP_ONCHANGE",
		field: field,
		value: value,
	});
}

signup.reset = function(field, value) {
	store.dispatch({
		type: "SIGNUP_RESET",
	});
}

signup.validate = function(field, value) {
	store.dispatch({
		type: "SIGNUP_VALIDATE",
	});
}

signup.verify = function() {
	let s = store.getState().signupState;
	let code = s.verificationCodeUser;
	let email = s.email;

	if(code.length < 4) {
		return;
	}

	let data = {
		signUpId: s.signUpId,
		email: s.email,
		phoneNumber: s.phoneNumber,
		password: s.password,
		verificationCode: code
	};

	nav.loaderOpen();
	Apicall.post('/signups/verify/'+s.signUpId, data)
	.then( res => {
		console.log(res);
		//ON FAIL
		if(!res.success) {
			nav.loaderClose();
			let buttons = [
				{label: "Ok", onClick: nav.dialogClose }
			]
			nav.dialogOpen("Código de verificación incorrecto", "Error", buttons);
			return;
		}

		//ON Success
		nav.loaderClose();
		let success = () => {
			nav.dialogClose();
			nav.screenLoad('Login');
			signup.reset();
			login.reset();
			login.onChange('email', email);
			nav.loaderClose();
		}
		
		let buttons = [
			{label: "Iniciar sesión", onClick: success }
		]
		nav.dialogOpen("Usuario creado exitosamente", "Correcto", buttons);
	})
	.catch( err => {
		console.log("======ERR")
		nav.loaderClose();
		console.log(err);
	});

}

signup.submit = function(field, value) {	
	let s = store.getState().signupState;

	if(!s.valid) {
		return;
	}

	let data = {
	  "email": s.email,
	  "phoneNumber": s.phoneNumber,
	  "password": s.password,
	};

	nav.loaderOpen();
	Apicall.post('/signups', data)
	.then( res => {
		signup.onChange('signUpId', res.signUpId);
		signup.onChange('verificationCode', res.verificationCode);
		nav.loaderClose();
		nav.screenLoad('SignUpVerify', {back: true});
		//return Apicall.post('/signups/verify/'+res.signUpId, data)
	})
	.catch( err => {
		console.log("======ERR")
		nav.loaderClose();
		console.log(err);
	});
		

}


export default signup;