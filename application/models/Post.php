<?php

namespace application\models;

use application\core\Model;

class Post extends Model {

	public function snapshot($login, $comment, $img) {
		$params = [
			'post_user' => $login,
			'post_desc' => $comment,
			'img' => $img
		];
		if ($this->db->query('INSERT INTO posts (post_user, post_desc, img) VALUES (:post_user, :post_desc, :img)', $params)){
			return true;
		} else return false;
	}

	public function getPersonalPost() {
		$params = [
			'post_user' => $_SESSION['authorize']['login'],
		];
		$result = $this->db->row('SELECT * FROM posts WHERE post_user = :post_user order by id desc limit 3', $params);
		return $result;
	}

	public function gallery() {
		$params = [];
		$posts = $this->db->row('SELECT * FROM posts', $params);
		$likes = $this->db->row('SELECT * FROM likes', $params);
		$comments = $this->db->row('SELECT * FROM comments', $params);
		$result = [
			'comments' => $comments,
			'posts' => $posts,
			'likes' => $likes
		];
		return $result;
	}

	public function deleteLike($id) {
		$params = [
			'id' => $id,
		];
		if ($this->db->query('DELETE FROM likes WHERE id=:id', $params)) {
			return true;
		}
		return false;
	}

	public function addLike($id, $user) {
		$params = [
			'like_post_id' => $id,
			'like_user' => $user
		];
		if ($this->db->query('INSERT INTO likes (like_user, like_post_id) VALUES (:like_user, :like_post_id)', $params)) {
			$result = $this->db->row('SELECT * FROM likes WHERE like_user = :like_user AND like_post_id = :like_post_id', $params);
			return $result[0];
		}
		return false;
	}

	public function sendCommentMail ($params) {
		$params_user = [
			'login' => $params['post_user'],
		];
		$user = $this->db->row('SELECT * FROM users WHERE login = :login', $params_user);
		if ($user[0]['isNotif'] == "0")
			return true;
		$email = $user[0]['email'];
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
		$mail_subject = iconv_mime_encode("Subject", "До твого посту залишили коментар", $subject_preferences);
		// Set mail header
		$header = "Content-type: text/html; charset=".$encoding." \r\n";
		$header .= "From: ".$from_name." <".$from_mail."> \r\n";
		$header .= "MIME-Version: 1.0 \r\n";
		$header .= "Content-Transfer-Encoding: 8bit \r\n";
		$header .= "Date: ".date("r (T)")." \r\n";
		$bytes = openssl_random_pseudo_bytes(32);
		$mail_message = '
		<html>
			<body>
			<h1>'.$params['user'].' зплишив коментар під твоїм фото!</h1>
		<h2>Тобі, '.$params['post_user'].', залишили наступний коментар: </h2>
		<pre> 
		------------------------
		'.$params['text'].'
		------------------------
		</pre>
		Не забудь відправити куди подалі цього клятого коментатора.';
		$mail_message .= '</body></html>';
		// Send mail	
		$mailSent = mail($email, $mail_subject, $mail_message, $header);
		if ($mailSent) {
			return true;
		}else {
			$this->error = "Сталась оказія з відправкою: " . $mailSent;
			return false;
		};
	}

	public function addComment($post) {
		$params = [
			'comment_user' => $post['user'],
			'comment_desc' => $post['text'],
			'comment_post_id' => $post['post_id'],
		];
		if ($this->db->query('INSERT INTO comments (comment_user, comment_desc, comment_post_id) VALUES (:comment_user, :comment_desc, :comment_post_id)', $params)) {
			$result = $this->db->row('SELECT * FROM comments WHERE comment_user = :comment_user AND comment_desc = :comment_desc AND comment_post_id = :comment_post_id', $params);
			if ($this->sendCommentMail($post))
				return $result[0];
			else
				return false;
		}
		return false;
	}

	public function deletePost($id) {
		$params = [
			'id' => $id,
		];
		if ($this->db->query('DELETE FROM likes WHERE like_post_id=:id', $params) &&
		$this->db->query('DELETE FROM comments WHERE comment_post_id=:id', $params) &&
		$this->db->query('DELETE FROM posts WHERE id=:id', $params)) {
			return true;
		}
		return false;
	}
}