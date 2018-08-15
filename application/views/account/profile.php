<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/profile.css">

<div class="container">
	<div class="card"></div>
	<div class="card">
		<h1 class="title">Профіль</h1>
		<h6>Твоє ім'я: <?php echo $_SESSION['authorize']['login'];?></h6>
		<h6 class="last-h6">Твій e-mail: <?php echo $_SESSION['authorize']['email'];?></h6>
		<form name="form-profile" method="post" autocomplete="off">
			<div class="input-container">
				<input type="text" id="login-profile" name="login" required="required"/>
				<label for="login-profile">Змінити ім'я користувача</label>
				<div class="bar"></div>
				<div class="error" id="error-login"></div>
				<div class="button-container">
					<button  id="submit-profile-login" onclick="event.preventDefault()"  name="enter"><span>GO</span></button>
				</div>
			</div>
		</form>
		<form name="form-profile" method="post" autocomplete="off">
			<div class="input-container">
				<input type="text" id="email-profile" name="email" autocomplete="off" required="required"/>
				<label for="email-profile">Змінити E-mail</label>
				<div class="bar"></div>
				<div class="error" id="error-email"></div>
				<div class="button-container">
					<button  id="submit-profile-email" onclick="event.preventDefault()" name="enter"><span>GO</span></button>
				</div>
			</div>
		</form>
		<form name="form-profile" method="post" autocomplete="off">
			<div class="input-container">
				<input type="password" id="passwd-profile" name="password" required="required"/>
				<label for="passwd-profile">Змінити пароль</label>
				<div class="bar"></div>
				<div class="error" id="error-pass"></div>
				<div class="button-container">
					<button  id="submit-profile-pass" onclick="event.preventDefault()" name="enter"><span>GO</span></button>
				</div>
			</div>
		</form>
		<span class="slide-text">Надсилати сповіщення?</span>
		<div class="slideThree">  
			<input type="checkbox" value="None" id="slideThree" name="check" <?php if ($_SESSION['authorize']['isNotif'] == "1") : ?> checked<?php endif	?>/>
			<label for="slideThree"></label>
		</div>
	</div>
</div>

<div class="modal fade show display-hide" id="profileSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h6 class="modal-title" id="profileModalLabel"></h6>
				
			</div>
			<div class="modal-body" id="profileSuccessModal__body">
			</div>
			<div class="modal-footer">
				<button id="profileSuccessModal__button" type="button" class="btn btn-primary"></button>
			</div>
		</div>
	</div>
</div>
<div id="profileLoading" class="banter-loader display-hide">
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
<script src="<?php echo ROOT_URL; ?>public/js/profileForm.js"></script>