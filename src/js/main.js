let toggleBtn;
let primaryNav;
let slider;
let sliderImageContainer, sliderContentContainer;
let sliderImageMobile, sliderImageDesktop;
let sliderHeading, sliderDescription;
let sliderButtonLeft, sliderButtonRight;

let currentSlide = 0;
const slides = [
	{
		mobile: './dist/images/mobile-image-hero-1.jpg',
		desktop: './dist/images/desktop-image-hero-1.jpg',
		alt: 'White chairs and table with wooden parts. Small tree on the table.',
		heading: 'Discover innovative ways to decorate',
		description:
			'We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.',
	},
	{
		mobile: './dist/images/mobile-image-hero-2.jpg',
		desktop: './dist/images/desktop-image-hero-2.jpg',
		alt: 'Orange, green and white chair.',
		heading: 'We are available all across the globe',
		description:
			"With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.",
	},
	{
		mobile: './dist/images/mobile-image-hero-3.jpg',
		desktop: './dist/images/desktop-image-hero-3.jpg',
		alt: 'Black chair.',
		heading: 'Manufactured with the best materials',
		description:
			'Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.',
	},
];

let touchStartX, touchEndX;
const SWIPE_TOUCH_MIN_RANGE = 100; // for not changing slide if small swipe

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	toggleBtn = document.querySelector('.toggle-btn');
	primaryNav = document.querySelector('#primary-nav');

	slider = document.querySelector('#primary-slider');
	sliderImageContainer = slider.querySelector('#slider-image-container');
	sliderContentContainer = slider.querySelector('#slider-content');
	sliderImageMobile = slider.querySelector('#slider-image-mobile');
	sliderImageDesktop = slider.querySelector('#slider-image-desktop');
	sliderHeading = slider.querySelector('#slider-heading');
	sliderDescription = slider.querySelector('#slider-description');
	sliderButtonLeft = slider.querySelector('[data-control-button=left]');
	sliderButtonRight = slider.querySelector('[data-control-button=right]');
};

const prepareDOMEvents = () => {
	toggleBtn.addEventListener('click', handleMobileNav);
	sliderButtonLeft.addEventListener('click', slideLeft);
	sliderButtonRight.addEventListener('click', slideRight);

	/* swiping handling */
	slider.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	slider.addEventListener('touchend', handleSwipeEnd);

	/* left and right key handling */
	slider.addEventListener('keydown', handleKeyboardSliding);
};

/* navigation handling */
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

/* slider handling */
const slideLeft = () => {
	currentSlide = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
	updateSlide();
};

const slideRight = () => {
	currentSlide = currentSlide + 1 >= slides.length ? 0 : currentSlide + 1;
	updateSlide();
};

const updateSlide = () => {
	const { mobile, desktop, alt, heading, description } = slides[currentSlide];
	updateSlideImage(mobile, desktop, alt);
	updateSlideContent(heading, description);
};

const updateSlideImage = (mobile, desktop, alt) => {
	/* add cover animation */
	sliderImageContainer.classList.add('cover-left');
	setTimeout(() => {
		/* remove cover animation */
		sliderImageContainer.classList.remove('cover-left');
		/* update image data */
		sliderImageMobile.src = mobile;
		sliderImageMobile.alt = alt;
		sliderImageDesktop.src = desktop;
		sliderImageDesktop.alt = alt;
		/* add cover animation on end */
		sliderImageContainer.classList.add('cover-right');
	}, 400);
	setTimeout(() => {
		/* remove end cover animation */
		sliderImageContainer.classList.remove('cover-right');
	}, 800);
};

const updateSlideContent = (heading, description) => {
	sliderHeading.innerText = heading;
	sliderDescription.innerText = description;
	sliderContentContainer.classList.add('fade-in-right');
	setTimeout(() => {
		sliderContentContainer.classList.remove('fade-in-right');
	}, 800);
};

/* on swipe */
const handleSwipeEnd = (e) => {
	touchEndX = e.changedTouches[0].screenX;
	const direction = getDirection();
	if (Math.abs(direction) < SWIPE_TOUCH_MIN_RANGE) return;
	direction < 0 ? slideLeft() : direction > 0 ? slideRight() : null;
};

const getDirection = () => {
	return touchEndX - touchStartX;
};

/* sliding with arrow keys */
const handleKeyboardSliding = (e) => {
	const key = e.keyCode;
	if (key === 37) {
		slideLeft();
		return;
	}

	if (key === 39) {
		slideRight();
		return;
	}
};

document.addEventListener('DOMContentLoaded', main);
