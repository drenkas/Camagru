<?php

namespace application\controllers;

use application\core\Controller;

class AccountController extends Controller {

	public function loginAction() {
		/* $this->view->redirect(pathinfo($_SERVER['PHP_SELF'])['dirname'].'/'); */
		if (!empty($_POST)) {
			$this->view->location('account/register');
		}
		$this->view->render('Вход');
	}

	public function registerAction() {
		$post = json_decode(file_get_contents('php://input'), true);
		if (!empty($post['type']) && $post['type'] == 'email') {
			if ($this->model->checkEmailExists($post['value'])) {
				header("Content-Type: application/json");
				echo json_encode(['status' => 'error', 'message' => 'Такой E-mail уже используется'], JSON_UNESCAPED_UNICODE);
			}
			else {
				echo json_encode(['status' => 'success', 'message' => $post['value']]);
			}
		}
		else if ($post['submit']) {
			if ($this->model->checkEmailExists($_POST['email'])) {
				header("Content-Type: application/json");
				echo json_encode(['status' => 'error', 'message' => 'Такой E-mail уже используется'], JSON_UNESCAPED_UNICODE);
			}
			elseif (!$this->model->checkLoginExists($_POST['login'])) {
				$this->view->message('error', $this->model->error);
			}
			else{
				$this->model->register($_POST);
				header("Content-Type: application/json");
				echo json_encode(['status' => 'success', 'message' => 'Регистрация завершена, подтвердите свой E-mail'], JSON_UNESCAPED_UNICODE);
				//$this->view->message('success', 'Регистрация завершена, подтвердите свой E-mail');
			}
		} else {
			
			$this->view->render('Регистрация');
		}
	}

}