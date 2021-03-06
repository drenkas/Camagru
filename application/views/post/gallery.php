<link rel="stylesheet" href="<?php echo ROOT_URL; ?>public/css/gallery.css">

<section class="jumbotron text-center">
<div class="container">
	<h1 class="jumbotron-heading">Галерея</h1>
	<p class="lead text-muted">Тут показані всі фото, які робили користувачі</p>
</div>
</section>

<div class="album py-5 bg-light">
	<div class="container alarm-container text-center">
		<div class="row parent-pagination">
			<div class="col-md-6 snap">
				<div class="card mb-4 box-shadow">
					<div class="responsive-box ">
						<div class="content ">
							<img class="card-img-top"  style=" width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1654d86ac72%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1654d86ac72%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.828125%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
						</div>
					</div>
					<div class="card-body">
						<div class="d-flex justify-content-between align-items-center">
							<div class="btn-group">
								<?php if(isset($_SESSION['authorize']['id'])) : ?>
								<button type="button" class="btn btn-sm like ">Like</button>
								<div class="btn btn-sm  disable like-count "></div>
								<button type="button" class="btn btn-sm delete display-hide">Delete</button>
								<?php endif ?>
							</div>
							<small class="text-muted">9 mins</small>
						</div>
						<p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
						<div class="comments">
						</div>
						<?php if(isset($_SESSION['authorize']['id'])) : ?>
							<div class="comment d-flex justify-content-between align-items-center">
								<div class="error" id="error-pass"></div>	
								<textarea name="comment" style="resize:none;" maxlength="60" ></textarea>
								<input class="btn btn-primary brn-sm btn-submit-comment" type="button" value="Комент" >

							</div>
						<?php endif ?>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center">
			<nav id="pagi" aria-label="...">
				<ul class="pagination display-hide">
					<li class="page-item active"><a class="page-link" >1</a></li>
					
				</ul>
			</nav>
		</div>
	</div>
</div>

<div class="modal fade show display-hide" id="registerSuccessModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="registerModalLabel"></h5>
				
			</div>
			<div class="modal-body" id="registerSuccessModal__body">
			</div>
			<div class="modal-footer">
				<button id="registerSuccessModal__button" type="button" class="btn btn-primary"></button>
			</div>
		</div>
	</div>
</div>
<div id="registerLoading" class="banter-loader display-hide">
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
  <div class="banter-loader__box"></div>
</div>
<div class="modal-backdrop fade show display-hide" id="backdrop" ></div>
<script src="<?php echo ROOT_URL; ?>public/js/galleryForm.js"></script>