window.onload = () => {
	var login_btn = document.getElementById('submit-login');
	var login = document.getElementById('login-login');
	var password = document.getElementById('password-login');
	var error_login = document.getElementById('error-login');
	var error_pass = document.getElementById('error-pass');
	var regLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
	regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/;

	login_btn.addEventListener('click', submition);

	var homeUrl = document.URL.slice(0, -13);

	if (login && password) {
		login.onchange = onLoginChange;
		password.onchange = onPassChange;
	}

	function grantDeny(element, regexp) {
		var value = element.value;
		element.parentNode.childNodes[5].classList.remove("bar-error");
		element.parentNode.childNodes[5].classList.remove("bar-confirm");
		element.parentNode.childNodes[7].classList.remove("error-show");
		if (value != '') {
			if (regexp.test(value)) {
				element.parentNode.childNodes[5].classList.add("bar-confirm");
			} else {
				element.parentNode.childNodes[5].classList.add("bar-error");
				element.parentNode.childNodes[7].classList.add("error-show");
				switch (element.name) {
					case "login":
						element.parentNode.childNodes[7].innerHTML = "Ім'я повинно містити 1-20 символів a-z A-Z 0-9";
						break;
					case "password":
						element.parentNode.childNodes[7].innerHTML = "Пароль повинен містити 8-20 символів a-z, A-Z та 0-9";
						break;
					default:
						break;
				}
			}
		}
	}

	function onLoginChange() {
		var element = this,
			regexp = regLogin; 
		grantDeny(element, regexp);
	}

	function onPassChange() {
		var element = this,
			regexp = regPass; 
		grantDeny(element, regexp);
	}

	function finalCheck(element, regexp) {
		var value = element.value;
		grantDeny(element, regexp);
		if (regexp.test(value)) {
			return true;
		}
		return false;
	}

	function submition(e) {
		e.preventDefault();
		error_login.classList.remove("error-show");
		error_pass.classList.remove("error-show");
		if(finalCheck(login, regLogin) && finalCheck(password, regPass)) {
			checkExists('check', password, login).then(res =>{
				if (res) {
					fetch('', {
						method: 'POST',
						headers: {
							'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
							'Content-Type': 'application/json'
						},
						credentials: 'same-origin',
						mode: 'cors',
						body: JSON.stringify({
							
							login: login.value,
							submit: true,
							password: password.value
						})
					})
					.then(res => res.json())
					.then(res => {
						if( res.status === "success" ){
							document.location.href=homeUrl;
						} else {
							error_login.innerHTML = res.message;
							error_login.classList.add("error-show");
						}
					})
					.catch(e => {
						error_login.innerHTML = e;
						error_login.classList.add("error-show");
					});
				}
			})
		}
	}

	function checkExists(type, pass, login) {
		return fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify({
				type: type,
				pass: pass.value,
				login: login.value
			})
		})
		.then(res => res.json())
		.then(res => {
			if (res.status === "error") {
				
				if (res.message === "Невірно вказано пароль"){
					error_pass.classList.add("error-show");
					error_pass.parentNode.querySelector('.bar').classList.add("bar-error");
					error_pass.parentNode.querySelector('.bar').classList.remove("bar-confirm");
				}
				else {
					error_login.parentNode.querySelector('.bar').classList.remove("bar-confirm");
					error_login.parentNode.querySelector('.bar').classList.add("bar-error");
					error_login.innerHTML = res.message;
					error_login.classList.add("error-show");
				}
				return false;
			} else if( res.status === "success" ){
				document.location.href=homeUrl;
				return true;
			}
		})
		.catch(e => {
			error_login.innerHTML = e;
			error_login.classList.add("error-show");
		})
	}
}