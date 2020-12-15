// JS
import LazyLoad from 'vanilla-lazyload';

// CSS
import normalize from './css/normalize.css';
import css from './css/main.css';

// assets
// import placeholder from './images/placeholder.png';


const init = async () => {
	console.log('hello, world');
	const myLazyLoad = new LazyLoad();

	document.addEventListener('DOMContentLoaded', (ev) => {
		// lazyload images
		// myLazyLoad.update();
	});
};



init();