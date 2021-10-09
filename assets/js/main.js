; (function ($) {
    "use strict";
    
    $(document).ready(function () {
        
        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        })
       
        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.navbar-area .menu').on('click', function() {
            $(this).toggleClass('open');
            $('.navbar-area .navbar-collapse').toggleClass('sopen');
        });
        
        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");

            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
        if ($('.single-select').length){
            $('.single-select').niceSelect();
        }

        /* --------------------------------------------------
            isotop filter 
        ---------------------------------------------------- */
        var $Container = $('.isotop-filter-area');
        if ($Container.length > 0) {
            $('.property-filter-area').imagesLoaded(function () {
                var festivarMasonry = $Container.isotope({
                    itemSelector: '.project-filter-item', // use a separate class for itemSelector, other than .col-
                    masonry: {
                        gutter: 0
                    }
                });
                $(document).on('click', '.isotop-filter-menu > button', function () {
                    var filterValue = $(this).attr('data-filter');
                    festivarMasonry.isotope({
                        filter: filterValue
                    });
                });
            });
            $(document).on('click','.isotop-filter-menu > button' , function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        }

        /*--------------------------------------------
            Search Popup
        ---------------------------------------------*/
        var bodyOvrelay =  $('#body-overlay');
        var searchPopup = $('#td-search-popup');

        $(document).on('click','#body-overlay',function(e){
            e.preventDefault();
            bodyOvrelay.removeClass('active');
            searchPopup.removeClass('active');
            sidebarMenu.removeClass('active');
        });
        $(document).on('click','.search-bar-btn',function(e){
            e.preventDefault();
            searchPopup.addClass('active');
            bodyOvrelay.addClass('active');
        });

        /* -----------------------------------------------------
            Variables
        ----------------------------------------------------- */
        var leftArrow = '<i class="fa fa-angle-left"></i>';
        var rightArrow = '<i class="fa fa-angle-right"></i>';

        /*------------------------------------------------
            intro-slider
        ------------------------------------------------*/
        $('.banner-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 1500,
            items: 1,
            navText: [ leftArrow, rightArrow],
        });

        /*------------------------------------------------
            intro-slider
        ------------------------------------------------*/
        $('.intro-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                992: {
                    items: 4
                },
            }
        });

        /*------------------------------------------------
            course-slider
        ------------------------------------------------*/
        $('.course-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 1500,
            navText: [ leftArrow, rightArrow],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                },
            }
        });

        /*------------------------------------------------
            intro-slider
        ------------------------------------------------*/
        $('.team-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            smartSpeed: 1500,
            navText: [ leftArrow, rightArrow],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
            }
        });

        /*------------------------------------------------
            testimonial-slider
        ------------------------------------------------*/
        $('.testimonial-slider').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 1500,
            // stagePadding: 130,
            autoplay:true,
            autoplayTimeout:2000,
            autoplayHoverPause:true,
            // responsive: {
            //     0: {
            //         items: 1,
            //         stagePadding: 0,
            //     },
            //     600: {
            //         items: 1,
            //         stagePadding: 0,
            //     },
            //     992: {
            //         items: 2,
            //         stagePadding: 0,
            //     },
            //     1200: {
            //         stagePadding: 100,
            //         items: 2
            //     },
            //     1300: {
            //         stagePadding: 160,
            //         items: 2
            //     },
            //     1600: {
            //         stagePadding: 130,
            //         items: 3
            //     },
            // }
            responsive:{
                0:{
                    items:1,
                    nav: true
                },
                600:{
                    items:3,
                },
                1000:{
                    items:5,
                }
            }
        });

        /*------------------------------------------------
            testimonial-slider-2
        ------------------------------------------------*/
        $('.testimonial-slider-2').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 1500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 2
                },
            }
        });

        /*------------------------------------------------
            Magnific JS
        ------------------------------------------------*/
        $('.video-play-btn').magnificPopup({
            type: 'iframe',
            removalDelay: 260,
            mainClass: 'mfp-zoom-in',
        });
        $.extend(true, $.magnificPopup.defaults, {
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/Wimkqo8gDZ0'
                    }
                }
            }
        });

        /* -----------------------------------------
            fact counter
        ----------------------------------------- */
        $('.counter').counterUp({
            delay: 15,
            time: 2000
        });

        /*-------------------------------------------------
           parallax
        --------------------------------------------------*/
        if ($.fn.jarallax) {
            $('.jarallax').jarallax({
                speed: 0.5
            });
        }

        /* -----------------------------------------------------
           Wow js
        ----------------------------------------------------- */
        new WOW().init();

        /*----------------------------------------
           back to top
        ----------------------------------------*/
        $(document).on('click', '.back-to-top', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });

    });

    $(window).on("scroll", function() {
        /*---------------------------------------
            back-to-top
        -----------------------------------------*/
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }

        /*---------------------------------------
            sticky-active
        -----------------------------------------*/
        var scroll = $(window).scrollTop();
        if (scroll < 1000) {
            $(".navbar").removeClass("sticky-active");
            $(".current-menu-item > a").css('color', 'white');
            $(".faqMenu > a").css('color', 'white');
            $(".contactUs > a").css('color', 'white');
            $("#login_btn").css('color', 'white');
            $(".language").css('color', 'white');

        } else {
            // $(".navbar").addClass("sticky-active");
            $(".current-menu-item > a").css('color', 'black');
            $(".faqMenu > a").css('color', 'black');
            $(".contactUs > a").css('color', 'black');
            $("#login_btn").css('color', 'black');
            $(".language").css('color', 'black');
        }
    });
    
    
    // $('.menu-item-has-children').hover(function(){
    //     $(".navbar").addClass("sticky-active");
    // });


    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();

        /*---------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function (e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });

    });

    /*---------------------
        Login Modal
    ----------------------*/
    $("#loginModal").on("show", function () {
        $("body").addClass("modal-open");
    }).on("hidden", function () {
        $("body").removeClass("modal-open")
    });


    /*------------------
        Scroll down
    ----------------- */
    $(".scroll_down").click(function() {
        var offset = $(".blog-area").offset();
        $('html').animate({scrollTop : offset.top}, 400);
    });


    /*------------------
        Main Slider Button
    ----------------- */
    $(document).ready(function () {
     var owl = $('.owl-carousel');
        owl.owlCarousel();

        $(".slider-left").click(function() {
            // With optional speed parameter
            // Parameters has to be in square bracket '[]'
            owl.trigger('prev.owl.carousel', [223]);
        })


        $(".slider-right").click(function() {
            owl.trigger('next.owl.carousel');
        })
    });

    /*----------------
        NewClass Select ImgView Pop
    ----------------*/

    $(document).ready(function () {
        $(".imgSelect").click(function() {
            $(".select_img_box").css("display", "block")
        })

        $(".img-cancel").click(function() {
            $(".select_img_box").css("display", "none")
        })

    })

    /*---------------
        NewClass Lecture StartTime Pop
    --------------- */
    $(document).ready(function() {
        $(".selectBtn").click(function() {
            $(".select_lecture_time").css("display", "block");
        });

        $(".lecture-cancel").click(function() {
            $(".select_lecture_time").css("display", "none");
        })

    });
        



})(jQuery);