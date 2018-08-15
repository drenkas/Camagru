<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/register.css">

<div class="container">
	<div class="card"></div>
	<div class="card">
		<h1 class="title">Відновлення паролю</h1>
		<form id="form-register" name="form-register" method="post" autocomplete="off">
			<div class="input-container">
            <input type="password" id="passwd-register" name="password" required="required"/>
				<label for="passwd-register">Новий пароль</label>
				<div class="bar"></div>
				<div class="error" id="error-pass"></div>
			</div>
			<div class="button-container">
				<button type="submit" id="submit-register" name="enter"><span>Покінчимо з цим!</span></button>
			</div>
		</form>
	</div>
</div>

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
<div id="registerLoading" class="banter-loader display-hide">
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
</div>
<div class="modal-backdrop fade show display-hide" id="backdrop" ></div>
<script src="<?php echo ROOT_URL; ?>public/js/resetForm.js"></script>