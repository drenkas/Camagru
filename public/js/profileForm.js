
window.onload = () => {
	var profile_btn_login = document.getElementById('submit-profile-login'),
		profile_btn_email = document.getElementById('submit-profile-email'),
		profile_btn_password = document.getElementById('submit-profile-pass');
	var reg_success = document.getElementById('profileSuccessModal');
	var reg_success__body = document.getElementById('profileSuccessModal__body');
	var backdrop = document.getElementById('backdrop');
	var loading = document.getElementById('profileLoading');
	var login = document.getElementById('login-profile');
	var email = document.getElementById('email-profile');
	var password = document.getElementById('passwd-profile');
	var regLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/,
		regEmail = /^([a-z0-9_-]{1,15}\.){0,3}[a-z0-9_-]{1,15}@[a-z0-9_-]{1,15}\.[a-z]{2,6}$/,
		regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z]){4}).{8,20}$/;
	var toggleNotif = document.getElementById('slideThree');

	var hrefUrl = "document.location.href='"+document.URL+"'";


	if (login && password && email) {
		login.onchange = onLoginChange;
		password.onchange = onPassChange;
		email.onchange = onEmailChange;
	}

	if (toggleNotif)
		toggleNotif.onclick = onNotifChange;

	profile_btn_login.addEventListener('click', function(){submition(login, regLogin)}, false);
	profile_btn_email.addEventListener('click', function(){submition(email, regEmail)}, false);
	profile_btn_password.addEventListener('click', function(){submition(password, regPass)}, false);

	function onNotifChange() {
		var element = this;
		backdrop.classList.remove("display-hide");
		backdrop.classList.add("display-show");
		loading.classList.remove("display-hide");
		loading.classList.add("display-show");
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({
				check: true,
				value: element.checked
			})
		})
		.then(res => res.json())
		.then(res => {
			loading.classList.remove("display-show");
			loading.classList.add("display-hide");
			if (res.status === "success")
			{
				backdrop.classList.remove("display-show");
				backdrop.classList.add("display-hide");
			} else if (res.status === "error") {
				reg_success.classList.remove("display-hide");
				reg_success.classList.add("display-show");
				reg_success__body.innerHTML = res.message;
				document.getElementById('profileSuccessModal__button').addEventListener('click', function () {
					document.location.href = document.URL;
				});
				document.getElementById('profileSuccessModal__button').classList.remove("btn-primary");
				document.getElementById('profileSuccessModal__button').classList.add("btn-danger");
				document.getElementById('profileSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
				document.getElementById('profileModalLabel').innerHTML = "Провальне *як твоє життя* Редагування";
			}
		})
		.catch(e => {
			document.getElementById('profileSuccessModal__button').addEventListener('click', function () {
				document.location.href = document.URL;
			});
			reg_success__body.innerHTML = "Сервер повернув відповідь невірного формату."
			document.getElementById('profileSuccessModal__button').classList.remove("btn-primary");
			document.getElementById('profileSuccessModal__button').classList.add("btn-danger");
			document.getElementById('profileSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
			document.getElementById('profileModalLabel').innerHTML = "Сталося щось страшне";
		});
		
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
					case "email":
						element.parentNode.childNodes[7].innerHTML = "Невірний формат email. example@gmail.com";
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
		checkExists('login', element);
	}

	function onPassChange() {
		var element = this,
			regexp = regPass; 
		grantDeny(element, regexp);
	}

	function onEmailChange() {
		var element = this,
			regexp = regEmail; 
		grantDeny(element, regexp);
		checkExists('email', element);
	}

	function finalCheck(element, regexp) {
		var value = element.value;
		if (regexp.test(value)) {
			return true;
		}
		return false;
	}

	function submition(element, regexp) {
		if(finalCheck(element, regexp)) {
			checkExists(element.name, element).then(res =>{
				if (res) {
					backdrop.classList.remove("display-hide");
					backdrop.classList.add("display-show");
					loading.classList.remove("display-hide");
					loading.classList.add("display-show");
					fetch('', {
						method: 'POST',
						headers: {
							'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
							'Content-Type': 'application/json'
						},
						mode: 'cors',
						body: JSON.stringify({
							submit: true,
							submit_type: element.name,
							value: element.value
						})
					})
					.then(res => res.json())
					.then(res => {
						loading.classList.remove("display-show");
						loading.classList.add("display-hide");
						reg_success.classList.remove("display-hide");
						reg_success.classList.add("display-show");
						reg_success__body.innerHTML = res.message;
						if (res.status === "success")
						{
							document.getElementById('profileSuccessModal__button').addEventListener('click', function () {
								document.location.href = document.URL;
							});
							document.getElementById('profileSuccessModal__button').classList.remove("btn-danger");
							document.getElementById('profileSuccessModal__button').classList.add("btn-primary");
							document.getElementById('profileSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
							document.getElementById('profileModalLabel').innerHTML = "Успішне Редагування";
							setTimeout(hrefUrl, 5000);
						} else if (res.status === "error") {
							document.getElementById('profileSuccessModal__button').addEventListener('click', function () {
								document.location.href = document.URL;
							});
							document.getElementById('profileSuccessModal__button').classList.remove("btn-primary");
							document.getElementById('profileSuccessModal__button').classList.add("btn-danger");
							document.getElementById('profileSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
							document.getElementById('profileModalLabel').innerHTML = "Провальне *як твоє життя* Редагування";
						}
					})
					.catch(e => {
						document.getElementById('profileSuccessModal__button').addEventListener('click', function () {
							document.location.href = document.URL;
						});
						reg_success__body.innerHTML = "Сервер повернув відповідь невірного формату."
						document.getElementById('profileSuccessModal__button').classList.remove("btn-primary");
						document.getElementById('profileSuccessModal__button').classList.add("btn-danger");
						document.getElementById('profileSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
						document.getElementById('profileModalLabel').innerHTML = "Сталося щось страшне";
					});
				}
			})
		};
	}

	function checkExists(type, element) {
		return fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: type,
				value: element.value
			})
		})
		.then(res => res.json())
		.then(res => {
			if (res.status === "error") {
					element.parentNode.childNodes[5].classList.remove("bar-confirm");
					element.parentNode.childNodes[5].classList.add("bar-error");
					element.parentNode.childNodes[7].classList.add("error-show");
					element.parentNode.childNodes[7].innerHTML = res.message + " ";
				
				return false;
			} else if( res.status === "success" ){
				return true;
			}
		})
		.catch(e => console.log(e))
	}
};