import {store} from '../store';
import {Apicall} from '../apicall';
import nav from './navActions.js';
import cookie from '../cookie';

// dP     dP                            
// 88     88                            
// 88     88 .d8888b. .d8888b. 88d888b. 
// 88     88 Y8ooooo. 88ooood8 88'  `88 
// Y8.   .8P       88 88.  ... 88       
// `Y88888P' `88888P' `88888P' dP       
                                     

let user = {};
user.login = function(userData) {
	store.dispatch({
		type: "USER_LOGIN",
		userData: {token: userData.id, 
			userId: userData.userId,
			clientId: userData.clientId,
			providerId: userData.providerId
		}
	});
}

user.clear = function() {

	cookie.remove("state");
	nav.screenLoad('Login');
}

user.logout = function() {
	let s = store.getState();

	nav.loaderOpen();
	Apicall.post('/users/logout', {accessToken: s.userState.token})
	.then( res => {
		store.dispatch({
			type: "USER_LOGOUT",
		});
		nav.drawerClose();
		nav.loaderClose();
		nav.screenLoad('Login');
		user.clear();
		
	})
	.catch( err => {
		nav.loaderClose();
	});

}

export default user;