initInfiniteScroll = function() {
	if ($('.infinite-scroll').length) {
		$(window).scroll(function() {
		  var nextPage = $('.pagination .older-posts').attr('href');
		  if (nextPage && ($(window).scrollTop() > $(document).height() - $(window).height() - 100)) {
		    $('.pagination').html("<div class='loader'></div>");
		    $.ajax({
		      url: nextPage,
		      type: 'GET',
		      success: function(data) {
		        var newPosts = $(data).find('.infinite-scroll').html();
		        $('.infinite-scroll').append(newPosts);
		        $('.infinite-scroll').find('.pagination:first').remove();
		      }
		    });
		  }
		});
	}
}

initSearch = function() {
	$(".search-input").ghostHunter({
	  results: ".search-results",
	  result_template: "<article class='card'><div class='card-content'><h2><a href='{{link}}' class='card-title'>{{title}}</a></h2><section><p>{{description}}</p></section></div></article>",
	  onKeyUp: true,
	  onComplete: function() {
	  	$('.page-content').remove();
	  }
	});
}

$(document).ready(function() {
	initInfiniteScroll();
	initSearch();
});

// control off canvas menu
$(document).on('click', '#off-canvas-toggle', function() {
	$('body').removeClass('body--nav-closed').addClass('body--nav-open').click(function() {
		$(this).removeClass('body--nav-open').addClass('body--nav-closed');
	});
	return false;
});

// activate fastclick
$(function() {
	FastClick.attach(document.body);
});

// categories bar animation
jQuery(document).ready(function($) {
  var mobileBreakpoint = 767;

  if ($(window).width() > mobileBreakpoint) {
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        // check if user is scrolling up
        if (currentTop < this.previousTop) {
          // if scrolling up -->
					window.setTimeout(function() { // set 150ms delay before showing
	          $('.categories-bar').removeClass('categories-bar--hidden');
					}, 150);
        } else {
          // if scrolling down -->
          if (currentTop > 50) { // hide categories after 50px buffer from top
						window.setTimeout(function() { // set 150ms delay before hiding
		          $('.categories-bar').addClass('categories-bar--hidden');      	
						}, 150);
          }
        }
        this.previousTop = currentTop; // store current scrollTop position
      }
    );
  }
});


// active category class helper
$(document).ready(function() {
	$('.categories a').each(function() {
		if($(this).attr('href') + '/' == window.location.href) {
			$(this).addClass('active');
		}
	});
});