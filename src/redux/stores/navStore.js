
// 888888ba                    oo                     dP            
// 88    `8b                                          88            
// 88     88 .d8888b. dP   .dP dP .d8888b. .d8888b. d8888P .d8888b. 
// 88     88 88'  `88 88   d8' 88 88'  `88 88'  `88   88   88ooood8 
// 88     88 88.  .88 88 .88'  88 88.  .88 88.  .88   88   88.  ... 
// dP     dP `88888P8 8888P'   dP `8888P88 `88888P8   dP   `88888P' 
//                                     .88                          
//                                 d8888P                           
const navInitialState = {
	drawer: false,
	loader: false,
	screen: 'Login',//Default 'Login',
  params: {}, //parameters for the screen state  
  history: [{screen: 'Login', params:{}}], //{screen: 'Login', params: {requestId:231212}}
  back: false,
  categories: [],
  categoriesObj:{},
  dialog: {
    status: false,
    title: null,
    buttons: [],
    message: null
  }

};

const navReducer = (state = navInitialState, action) => {  
  switch (action.type) {
    case 'CATEGORIES_ADD':
      let catObj = [];
      action.categories.forEach(function(cat){
        catObj[cat.id] = cat.name;
      })
      return Object.assign({}, state, {categories:action.categories, categoriesObj: catObj});
    case 'DRAWER_OPEN':
    	return Object.assign({}, state, {drawer:true});
    case 'DRAWER_CLOSE':
    	return Object.assign({}, state, {drawer:false});
    case 'LOADER_OPEN':
    	return Object.assign({}, state, {loader:true});
    case 'LOADER_CLOSE':
    	return Object.assign({}, state, {loader:false});
    case 'SCREEN_LOAD':
      let history = state.history;
      history.push({screen:action.screen, params:action.params});
      if(history.length > 5) {
        history.shift();
      }
    	return Object.assign({}, state, {screen: action.screen, params: action.params, history: history});
    case 'SET_PARAMS': 
      return Object.assign({}, state, {params: action.params});
    case 'SCREEN_BACK':
      let back_history = state.history;
      back_history.pop();
      let last = back_history[back_history.length-1]; 
      return Object.assign({}, state, {screen: last.screen, params: last.params, history: back_history});
    case 'DIALOG_OPEN':
      let diagObj = {
        status:true,
        buttons:action.buttons,
        title: action.title,
        message: action.message
      }
      return Object.assign({}, state, {dialog: diagObj});
    case 'DIALOG_CLOSE':
      return Object.assign({}, state, {dialog: navInitialState.dialog});
    default:
      return state;
  }
};

export default navReducer;