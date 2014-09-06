var init = function(){
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


};

document.addEventListener('DOMContentLoaded', init, false);