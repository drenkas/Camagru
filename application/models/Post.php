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
}