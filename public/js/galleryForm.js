(function(){
	const snap = document.querySelector('.snap');
	const parentPag = document.querySelector('.parent-pagination');
	const user = document.getElementById('username');
	var backdrop = document.getElementById('backdrop');
	var loading = document.getElementById('registerLoading');

	function onSubmitComment(post, comments, newSnap) {
		var reg = /^[а-яА-ЯёЁіІїЇa-zA-Z0-9\s\W]+$/;
		const textarea = newSnap.querySelector('textarea');
		const actionL = "add_comment"; 
		const commentsCont = newSnap.querySelector('.comments');
		const error = newSnap.querySelector('.error');
		let value = textarea.value.trim();
		error.classList.remove("error-show");
		if (reg.test(value)) {
			backdrop.classList.remove("display-hide");
			backdrop.classList.add("display-show");
			loading.classList.remove("display-hide");
			loading.classList.add("display-show");
			fetch('', {
				method: 'POST',
				headers: {
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
					'Content-Type': 'application/json'
				},
				credentials: 'same-origin',
				mode: 'cors',
				body: JSON.stringify({
					submit: false,
					action: actionL,
					post_id: post.id,
					post_user: post.post_user,
					user: user.innerText,
					text: value
				})
			})
			.then(res => res.json())
			.then(res => {
				if( res.status === "success"){
					let newComment = JSON.parse(res.message);
					comments.push(newComment);
					let p = document.createElement('p');
					p.classList.add("comments__item");
					p.innerHTML = user.innerText+": "+ value;
					commentsCont.appendChild(p);
					textarea.value = '';
				} else {
					error.classList.add("error-show");
					error.innerHTML = "Комент не опублікований";
				}
				loading.classList.remove("display-show");
				loading.classList.add("display-hide");
				backdrop.classList.remove("display-show");
				backdrop.classList.add("display-hide");
			})
			.catch(e => console.log(e));
		} else {
			error.classList.add("error-show");
			error.innerHTML = "Комент повинен містити 1-60 символів a-z A-Z а-я А-Я ёЁ 0-9";
		};

	}

	function getComments(newSnap, post, comments) {
		const commentsCont = newSnap.querySelector('.comments');
		const submitbtn = newSnap.querySelector('.btn-submit-comment');
		if (comments.length){
			comments.forEach(el => {
				if (el.comment_post_id === post.id){
					let p = document.createElement('p');
					p.classList.add("comments__item");
					p.innerHTML = el.comment_user+": "+ el.comment_desc;
					commentsCont.appendChild(p);
				}
			});
		}
		if (document.getElementById('username')){
			submitbtn.addEventListener('click', function(){onSubmitComment(post, comments, newSnap)}, false);
		}
	}

	function onClickLike(post, likes, like, newSnap) {
		let actionL = '';
		var deleteId = 0;
		const like_count = newSnap.querySelector('.like-count');
		const count = Number(like_count.innerText);
		likes.forEach((el, index, arr) => {
			if (el.like_post_id === post.id && user.innerText === el.like_user.toUpperCase())
			{
				deleteId = el.id;
				like.classList.remove("like-active");
				like_count.classList.remove("like-active");
				like_count.innerHTML = count-1;
				actionL = "delete_like";
				arr.splice(index, 1);
			}
		});
		if (actionL !== "delete_like"){
			like.classList.add("like-active");
			like_count.classList.add("like-active");
			like_count.innerHTML = count+1;
			actionL = "add_like";
		}
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			mode: 'cors',
			body: JSON.stringify({
				submit: false,
				action: actionL,
				id: deleteId,
				post_id: post.id,
				user: user.innerText
			})
		})
		.then(res => res.json())
		.then(res => {
			if( res.status === "success" && actionL === "add_like"){
				let newLike = JSON.parse(res.message);
				likes.push(newLike);
			} else {
				error.classList.add("error-show");
				error.innerHTML = "Не вдалось поставити лайк";
			}
		})
		.catch(e => console.log(e));
	}

	function getLikes(newSnap, post, likes) {
		const like = newSnap.querySelector('.like');
		const like_count = newSnap.querySelector('.like-count');
		let count = 0;
		if (likes.length){
			likes.forEach(el => {
				if (el.like_post_id === post.id)
					count++;
				if (el.like_post_id === post.id && user.innerText === el.like_user.toUpperCase())
				{
					like.classList.add("like-active");
					like_count.classList.add("like-active");
				}
			});
		}
		like_count.innerHTML = count;
		like.addEventListener('click', function(){onClickLike(post, likes, like, newSnap)}, false);
	}

	function onClickDelete(post, newSnap) {
		let actionL = 'delete_post';
		const error = newSnap.querySelector('.error');
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			mode: 'cors',
			body: JSON.stringify({
				submit: false,
				action: actionL,
				id: post.id,
			})
		})
		.then(res => res.json())
		.then(res => {
			if( res.status === "success"){
				document.location.href = document.URL;
			} else {
				error.classList.add("error-show");
				error.innerHTML = "Не вдалось видалити пост.";
			}
		})
		.catch(e => console.log(e));
	}
	function showPage(start, posts, likes, comments) {
		const end = ((start + 6) > posts.length) ? posts.length : (start + 6);
		for (let i = start; i < end; i++) {
			const post = posts[i];
			let newSnap = snap.cloneNode(true);
			newSnap.classList.remove("snap");
			newSnap.classList.add("newsnap");
			newSnap.querySelector('.card-img-top').src = post.img;
			newSnap.querySelector('.card-text').innerHTML = post.post_desc;
			newSnap.querySelector('.text-muted').innerHTML = post.post_user+": "+ post.post_date;
			
			if (document.getElementById('username')){
				if (user.innerText === post.post_user.toUpperCase()){
					let deleteBtn = newSnap.querySelector('.delete');
					deleteBtn.classList.remove("display-hide");
					deleteBtn.addEventListener('click', function(){onClickDelete(post,  newSnap)}, false);
				}
				getLikes(newSnap, post, likes);
				
			}
			getComments(newSnap, post, comments);
			parentPag.appendChild(newSnap);
		}
	}

	function onClickPugBtn(start, posts, likes, comments, element) {
		while (parentPag.lastChild) {
			if (parentPag.lastChild === snap)
				break;
			parentPag.removeChild(parentPag.lastChild);
		}
		let pagButtons = document.getElementsByClassName('page-item');
		for (let i = 0; i < pagButtons.length; i++) {
			const element = pagButtons[i];
			element.classList.remove('active');
		}
		element.classList.add('active');

		showPage(start, posts, likes, comments);
	}

	function createPagBtn(posts, likes, comments) {
		let totalPages = Math.ceil((posts.length / 6));
		let parentPag = document.querySelector('.pagination');
		let pageItem = document.querySelector('.page-item');
		parentPag.classList.remove("display-hide");
		pageItem.addEventListener('click', function(){onClickPugBtn(0, posts, likes, comments, pageItem)}, false);
		for (let index = 2; index <= totalPages; index++) {
			let newItem = pageItem.cloneNode(true);
			newItem.querySelector('a').innerHTML = index;
			newItem.classList.remove("active");
			parentPag.appendChild(newItem);
			newItem.addEventListener('click', function(){onClickPugBtn(((index-1)*6), posts, likes, comments, newItem)}, false);
		}
	}

	function pagination(posts, likes, comments) {
		
		showPage(0, posts, likes, comments);
		createPagBtn(posts, likes, comments);
	}

	backdrop.classList.remove("display-hide");
	backdrop.classList.add("display-show");
	loading.classList.remove("display-hide");
	loading.classList.add("display-show");
	fetch('', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		mode: 'cors',
		body: JSON.stringify({
			submit: true
		})
	})
	.then(res => res.json())
	.then(res => {
		if( res.status === "success" ){
			let comments = JSON.parse(res.message).comments;
			let likes = JSON.parse(res.message).likes;
			let posts = JSON.parse(res.message).posts;
			if (posts.length == 0){
				let h = document.createElement('h2');
				h.innerHTML = "Пусто! Ще ніхто нічого не запостив.";
				document.querySelector('.alarm-container').appendChild(h);
			} else {
				pagination(posts, likes, comments);
			}
		} else {
			
		}
		loading.classList.remove("display-show");
		loading.classList.add("display-hide");
		backdrop.classList.remove("display-show");
		backdrop.classList.add("display-hide");
	})
	.catch(e => console.log(e));

})()
