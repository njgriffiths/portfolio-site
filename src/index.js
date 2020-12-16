// JS
import LazyLoad from 'vanilla-lazyload';
// import { PhotoSwipe, PhotoSwipeUI_Default } from 'photoswipe';
const PhotoSwipe = require('photoswipe');
const PhotoSwipeUI_Default = require('./js/photoswipe-ui-default.js');

// CSS
import './css/normalize.css';
import './css/main.css';
import './css/PhotoSwipe.css';
import './css/default-skin/default-skin.css';

// VARS
let pswpElement, container;

// IMAGES
import placeholder from './images/placeholder.png';

const images = [
	{
        src: 'https://placekitten.com/600/400',
        w: 1600,
        h: 400
    },
    {
        src: placeholder,
        w: 600,
        h: 400
    }
];

// photoswipe options (if needed)
var options = {
	bgOpacity: 0.8,
	counterEl: false,
	fullscreenEl: false,
	history: false,
    index: 0, // start at first slide
	shareEl: false
};

const init = async (images) => {
	const myLazyLoad = new LazyLoad();
	
	// images lightbox
	pswpElement = document.querySelectorAll('.pswp')[0];
	container = document.querySelector('#image-container');

	// load the lightbox on click
	container.addEventListener('click', initLightbox);
};

function initLightbox() {
	const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, images, options);
	gallery.init();	
}



init(images);