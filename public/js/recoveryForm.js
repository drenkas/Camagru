
window.onload = () => {
	var register_btn = document.getElementById('submit-register');
	var reg_success = document.getElementById('registerSuccessModal');
	var reg_success__body = document.getElementById('registerSuccessModal__body');
	var backdrop = document.getElementById('backdrop');
	var loading = document.getElementById('registerLoading');
	var login = document.getElementById('login-register');
	var regLogin = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;

	var homeUrl = document.URL.slice(0, -16);
	var hrefUrl = "document.location.href='"+homeUrl+"'";


	if (login) {
		login.onchange = onLoginChange;
	}


	register_btn.addEventListener('click', submition);
	


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

	function finalCheck(element, regexp) {
		var value = element.value;
		if (regexp.test(value)) {
			return true;
		}
		return false;
	}

	function submition(e) {
		if(finalCheck(login, regLogin)) {
			e.preventDefault();
			checkExists('login', login).then(res =>{
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
						credentials: 'same-origin',
						mode: 'cors',
						body: JSON.stringify({
							
							login: login.value,
							submit: true,
						})
					})
					.then(res => res.json())
					.then(res => {
						console.log("submit", res);
						loading.classList.remove("display-show");
						loading.classList.add("display-hide");
						reg_success.classList.remove("display-hide");
						reg_success.classList.add("display-show");
						reg_success__body.innerHTML = res.message;
						if (res.status === "success")
						{
							document.getElementById('registerSuccessModal__button').addEventListener('click', function () {
								document.location.href = homeUrl;
							});
							document.getElementById('registerSuccessModal__button').classList.remove("btn-danger");
							document.getElementById('registerSuccessModal__button').classList.add("btn-primary");
							document.getElementById('registerSuccessModal__button').innerHTML = 'Перейти на головну';
							document.getElementById('registerModalLabel').innerHTML = "Успішне Відновлення";
							setTimeout(hrefUrl, 5000);
						} else if (res.status === "error") {
							document.getElementById('registerSuccessModal__button').addEventListener('click', function () {
								document.location.href = document.URL;
							});
							document.getElementById('registerSuccessModal__button').classList.remove("btn-primary");
							document.getElementById('registerSuccessModal__button').classList.add("btn-danger");
							document.getElementById('registerSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
							document.getElementById('registerModalLabel').innerHTML = "Провальне *як твоє життя* Відновлення";
						}
					})
					.catch(e => {
						document.getElementById('registerSuccessModal__button').addEventListener('click', function () {
							document.location.href = document.URL;
						});
						reg_success__body.innerHTML = "Сервер повернув відповідь невірного формату."
						document.getElementById('registerSuccessModal__button').classList.remove("btn-primary");
						document.getElementById('registerSuccessModal__button').classList.add("btn-danger");
						document.getElementById('registerSuccessModal__button').innerHTML = 'Перезавантажити сторінку';
						document.getElementById('registerModalLabel').innerHTML = "Сталося щось страшне";
					});
				}
			})
		} else {
			e.preventDefault();
		}
	}

	function checkExists(type, element) {
		return fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			body: JSON.stringify({
				type: type,
				value: element.value
			})
		})
		.then(res => res.json())
		.then(res => {
			console.log("Check", res);
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