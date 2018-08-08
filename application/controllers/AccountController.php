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
		if (!empty($post['type'])) {
			if ($this->model->checkEmailExists($post['value'])) {
				$this->view->message('error', 'Такой E-mail уже используется');
			}
			else if (!$this->model->checkLoginExists($post['value'])) {
				$this->view->message('error', 'Такой login уже используется');
			}
			else $this->view->message('success', ' ');
		}
		else if ($post['submit']) {
			
				$this->model->register($post);
				header("Content-Type: application/json");
				$this->view->message('success', 'Регистрация завершена, подтвердите свой E-mail. <br>
				Через 5 секунд вы будете перенаправлены на главную страницу.');
		} else {
			
			$this->view->render('Регистрация');
		}
	}

}