(function(){
	const snap = document.querySelector('.snap');


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
		let comments = JSON.parse(res.message).comments;
		let likes = JSON.parse(res.message).likes;
		let posts = JSON.parse(res.message).posts;
		console.log("RES", likes, posts, comments);
		if( res.status === "success" ){
			
		} else {
			
		}
	})
	.catch(e => console.log(e));

})()