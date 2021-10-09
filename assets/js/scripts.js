(function($) {
	"use strict"; // Start of use strict
    // jQuery for page scrolling feature
     $('.scroll-to').on("click", function(e) {
        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: ($($anchor.attr("href")).offset().top - 50)
        }, 1250, "easeInOutExpo");
        e.preventDefault();
    });

    // Intialize owl carousel for the Banner
    $('.hero-slider').owlCarousel({
        loop: true,
        autoPlay:true,
        margin: 0,
        nav: true,
        navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    // Intialize owl carousel for the testimonial
    $('.testimonial-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
   
     $(".background-image-wrapper").each(function() {
        var image = $(this).children("img").attr("src");
        $(this).css("background", 'url("' + image + '")').css("background-position", "initial").css("opacity", "1");
    })
     
    // scrollspy is used to highlight the active menu
    $('body').scrollspy({
        target: '.nav-container',
        offset: 80
    });

    //Init WOW JS
    new WOW().init();

    //fixed top navigation on scroll
    $('#TopMenu').affix({
        offset: {
            top: 80
        }
    });

    // On load of total site ...  
    $(window).on("load", function (e) {
        // hide loader once site is loaded
        $(".loader-wrapper").fadeOut("slow");        
        //calling scrolling tabs
        $('.nav-tabs').scrollingTabs(); 
    })

})(jQuery);