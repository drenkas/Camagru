<?php
 	header("Access-Control-Allow-Origin: *");
	define("ROOT_URL", pathinfo($_SERVER['PHP_SELF'])['dirname'] . '/');
?>