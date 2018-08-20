(function(){
	const snap = document.querySelector('.snap');
	const parentPag = document.querySelector('.parent-pagination');
	const user = document.getElementById('username');

	function getComments(newSnap, post, comments) {
		
	}

	function onClickLike(post, likes, like, count) {
		if (likes.length){
			likes.forEach(el => {
				if (el.like_post_id === post.id && post.post_user === el.like_user)
					{
						like.classList.remove("like-active");
						like_count.innerHTML = count--;
						fetch('', {
							method: 'POST',
							headers: {
								'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
								'Content-Type': 'application/json'
							},
							credentials: 'same-origin',
							mode: 'cors',
							body: JSON.stringify({
								action: "delete_like",
								id: el.id
							})
						})
						.then(res => res.json())
						.then(res => {
							console.log("LIKE");
							if( res.status === "success" ){
								
							} else {
								
							}
						})
						.catch(e => console.log(e));
					}
			});
		}
	}

	function getLikes(newSnap, post, likes) {
		const like = newSnap.querySelector('.like');
		const like_count = newSnap.querySelector('.like-count');
		let count = 0;
		if (likes.length){
			likes.forEach(el => {
				if (el.like_post_id === post.id)
					count++;
				if (el.like_post_id === post.id && post.post_user === el.like_user)
					like.classList.add("like-active");
			});
		}
		like_count.innerHTML = count;
		like.addEventListener('click', function(){onClickLike(post, likes, like, count)}, false);
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
			getLikes(newSnap, post, likes);
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
		showPage(start, posts, likes, comments);
	}

	function createPagBtn(posts, likes, comments) {
		let totalPages = Math.ceil((posts.length / 6));
		let parentPag = document.querySelector('.pagination');
		let pageItem = document.querySelector('.page-item');
		parentPag.classList.remove("display-hide");
		pageItem.addEventListener('click', function(){onClickPugBtn(0, posts, likes, comments, pageItem)}, false);
		console.log("object", posts[0].post_user);
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

			} else {
				console.log("RES", likes, posts, comments);
				pagination(posts, likes, comments);
			}
		} else {
			
		}
	})
	.catch(e => console.log(e));

})()
