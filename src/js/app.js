

document.addEventListener('DOMContentLoaded', (ev) => {
	// lazyload images
	lazyLoadImages(window, document);
});

const lazyLoadImages = (w,d) => {
	// https://www.andreaverlicchi.eu/lazyload/
	const b = d.getElementsByTagName('body')[0];
	const s = d.createElement('script'); 
	const v = !('IntersectionObserver' in w) ? '8.7.0' : '10.5.1';

	s.async = true;
	s.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/' + v + '/lazyload.min.js';
	w.lazyLoadOptions = {}; // Your options here. See 'recipes' for more information about async.
	b.appendChild(s);
}