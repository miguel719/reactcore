import {store} from '../store';
import constants  from '../../constants.js';
import {Apicall} from '../apicall';

// 888888ba                    oo                     dP            
// 88    `8b                                          88            
// 88     88 .d8888b. dP   .dP dP .d8888b. .d8888b. d8888P .d8888b. 
// 88     88 88'  `88 88   d8' 88 88'  `88 88'  `88   88   88ooood8 
// 88     88 88.  .88 88 .88'  88 88.  .88 88.  .88   88   88.  ... 
// dP     dP `88888P8 8888P'   dP `8888P88 `88888P8   dP   `88888P' 
//                                     .88                          
//                                 d8888P                           




let nav = {};

nav.categoriesGet = () => {
	nav.loaderOpen();
	Apicall.get('/categories')
	.then( res => {
		store.dispatch({
			type:"CATEGORIES_ADD",
			categories: res
		});
		nav.loaderClose();
	})
	.catch( err => {
		console.log("======ERR categoriesGet")
		nav.loaderClose();
		console.log(err);
	});

	
};




nav.dialogOpen = (message,title, buttons) => {
	if(!buttons) {
		buttons = [
			{label: "Aceptar", onClick: nav.dialogClose }
		]
	}

	store.dispatch({
		type:"DIALOG_OPEN",
		buttons: buttons,
		title: title,
		message: message
	});
};

nav.dialogClose = () => {
	store.dispatch({
		type:"DIALOG_CLOSE"
	});
};

nav.drawerOpen = () => {
	store.dispatch({
		type:"DRAWER_OPEN",
	});
};

nav.drawerClose = () => {
	store.dispatch({
		type:"DRAWER_CLOSE",
	});
};

nav.loaderOpen = () => {
	store.dispatch({
		type:"LOADER_OPEN",
	});
};
nav.loaderClose = () => {
	store.dispatch({
		type:"LOADER_CLOSE",
	});
};

nav.setParams = (params) => {
	store.dispatch({
		type:"SET_PARAMS",
		params: params
	});
};

nav.screenLoad = (screenName, params) => {
	if(!params){ params = {}};
	let screens = constants.screens;
	let cScreen = false;
	screens.forEach(function(scr){		
		if(scr.component === screenName) {
			cScreen = scr;
		}
	});

	if(cScreen.title) {
		params.title = cScreen.title; 
	}

	store.dispatch({
		type:"SCREEN_LOAD",
		screen: screenName,
		params: params
	});
};

nav.screenBack = () => {
	store.dispatch({
		type:"SCREEN_BACK",
	});
};


var wl = window.location;
//Load the route of the screen
constants.screens.forEach(function(screen){
	if(screen.route && "/"+screen.route === wl.pathname	){
		nav.screenLoad(screen.component)

		//Set the params
		var search = wl.search.replace("?", "");

		var querys = search.split("&");
		if(querys.length > 0) {
			var params = {};
			querys.forEach(function(q){
			  var p = q.split("=");
			  params[p[0]] = p[1];
			})	
			nav.setParams(params);
		}

		
	}
})




export default nav;