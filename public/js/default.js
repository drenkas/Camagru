var title = document.title;
var list = document.getElementById('default-main-list');
var children = list.children;

for (var i = 0; i < children.length; ++i) {
	if (children[i].children[0].innerHTML === title)
		children[i].classList.add("default-active");
}
