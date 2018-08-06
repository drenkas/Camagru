<?php

namespace application\models;

use application\core\Model;

class Account extends Model {

	public function checkEmailExists($email) {
		$params = [
			'email' => $email,
		];
		return $this->db->column('SELECT id FROM users WHERE email = :email', $params);
	}

	public function checkLoginExists($login) {
		$params = [
			'login' => $login,
		];
		if ($this->db->column('SELECT id FROM users WHERE login = :login', $params)) {
			$this->error = 'Этот логин уже используется';
			return false;
		}
		return true;
	}

	public function register($post) {
		/* $token = $this->createToken(); */
		$activation = md5($post['email'].time()); // encrypted email+timestamp
		$params = [
			'email' => $post['email'],
			'login' => $post['login'],
			'password' => password_hash($post['password'], PASSWORD_BCRYPT),
			'verificationCode' => $activation
		];
		
		$this->db->query('INSERT INTO users (email, login, password, verificationCode) VALUES (:email, :login, :password, :verificationCode)', $params);
		/* mail($post['email'], 'Register', 'Confirm: '.$_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/account/confirm/'.$token); */
	}

}