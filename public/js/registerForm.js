
window.onload = () => {

	var register_form = document.getElementById('form-register');
	var register_btn = document.getElementById('submit-register');
	var login = document.getElementById('login-register');
	var email = document.getElementById('email-register');
	var password = document.getElementById('passwd-register');
	var regLogin = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/,
		regEmail = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/,
		regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/;
	if (login && password && email) {
		login.onchange = onLoginChange;
		password.onchange = onPassChange;
		email.onchange = onEmailChange;
	}
	register_btn.addEventListener('click', submition);
	function grantDeny(element, regexp, errorMessage) {
		var value = element.value;
		if (value === "") {
			element.classList.remove("granted");
			element.classList.remove("denied");
			if (element.parentNode.firstChild.classList.value === "error") {
				var delErr = element.parentNode.firstChild;
				element.parentNode.removeChild(delErr);
			}
		} else {
			if (regexp.test(value)) {
				element.classList.remove("denied");
				element.classList.add("granted");
				if (element.parentNode.firstChild.classList.value === "error") {
					var delErr = element.parentNode.firstChild;
					element.parentNode.removeChild(delErr);
				}
			} else {
				element.classList.remove("granted");
				element.classList.add("denied");
				if (element.parentNode.firstChild.classList.value !== "error") {
					var msgElem = document.createElement('span');
					msgElem.className = "error";
					msgElem.innerHTML = errorMessage + " ";
					element.parentNode.insertBefore(msgElem, element);
				}
			}
		}
	  }

	function onLoginChange() {
		var element = this,
			errorMessage = " Имя задано неправильно ";
			regexp = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/; //Пропускаем только латинские или русские буквы и пробел между первым и вторым словом (если второе слово есть). Оба слова могут начинаться с большой буквы
		grantDeny(element, regexp, errorMessage);
	}

	function onPassChange() {
		var element = this,
			regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/; 
		errorMessage = " Пароль задан неправильно ";
		grantDeny(element, regexp, errorMessage);
	}

	function onEmailChange() {
		var element = this,
			regexp = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/; //Пропускаем до 15 символов a-z0-9_- перед собачкой, также это может быть до 4 слов, разделенных точками. Затем собачка и имя домена (от 1 до 15 символов). Затем доменная зона - от 2 до 6 латинских букв
		errorMessage = " Email задан неправильно ";
		checkExists('email', element.value);
		grantDeny(element, regexp, errorMessage);
	}

	function finalCheck(element, regexp) {
		var value = element.value;
		if (regexp.test(value)) {
			return true;
		}
		return false;
	}

	function submition(e) {
		if(finalCheck(login, regLogin) && finalCheck(email, regEmail) && finalCheck(password, regPass)) {
			fetch('', {
				method: 'POST',
				headers: {
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
					'Content-Type': 'application/json'
				},
				mode: 'cors',
				body: JSON.stringify({
					
					login: login.value,
					submit: true,
					email: email.value,
					password: password.value
				})
			})
			.then(res => res.json())
			.then(res => console.log("RES",res))
			.catch(e => console.log("E", e));
		} else {
			e.preventDefault();
		}
	}

	function checkExists(type, value) {
		console.log("object ", type, value, document.URL);
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: type,
				value: value
			})
		})
		.then(res => res.json())
		.then(res => console.log("RES",res))
	}
};