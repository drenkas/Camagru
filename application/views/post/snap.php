<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/snap.css">

<div class="container ">
	<div class="row">
		<div class="col-lg-8 col-sm-12">
			<div class="row justify-content-center">
				<video id="video" width="480px" height="480px" autoplay></video>
				<canvas class="col-12" id="canvas" width="480px" height="480px"></canvas>
			</div>
			<div class="row justify-content-between">
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker2.png" alt="" srcset="">
				</div>
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker3.png" alt="" srcset="">
				</div>
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker4.png" alt="" srcset="">
				</div>
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker5.png" alt="" srcset="">
				</div>
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker1.png" alt="" srcset="">
				</div>
				<div class="col-4 col-md-2 col-sm-4">
					<img class="sticker" src="<?php echo ROOT_URL; ?>public/img/sticker6.png" alt="" srcset="">
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-sm-12" style="text-align: center;">
			<div class="button-container">
				<button id="snap" name="enter"><span>СнепШот</span></button>
			</div>
			<h4>Можеш вибрати фото з комп'ютера:</h4>
			<div class="input-file-container">  
				<input class="input-file" id="file" type="file" accept=".png, .jpg, .jpeg">
				<label tabindex="0" for="my-file" class="input-file-trigger">Вибрати файл...</label>
			</div>
			<div class="remove-container">
				<button type="button" class="removeImg">Видалити</button>
			</div>
			<h3 style="margin: 0;">Додати коментар:</h3>
			<div class="input-group">
				<textarea class="form-control snap__comment" aria-label="With textarea" maxlength="50"></textarea>
			</div>
			
			<div class="recent-photos">
				<h5>Останні фото:</h5>
				<div class="recent-photos__container">
					<?php foreach ($post as $val): ?>
						<img src=<?php echo $val['img']; ?> alt="">
					<?php endforeach; ?>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade container-fluid" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
	<div class="modal-content">
	  <div class="modal-header">
		<h5 class="modal-title" id="exampleModalLabel">Буде виглядати якось так.</h5>
		<button type="button" class="close">
		  <span aria-hidden="true">&times;</span>
		</button>
	  </div>
	  <div class="modal-body d-flex flex-column">
				<div class="preview-img-container">
			<img class="preview-img" alt="preview" width="100%">
				</div>
				<div class="preview-comment">
					<span>
						<b><?php echo $_SESSION['authorize']['login']; ?>:</b>
						<span class="preview-comment-text"></span>
					</span>
				</div>
	  </div>
	  <div class="modal-footer">
		<button type="button" class="btn btn-secondary closeBtn">Офф</button>
		<button type="button" class="btn btn-primary postBtn">Запостити</button>
	  </div>
	</div>
  </div>
</div>

<script src="<?php echo ROOT_URL; ?>public/js/snap.js"></script>