<h3>Вход</h3>
<?php var_dump(ROOT_URL) ?>
<form action="<?php echo ROOT_URL; ?>account/login" method="post">
	<p>Логин</p>
	<p><input type="text" name="login"></p>
	<p>Пароль</p>
	<p><input type="text" name="password"></p>
	<b><button type="submit" name="enter">Вход</button></b>
</form>