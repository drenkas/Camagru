<?php

namespace application\models;

use application\core\Model;

class Main extends Model {

	public function getNews() {
		$result = $this->db->row('SELECT title, description FROM news');
		/* $to      = 'nakers.one@gmail.com';
		$subject = 'Fake sendmail test';
		$message = 'If we can read this, it means that our fake Sendmail setup works!';
		
		
		if(mail($to, $subject, $message, "From: anna.nakers@gmail.com")) {
			echo 'Email sent successfully!';
		} else {
			die('Failure: Email was not sent!');
		}; */
		return $result;
	}

}