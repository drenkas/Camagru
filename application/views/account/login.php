<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/login.css">

<div class="container">
	<div class="card"></div>
	<div class="card">
		<h1 class="title">Вхід</h1>
		<form action="<?php echo ROOT_URL; ?>account/login" method="post" autocomplete="off">
			<div class="input-container">
				<input type="text" id="login-login" name="login" required="required"/>
				<label for="login-login">Ім'я користувача</label>
				<div class="bar"></div>
				<div class="error" id="error-login">Невірно вказане ім'я користувача</div>
			</div>
			<div class="input-container">
				<input type="password" id="password-login" name="password" required="required"/>
				<label for="password-login">Пароль</label>
				<div class="bar"></div>
				<div class="error" id="error-pass">Невірно вказаний пароль</div>
			</div>
			<div class="button-container">
				<button type="submit" id="submit-login" name="enter"><span>Гайда!</span></button>
			</div>
			<div class="footer"><a href="#">Забув пароль? Їбать ти лох.</a></div>
		</form>
	</div>
</div>

<script src="<?php echo ROOT_URL; ?>public/js/loginForm.js"></script>