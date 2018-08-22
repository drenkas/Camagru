var title = document.title;
var list = document.getElementById('default-main-list');
var children = list.children;

for (var i = 0; i < children.length; ++i) {
	if (children[i].children[0].innerHTML === title)
		children[i].classList.add("default-active");
}

const menu = document.getElementById('menu');
const aside = document.getElementById('default-aside');
const menu_box = document.querySelector('.menu-box');

function onClickMenu(e) {
	e.preventDefault();
	if (menu.classList.contains('menu-active')){
		menu.classList.remove('menu-active');
		aside.classList.remove('default-aside-active');
	} else {
		menu.classList.add('menu-active');
		aside.classList.add('default-aside-active');
	}
}

menu_box.addEventListener('click', onClickMenu);
