import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { Actions } from './redux/actions.js';
//import { store} from './redux/store.js';

import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';

class SignUp extends Component {
	state = { name: '', phone: '', multiline: '', email: '', hint: '', label: '' };

	handleChange = (field, value) => {
		Actions.signup.onChange(field, value);
  };

  submit = () => {
  	Actions.signup.validate();
		Actions.signup.submit();
  };

  loadScreen = (screen) => {
    Actions.nav.screenLoad(screen);
  };

  render() {
    return (
    	<div>
        	<Input type='email' label='Email'  required
        	onChange={this.handleChange.bind(this, 'email')} 
        	icon='email'
        	value={this.props.email}
        	error = {this.props.errors.email}
          style={{"textTransform": 'lowercase'}}
        	/>

        	<Input type='text' label='Telefono'  required
        	onChange={this.handleChange.bind(this, 'phoneNumber')} 
        	icon='phone'
        	value={this.props.phoneNumber}
        	error = {this.props.errors.phoneNumber}
        	/>

        	<Input type='Password' label='Contraseña' required 
        	onChange={this.handleChange.bind(this, 'password')}
        	icon='lock'
        	value={this.props.password}
        	error = {this.props.errors.password}
        	/>

        	<Input type='Password' label='Confirmar Contraseña' required 
        	onChange={this.handleChange.bind(this, 'passwordRepeat')}
        	icon='lock_outline'
        	value={this.props.passwordRepeat}
        	error = {this.props.errors.passwordRepeat}
        	/>

        	<br></br>
        	<div style={{display: 'flex', justifyContent: 'center'}}>  
		        <Button label="Registrarse" icon="" raised primary onClick={this.submit}/> 
          </div>


        	
        </div>

    );
  }
}

const mapStateToProps = function(store) {
  return {
    email: store.signupState.email,
    phoneNumber: store.signupState.phoneNumber,
    password: store.signupState.password,
    passwordRepeat: store.signupState.passwordRepeat,
    errors: store.signupState.errors,
  };
}

export default connect(mapStateToProps)(SignUp);