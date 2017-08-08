import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
//import { Actions } from './redux/actions.js';
//import { store} from './redux/store.js';


class Main extends Component {
	
  render() {
    return (
    	<div>
        <h2>Hello World</h2>
        
      </div>

    );
  }
}

const mapStateToProps = function(store) {
  return {};
}

export default connect(mapStateToProps)(Main);