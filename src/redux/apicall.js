import {Actions} from './actions.js';
import {store} from './store.js';
var request = require('superagent');

// var baseURL = 'http://rm.cdata.mx:5001/api';
var baseURL = 'http://rmdev.cdata.mx:5001/api';
// var baseURL = 'http://192.168.43.146:5001/api';
var apicall = {};

let handleError = function(error) {
	console.log("handleError")
	console.log(error)
	console.log(error.statusCode)
	if(error.statusCode === 401) {
		Actions.user.clear();
	}
	//
};

apicall.post = function(endpoint, dataToSend, success, error) {
	let s =store.getState();
	dataToSend = JSON.stringify(dataToSend);
	dataToSend = JSON.parse(dataToSend);
	return new Promise(function(resolve, reject){
		request
	  .post(baseURL+endpoint)
	  .send(dataToSend)
	  .set('authorization', s.userState.token)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if(err) {
	    	
	    	
	    	if(!err.response || !err.response.body) {
	    		Actions.nav.dialogOpen("Error de conexión", "Error");
	    	}
	    	let error = err.response.body.error;
	    	handleError(error);
	    	console.log(error);
	    	if(error.details) {
	    		Actions.nav.dialogOpen(JSON.stringify(error.details.messages), "Error");
	    	}
	    	reject(error);
	    } else {
	    	resolve(res.body);
	    }
	    
	  });
	});

}

apicall.patch = function(endpoint, dataToSend, success, error) {
	let s =store.getState();
	dataToSend = JSON.stringify(dataToSend);
	dataToSend = JSON.parse(dataToSend);
	return new Promise(function(resolve, reject){
		request
	  .patch(baseURL+endpoint)
	  .send(dataToSend)
	  .set('authorization', s.userState.token)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if(err) {
	    	
	    	if(!err.response || !err.response.body) {
	    		Actions.nav.dialogOpen("Error de conexión", "Error");
	    	}
	    	let error = err.response.body.error;
	    	console.log(error);
	    	handleError(error);
	    	if(error.details) {
	    		Actions.nav.dialogOpen(JSON.stringify(error.details.messages), "Error");
	    	}
	    	reject(error);
	    } else {
	    	resolve(res.body);
	    }
	    
	  });
	});

}

apicall.put = function(endpoint, dataToSend, success, error) {
	let s =store.getState();
	dataToSend = JSON.stringify(dataToSend);
	dataToSend = JSON.parse(dataToSend);
	return new Promise(function(resolve, reject){
		request
	  .put(baseURL+endpoint)
	  .send(dataToSend)
	  .set('authorization', s.userState.token)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if(err) {
	    	if(!err.response || !err.response.body) {
	    		Actions.nav.dialogOpen("Error de conexión", "Error");
	    	}
	    	let error = err.response.body.error;
	    	console.log(error);
	    	handleError(error);
	    	if(error.details) {
	    		Actions.nav.dialogOpen(JSON.stringify(error.details.messages), "Error");
	    	}
	    	reject(error);
	    } else {
	    	resolve(res.body);
	    }
	    
	  });
	});

}

apicall.get = function(endpoint, success, error) {
	let s =store.getState();

	return new Promise(function(resolve, reject){
		request
	  .get(baseURL+endpoint)
	  .set('authorization', s.userState.token)
	  .set('Accept', 'application/json')
	  .end(function(err, res){
	    if(err) {
	    	handleError(err);
	    	if(!err.response || !err.response.body) {
	    		Actions.nav.dialogOpen("Error de conexión", "Error");
	    	}
	    	let error = err.response.body.error;
	    	console.log(error);
	    	handleError(error);
	    	if(error.details) {
	    		Actions.nav.dialogOpen(JSON.stringify(error.details.messages), "Error");
	    	}
	    	reject(error);
	    } else {
	    	resolve(res.body);
	    }
	    
	  });
	});

}

export const Apicall = apicall;