// JS
import LazyLoad from 'vanilla-lazyload';

// CSS
import normalize from './css/normalize.css';
import css from './css/main.css';

// assets
import placeholder from './images/placeholder.png';


const init = async () => {
	console.log('hello, world');
	const myLazyLoad = new LazyLoad();

	document.addEventListener('DOMContentLoaded', (ev) => {
		// lazyload images
		myLazyLoad.update();
		// lazyLoadImages(window, document);
	});
};


// const lazyLoadImages = (w,d) => {
// 	// https://www.andreaverlicchi.eu/lazyload/
// 	const b = d.getElementsByTagName('body')[0];
// 	const s = d.createElement('script'); 
// 	const v = !('IntersectionObserver' in w) ? '8.7.0' : '10.5.1';

// 	s.async = true;
// 	s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/' + v + '/lazyload.min.js';
// 	w.lazyLoadOptions = {}; // Your options here. See 'recipes' for more information about async.
// 	b.appendChild(s);
// }

init();