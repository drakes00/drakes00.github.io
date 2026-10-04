(function($) {

	$(function() {

		// Nav.
			var $nav_a = $('aside a');

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
								.removeAttr('aria-current');


						// Set this link to active
							t.addClass('active').attr('aria-current', 'page');

					});



	});

})(jQuery);
