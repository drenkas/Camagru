window.onload = () => {
	var login_btn = document.getElementById('submit-login');
	var login = document.getElementById('login-login');
	var password = document.getElementById('password-login');
	var error_login = document.getElementById('error-login');
	var error_pass = document.getElementById('error-pass');

	login_btn.addEventListener('click', submition);

	var homeUrl = document.URL.slice(0, -13);


	function submition(e) {
		e.preventDefault();
		error_login.classList.remove("error-show");
		error_pass.classList.remove("error-show");
		checkExists('check', password, login).then(res =>{
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

	function checkExists(type, pass, login) {
		return fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				type: type,
				pass: pass.value,
				login: login.value
			})
		})
		.then(res => res.json())
		.then(res => {
			if (res.status === "error") {
				if (res.message === "Невірно вказано пароль")
					error_pass.classList.add("error-show");
				else {
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