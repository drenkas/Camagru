<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/register.css">
<h3>Реєстрація</h3>
<form id="form-register" name="form-register" action="<?php //echo $_SERVER['PHP_SELF']; ?>" method="post">
	<p>Логін</p>
	<p><input type="text" name="login" id="login-register" placeholder="UberHeliSexual" ></p>
	<p>E-mail</p>
	<p><input type="email" name="email"  id="email-register" placeholder="UberHeliSexual@example.com"></p>
	<p>Пароль</p>
	<p><input type="password" name="password"  id="passwd-register" placeholder="Password"></p>
	<input id="submit-register" class="register" type="submit" value="Register">
</form>

<div class="modal fade show display-hide" id="registerSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="registerModalLabel"></h5>
				
			</div>
			<div class="modal-body" id="registerSuccessModal__body">
			</div>
			<div class="modal-footer">
				<button id="registerSuccessModal__button" type="button" class="btn btn-primary"></button>
			</div>
		</div>
	</div>
</div>
<div class="modal-backdrop fade show display-hide" id="backdrop" ></div>
<script src="<?php echo ROOT_URL; ?>public/js/registerForm.js"></script>