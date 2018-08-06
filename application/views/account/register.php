<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/register.css">
<h3>Регистрация</h3>
<form id="form-register" name="form-register" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
	<p>Логин</p>
	<p><input type="text" name="login" id="login-register" placeholder="UberHeliSexual" ></p>
	<p>E-mail</p>
	<p><input type="email" name="email"  id="email-register" placeholder="UberHeliSexual@example.com"></p>
	<p>Пароль</p>
	<p><input type="password" name="password"  id="passwd-register" placeholder="Password"></p>
	<input id="submit-register" class="register" type="submit" value="Register">
</form>
</div>
<script src="<?php echo ROOT_URL; ?>public/js/registerForm.js"></script>