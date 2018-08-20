<?php

namespace application\controllers;

use application\core\Controller;

class PostController extends Controller {

	public function snapAction() {
		$post = json_decode(file_get_contents('php://input'), true);
		if ($post['submit']) {
			$img = $post['userImg'];
			$img = str_replace('data:image/jpeg;base64,', '', $img);
			$img = str_replace(' ', '+', $img);
			$data = base64_decode($img);
			$image1 = imagecreatefromstring($data);
			$image2 = imagecreatefrompng($post['sticker']);
			$w_src = imagesx($image2);
			$h_src =  imagesy($image2);
			$w_dest = 150;
			$h_dest = 150;
			$stickerResized = imagecreatetruecolor($w_dest, $h_dest);
			imagesavealpha($stickerResized,true);
			imagecolortransparent($stickerResized, imagecolorallocate($stickerResized,0,0,0));
			imagecopyresampled($stickerResized, $image2, 0, 0, 0, 0, $w_dest, $h_dest, $w_src, $h_src);
			imagecopymerge($image1, $stickerResized, (int)$post['posX'], (int)$post['posY'], 0, 0, 150, 150, 100);
			ob_start();
			imagepng($image1);
			$contents = ob_get_contents();
			ob_end_clean();
			if ($this->model->snapshot($_SESSION['authorize']['login'], $post['comment'], 'data:image/png;base64,' . base64_encode($contents)))
			{
				$this->view->message('success', json_encode($post));
			} else {
				$this->view->message('error', 'Щось пішло не так');
			}
		}
		else  {
			$result = $this->model->getPersonalPost();
			$vars = [
				'post' => $result,
			];
			$this->view->render('Зробити пікчу', $vars);
		}
	}

	public function galleryAction() {
		/* $result = $this->model->getNews();
		$vars = [
			'news' => $result,
		]; */
		$post = json_decode(file_get_contents('php://input'), true);
		if ($post['submit']) {
			if (($result = $this->model->gallery()))
			{
				$this->view->message('success', json_encode($result));
			} else {
				$this->view->message('error', 'Щось пішло не так');
			}
		} if ($post['action'] == "delete_like") {

		} else {
			$this->view->render('Галерея');
		};
	}
}