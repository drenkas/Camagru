<?php

namespace application\controllers;

use application\core\Controller;

class AccountController extends Controller {

	public function loginAction() {
		/* $this->view->redirect(pathinfo($_SERVER['PHP_SELF'])['dirname'].'/'); */
		if (!empty($_POST)) {
			$this->view->location('account/register');
		}
		$this->view->render('Вхід');
	}

	public function registerAction() {
		$post = json_decode(file_get_contents('php://input'), true);
		if (!empty($post['type'])) {
			if ($this->model->checkEmailExists($post['value'])) {
				$this->view->message('error', 'Такий E-mail вже використовується');
			}
			else if (!$this->model->checkLoginExists($post['value'])) {
				$this->view->message('error', 'Такий login вже використовується');
			}
			else $this->view->message('success', ' ');
		}
		else if ($post['submit']) {
			header("Content-Type: application/json");
			if ($this->model->register($post)){
				$this->view->message('success', 'Реєстрацію закінчено, підтвердіть свій E-mail. <br>
				Через 5 секунд ви будете перенаправлені на головну сторінку.');
			} else {
				$this->view->message('error', $this->model->error);
			};

		} else {
			
			$this->view->render('Реєстрація');
		}
	}

}