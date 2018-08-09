
window.onload = () => {
	var register_btn = document.getElementById('submit-register');
	var reg_success = document.getElementById('registerSuccessModal');
	var reg_success__body = document.getElementById('registerSuccessModal__body');
	var backdrop = document.getElementById('backdrop');
	var login = document.getElementById('login-register');
	var email = document.getElementById('email-register');
	var password = document.getElementById('passwd-register');
	var regLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
		regEmail = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/,
		regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/;
	

	var homeUrl = document.URL.slice(0, -16);
	var hrefUrl = "document.location.href='"+homeUrl+"'";


	if (login && password && email) {
		login.onchange = onLoginChange;
		password.onchange = onPassChange;
		email.onchange = onEmailChange;
	}


	register_btn.addEventListener('click', submition);
	


	function grantDeny(element, regexp, errorMessage) {
		var value = element.value;
		if (element.parentNode.firstChild.classList.value === "error") {
			var delErr = element.parentNode.firstChild;
			element.parentNode.removeChild(delErr);
		}
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
			errorMessage = " Ім'я задано неправильно ";
			regexp = regLogin; 
		grantDeny(element, regexp, errorMessage);
		checkExists('login', element.value, element);
	}

	function onPassChange() {
		var element = this,
			regexp = regPass; 
		errorMessage = " Пароль задано неправильно ";
		grantDeny(element, regexp, errorMessage);
	}

	function onEmailChange() {
		var element = this,
			regexp = regEmail; 
		errorMessage = " Email задано неправильно ";
		grantDeny(element, regexp, errorMessage);
		checkExists('email', element.value, element);
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
			e.preventDefault();
			checkExists('login', login.value, login).then(res =>{
				if (res) {
					checkExists('email', email.value, email).then(res =>{
						if (res) {
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
							.then(res => {
								reg_success.classList.remove("display-hide");
								reg_success.classList.add("display-show");
								backdrop.classList.remove("display-hide");
								backdrop.classList.add("display-show");
								reg_success__body.innerHTML = res.message;
								if (res.status === "success")
								{
									document.getElementById('registerSuccessModal__button').addEventListener('click', function () {
										document.location.href = homeUrl;
									});
									document.getElementById('registerSuccessModal__button').classList.remove("btn-danger");
									document.getElementById('registerSuccessModal__button').classList.add("btn-primary");
									document.getElementById('registerSuccessModal__button').innerHTML = 'Перейти на головна';
									document.getElementById('registerModalLabel').innerHTML = "Успішна Реєстрація";
									setTimeout(hrefUrl, 5000);
								} else if (res.status === "error") {
									document.getElementById('registerSuccessModal__button').addEventListener('click', function () {
										document.location.href = document.URL;
									});
									document.getElementById('registerSuccessModal__button').classList.remove("btn-primary");
									document.getElementById('registerSuccessModal__button').classList.add("btn-danger");
									document.getElementById('registerSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
									document.getElementById('registerModalLabel').innerHTML = "Провальная *як твоє життя* Реєстрація";
								}
							})
							.catch(e => console.log("E", e));
						}
					})
				}
			})
		} else {
			e.preventDefault();
		}
	}

	function checkExists(type, value, element) {
		return fetch('', {
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
		.then(res => {
			if (res.status === "error") {
				element.classList.remove("granted");
				element.classList.add("denied");
				if (element.parentNode.firstChild.classList.value !== "error") {
					var msgElem = document.createElement('span');
					msgElem.className = "error";
					msgElem.innerHTML = res.message + " ";
					element.parentNode.insertBefore(msgElem, element);
				}
				return false;
			} else if( res.status === "success" ){
				return true;
			}
		})
		.catch(e => console.log(e))
	}
};