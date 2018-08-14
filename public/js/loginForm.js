window.onload = () => {
	var login_btn = document.getElementById('submit-login');
	var login = document.getElementById('login-login');
	var password = document.getElementById('password-login');
	var error_login = document.getElementById('error-login');
	var error_pass = document.getElementById('error-pass');

	login_btn.addEventListener('click', submition);

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
				.then(res => res.text())
				.then(res => {
					console.log("RES", res);
				})
				.catch(e => {
					console.log("E", e);
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
			console.log("res111 ", res);
			if (res.status === "error") {
				if (res.message === "Такого логіна не існує")
					error_login.classList.add("error-show");
				else error_pass.classList.add("error-show");
				return false;
			} else if( res.status === "success" ){
				return true;
			}
		})
		.catch(e => console.log(e))
	}
}