

function validator(type, val, required){

	if(required === true){
		if(typeof val === "string" && val === ""){
			return "Este campo es requerido"
		}		
		else if(typeof val === "object" && val.val1 === ""){
			return "Este campo es requerido"
		}
	}
	if(type === "email"){
		let emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	let test = emailRE.test(val);
		if(test === false){
			return "Correo electrónico inválido"
		}
	}
	if(type === "username"){
		if(val.length < 6){
			return "La longitud mínima es de 6 caracteres"
		}
	}
	if(type === "password"){
		if(val.length < 6){
			return "La longitud mínima es de 6 caracteres"
		}
	}
	if(type === "phone"){
		if(val.length < 10){
			return "La longitud mínima es de 10 caracteres"
		}
	}
	if(type === "currency"){
		if(isNaN(val)){
			return "Este valor debe ser numérico";
		} else if(val < 0) {
			return "Este valor debe ser un número positivo";
		}
	}
	if(type === "passwordRepeat"){
		if(val.val1 !== val.val2){
			return "Las contraseñas no concuerdan"
		}
	}
	if(type === "validate"){
		for(let prop in val){
			if(val[prop] !== ""){
				return false
			}
		}
		return true
	}

	return ""
	


}




export default validator;
