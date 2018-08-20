<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title><?php echo $title; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">


		
		<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/bootstrap.min.css">
		<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/bootstrap-grid.min.css">
		<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/bootstrap-reboot.min.css">
		<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/style.css">
	</head>
	<body>
	<div id="default-page">
		<a href="#" class="js-default-nav-toggle default-nav-toggle"><i></i></a>
		<aside id="default-aside" role="complementary" class="border js-fullheight">
			<h1 id="default-logo"><a href="<?php echo ROOT_URL; ?>">Camagru</a></h1>
			<?php if (isset($_SESSION['authorize']['id'])) : ?>
				<h3 id="default-authorize-name">Привіт, <a id="username" href="<?php echo ROOT_URL; ?>account/profile"><?php echo $_SESSION['authorize']['login'];?></a></h3>
			<?php endif	?>
			<nav id="default-main-menu" role="navigation">
				<ul id="default-main-list">
					<li name="Головна"><a href="<?php echo ROOT_URL; ?>">Головна</a></li>
					<li name="Галерея"><a href="<?php echo ROOT_URL; ?>post/gallery">Галерея</a></li>
					<?php if (isset($_SESSION['authorize']['id'])) : ?>
					<li name="Профіль"><a href="<?php echo ROOT_URL; ?>account/profile">Профіль</a></li>
					<li name="Зробити пікчу"><a href="<?php echo ROOT_URL; ?>post/snap">Зробити пікчу</a></li>
					<li name="Вийти"><a href="<?php echo ROOT_URL; ?>account/logout">Вийти</a></li>
					<?php else: ?>
					<li name="Реєстрація"><a href="<?php echo ROOT_URL; ?>account/register">Реєстрація</a></li>
					<li name="Авторизація"><a href="<?php echo ROOT_URL; ?>account/login">Авторизація</a></li>
					<?php endif	?>
					
				</ul>
			</nav>
			<script src="<?php echo ROOT_URL; ?>public/js/default.js"></script>
			<div class="default-footer">
				
Copyright &copy;<script>document.write(new Date().getFullYear());</script> Created by <a href="https://profile.intra.42.fr/users/drenkas" target="_blank">Drenkas</a>

			</div>

		</aside>
		<div id="default-main">
			<?php echo $content; ?>
		</div>
	</div>


	</body>
</html>
