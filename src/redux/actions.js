//import {store} from './store';
//import {Apicall} from './apicall';
//import constants  from '../constants.js';

import nav from './actions/navActions.js';
import login from './actions/loginActions.js';
import signup from './actions/signupActions.js';
import user from './actions/userActions.js';


const actions = {
	login: login,
	nav: nav,
	signup: signup,
	user: user,
	
};





export const Actions = actions;