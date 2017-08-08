import React, { Component } from 'react';

//Redux
import { connect } from 'react-redux';
import { Actions } from './redux/actions.js';
//import { store} from './redux/store.js';

import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';
import ListDivider from 'react-toolbox/lib/list/ListDivider';

import UploadImage from './components/UploadImage';

class Login extends Component {
	state = { name: '', phone: '', multiline: '', email: '', hint: '', label: '' };

	handleChange = (field, value) => {
		Actions.login.onChange(field, value);
  };

  submit = () => {
  	Actions.login.validate();
		Actions.login.submit();
  };

  loadScreen = (screen, params) => {
    Actions.nav.screenLoad(screen, params);
  };

  imgChange = (res) => {
    console.log("?=)#")
    console.log(res);
  }
  render() {
    return (
    	<div>
        <h2>Iniciar sesión</h2>


        	<Input type='Email' label='Email'  required
        	onChange={this.handleChange.bind(this, 'email')} 
        	icon='email'
        	value={this.props.email}
        	error = {this.props.errors.email}
          style={{"textTransform": 'lowercase'}}
        	/>



        	<Input type='Password' label='Contraseña' required 
        	onChange={this.handleChange.bind(this, 'password')}
        	icon='lock'
        	value={this.props.password}
        	error = {this.props.errors.password}
        	/>
        	<br></br>
        	<div style={{display: 'flex', justifyContent: 'center'}}>  
		        <Button label="Iniciar Sesión" icon="" raised primary onClick={this.submit}/> 
          </div>
          <div style={{textAlign: 'center', fontSize:'14px', marginTop: '6px'}}>

            <a href="#recover" 
            onClick={this.loadScreen.bind(null,'RecoverPassword', {back:true})} >
            ¿Olvidaste tu contraseña?
            </a>
          </div>

          <br></br>
          <ListDivider></ListDivider>
          <br></br>

          <div style={{ textAlign:'center'}}>  
          	<p>¿Aun no estás registrado?</p>
	          <Button label="¡Regístrate!" icon="" raised accent
	          onClick={this.loadScreen.bind(null,'SignUp', {back:true})}/>                   
          </div>
        	
        </div>

    );
  }
}

const mapStateToProps = function(store) {
  return {
    email: store.loginState.email,
    password: store.loginState.password,
    errors: store.loginState.errors
  };
}

export default connect(mapStateToProps)(Login);