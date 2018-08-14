<?php

namespace application\models;

use application\core\Model;

class Account extends Model {

	public function sendVerifMail ($params) {
		$encoding = "utf-8";

		// Set preferences for Subject field
		$subject_preferences = array(
			"input-charset" => $encoding,
			"output-charset" => $encoding,
			"line-length" => 76,
			"line-break-chars" => "\r\n"
		);
		$from_name = 'Camagru';
		$from_mail = 'noreply@camagru.com';
		$mail_subject = iconv_mime_encode("Subject", "Підтвердіть ваш профіль", $subject_preferences);
		// Set mail header
		$header = "Content-type: text/html; charset=".$encoding." \r\n";
		$header .= "From: ".$from_name." <".$from_mail."> \r\n";
		$header .= "MIME-Version: 1.0 \r\n";
		$header .= "Content-Transfer-Encoding: 8bit \r\n";
		$header .= "Date: ".date("r (T)")." \r\n";
		/* $header .= iconv_mime_encode("Subject", $mail_subject); */
		$bytes = openssl_random_pseudo_bytes(32);
		$mail_message = '
		<html>
			<body>
			<h1>Ну і навіщо ти зареєструвався? Воно тобі треба?</h1>
		<h2>Насправді, твій профіль вже створено, тому зворотнього шляху немає. Тож запиши на папірчик свої данні для входу! Ми ж не дарма працювали...</h2>
		<pre> 
		------------------------
		Username: '.$params['login'].'
		Password: *******
		------------------------
		</pre>
		Ну і якщо на те пішло, то тисни на посилання, щоб ми точно знали що це твоя скринька: ';
		$mail_message .= 'http://localhost' . ROOT_URL . 'account/confirm/'.$params['verificationCode'];
		$mail_message .= '</body></html>';
		// Send mail	
		$mailSent = mail($params['email'], $mail_subject, $mail_message, $header);
		if ($mailSent) {
			return true;
		}else {
			$this->error = "Сталась оказія з відправкою: " . $mailSent;
			return false;
		};
	}

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
			return true;
		}
		return false;
	}

	public function changeVerif($verif) {
		$params = [
			'verificationCode' => $verif,
		];
		if ($this->db->column('SELECT id FROM users WHERE verificationCode = :verificationCode', $params)) {
			$this->db->query('UPDATE users SET status = 1, verificationCode = "" WHERE verificationCode = :verificationCode', $params);
			return true;
		}
		return false;
	}

	public function checkPassword($login, $password) {
		$params = [
			'login' => $login,
		];
		$hash = $this->db->column('SELECT password FROM users WHERE login = :login', $params);
		if (!$hash or !password_verify($password, $hash)) {
			return false;
		}
		return true;
	}

	public function checkVerifExists($login) {
		$params = [
			'login' => $login,
		];
		if (!$this->db->column('SELECT status FROM users WHERE login = :login', $params)) {
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
		return $this->sendVerifMail($params);
	}

	public function login($login) {
		$params = [
			'login' => $login,
		];
		$data = $this->db->row('SELECT * FROM users WHERE login = :login', $params);
		if (!$data) return false;
		$_SESSION['authorize'] = $data[0];
		return true;
	}

}