(function($) {

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Scrolly links.
			$('.scrolly').scrolly();

		// Nav.
			var $nav_a = $('aside a');
            console.log("hello");
            console.log($nav_a);

			// Scrolly-fy links.
				$nav_a
					.scrolly()
					.on('click', function(e) {

						var t = $(this),
							href = t.attr('href');

						if (href[0] != '#')
							return;

						e.preventDefault();

						// Clear active and lock scrollzer until scrolling has stopped
							$nav_a
								.removeClass('active')


						// Set this link to active
							t.addClass('active');

					});



	});

})(jQuery);
