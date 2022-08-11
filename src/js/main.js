let toggleBtn;
let primaryNav;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toggleBtn = document.querySelector('.toggle-btn');
	primaryNav = document.querySelector('#primary-nav');
};

const prepareDOMEvents = () => {
	toggleBtn.addEventListener('click', handleMobileNav);
};

const handleMobileNav = () => {
	toggleBtn.toggleAttribute('data-expanded');

	if (toggleBtn.hasAttribute('data-expanded')) {
		primaryNav.setAttribute('data-expanded', '');
		handleSlideDownAnimation(primaryNav);
		toggleBtn.setAttribute('aria-expanded', 'true');
	} else {
		primaryNav.removeAttribute('data-expanded');
		toggleBtn.setAttribute('aria-expanded', 'false');
	}
};

const handleSlideDownAnimation = (element) => {
	element.classList.add('slide-down');
	setTimeout(() => {
		element.classList.remove('slide-down');
	}, 400);
};

document.addEventListener('DOMContentLoaded', main);
