<?php

namespace application\controllers;

use application\core\Controller;

class AccountController extends Controller {

	public function loginAction() {
		$post = json_decode(file_get_contents('php://input'), true);
		if (!empty($post['type'])) {
			if (!$this->model->checkLoginExists($post['login'])) {
				$this->view->message('error', 'Такого логіна не існує');
			}
			else if (!$this->model->checkPassword($post['login'], $post['pass'])) {
				$this->view->message('error', 'Невірно вказано пароль');
			}
			else $this->view->message('success', ' ');
		}
		else if ($post['submit']) {
			header("Content-Type: application/json");
			if (!$this->model->checkVerifExists($post['login'])) {
				$this->view->message('verif_error', 'Активуй свій E-mail');
			}else if ($this->model->login($post['login'])){
				$this->view->message('success', 'Вас авторизовано');
			} else {
				$this->view->message('error', 'Щось пішло не так');
			};
		} else {
			
			$this->view->render('Авторизація');
		}
	}

	public function registerAction() {
		$post = json_decode(file_get_contents('php://input'), true);
		if (!empty($post['type'])) {
			if ($this->model->checkEmailExists($post['value'])) {
				$this->view->message('error', 'Такий E-mail вже використовується');
			}
			else if ($this->model->checkLoginExists($post['value'])) {
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

	public function confirmAction () {
		
		if (!$this->model->changeVerif($this->route['verification'])) {
			$this->view->errorCode(403);
		}
		$this->view->render('Реєстрацію завершено');
	}
	
	public function logoutAction() {
		unset($_SESSION['authorize']);
		$this->view->redirect(ROOT_URL.'account/login');
	}
}