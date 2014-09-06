var init = function (evLoad) {
	///////////////////////////
	//COMPROBAR HORA ACTUAL //
	///////////////////////////
	var	today = new Date(),
		now = today.getHours(),
		msg = '';

	if(  now >= 9 && now <= 12 ){
		msg = 'buenos dias';
	}else if( now > 12  && now <= 15 ){
		msg = 'es mediodia';
	} else if ( now > 15 && now <= 21) {
		msg = 'buenas tardes';
	} else {
		msg = 'buenas tardes';
	}
	document.querySelector('.hour').innerText = msg;

	/////////////////////////
	// VALIDAR FORMULARIO //
	/////////////////////////
	document.forms.userFormRegisterr.onsubmit =  function(evSubmit){
		var	form = evSubmit.target,
				pass = form.querySelector('#userPass'),
				passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{1,}$/,
				pass2 = form.querySelector('#userPass2'),
				tel = form.querySelector('#userTel'),
				comment = form.querySelector('#userMsg'),
				email = form.querySelector('#userMail'),
				emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		return	(	!checkEmptyValues(form) | !samePassword(pass, pass2) | !onlyNumbers(tel) |
						!maxChar(comment, 350, 'comentario demasiado largo, maximo 350 caracteres')	|
						!minChar(pass, 5, 'minimo 5 caracteres alfanumericos') |
						!isValidPattern(emailPattern, email, 'Email no valido') |
						!isValidPattern(passPattern, pass, 'Minimo 1 Numero, 1 Mayuscula, 1 Minuscula')) ?
					false : true;

	};
};

var isValidPattern = function(pattern, input, msg){
	if( (input.value !== '') && !pattern.test(input.value) ){ // !input.value.match(pattern)
		document.querySelector('span.error.'+input.id).innerText += ' | '+msg+' | ';
		return false;
	}
	return true;
};

var minChar = function(input, min, msg){
	if( (input.value !== '') && input.value.length < min ){
		document.querySelector('span.error.'+input.id).innerText += ' | '+msg+' | ';
		return false;
	}
	return true;
};

var maxChar = function(input, max, msg){
	if( (input.value !== '') && input.value.length > max ){
		document.querySelector('span.error.'+input.id).innerText += ' | '+msg+' | ';
		return false;
	}
	return true;
};

var onlyNumbers = function( input ){
	if( (input.value !== '') && isNaN(input.value) ){
		document.querySelector('span.error.'+input.id).innerText += ' | solo numeros , no letras | ';
		return false;
	}

	return true;
};

var samePassword = function( pass1, pass2 ){
	if( (pass1.value !== '') && (pass1.value !== pass2.value) ){
		document.querySelector('span.error.'+pass2.id).innerText += ' | los passwords NO son iguales | ';
		return false;
	}

	return true;
};

var checkEmptyValues = function ( form ){
	var	inputs = form.elements,
			numEmpty = 0;

	for (var i = 0, len = inputs.length; i < len; i++) {
	
		// no podemos llamar a innerText de Submit
		if( inputs[i].type !== 'submit'){
			// vaciamos el span de errror de ese input
			var errorInput = document.querySelector('span.error.'+inputs[i].id);
			errorInput.innerText = '';
				
			// obviar comentarios y segundo password
			if(	inputs[i].value === '' &&
					inputs[i].id !== 'userPass2' &&
					inputs[i].id !== 'userMsg' ){
				numEmpty++;
				errorInput.innerText += ' | falta rellenar campo | ';
			}
		}
	}

	return ( numEmpty > 0 ) ? false : true;
};

document.addEventListener('DOMContentLoaded', init, false);