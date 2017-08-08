import React, { Component } from 'react';


import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';
import { Actions } from '../redux/actions.js';

class UploadImage extends Component {
  state = { inputId: 'abcInput'+Math.random(), filename:'SUBIR IMAGEN'};

  previewFile  = () => {
    var t = this;
    var inp = document.getElementById(this.state.inputId);
    inp.click();

    inp.onchange = function(e) { 
      var file = inp.files[0];
      t.setState({filename: file.name})
      var reader = new FileReader();
      Actions.nav.loaderOpen();
      reader.readAsDataURL(file);
      reader.onload = function () {
        Actions.nav.loaderClose();
        if(t.props.onChange){t.props.onChange(reader.result)}
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
      
    };

    



  };

  render() {
    return (


      <div style={{ textAlign:'center'}}>  
      	
        <Button label={this.state.filename} icon="add_a_photo" raised accent
        onClick={this.previewFile}>
          <Input type='file' id={this.state.inputId}
            style={{display: "none"}}
          
          />

        </Button>

        
                           
      </div>
        	


    );
  }
}



export default UploadImage;