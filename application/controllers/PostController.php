<?php

namespace application\controllers;

use application\core\Controller;

class PostController extends Controller {

	public function snapAction() {
		
		$this->view->render('Зробити пікчу');
	}
}