<?php

return [

	'' => [
		'controller' => 'main',
		'action' => 'index',
	],

	'account/login' => [
		'controller' => 'account',
		'action' => 'login',
	],

	'account/register' => [
		'controller' => 'account',
		'action' => 'register',
	],
	'account/profile' => [
		'controller' => 'account',
		'action' => 'profile',
	],
	'account/logout' => [
		'controller' => 'account',
		'action' => 'logout',
	],

	'account/confirm/{verification:\w+}' => [
		'controller' => 'account',
		'action' => 'confirm',
	],
	
];