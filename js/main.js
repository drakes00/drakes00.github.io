(function () {

	var navLinks = document.querySelectorAll('.sidebar a');

	navLinks.forEach(function (link) {
		link.addEventListener('click', function () {

			var href = link.getAttribute('href');

			if (href[0] != '#')
				return;

			// Clear active on every link, then set it on this one.
			navLinks.forEach(function (l) {
				l.classList.remove('active');
				l.removeAttribute('aria-current');
			});

			link.classList.add('active');
			link.setAttribute('aria-current', 'page');

			// The actual smooth-scroll to the anchor is left to the browser,
			// driven by `scroll-behavior: smooth` in site.less.
		});
	});

})();
