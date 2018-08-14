var title = document.title;
var list = document.getElementById('default-main-list');
console.log("List", list);
var children = list.children;

for (var i = 0; i < children.length; ++i) {
	console.log("Child", i, children[i].children[0].innerHTML);
	/* console.log() */
	if (children[i].children[0].innerHTML === title)
		children[i].classList.add("default-active");
}
console.log("Title", title);
