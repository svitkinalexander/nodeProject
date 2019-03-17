/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false
	if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'red');
    }
    });
	
    function resizeText() {
        let preferredWidth = 767;
        let displayWidth = window.innerWidth;
        let percentage = displayWidth / preferredWidth;
        let fontsizetitle = 25;
        let newFontSizeTitle = Math.floor(fontsizetitle * percentage);

        $(".divclass").css("font-size", newFontSizeTitle)
    }
    
    $('#mainNav').onePageNav({ 
       	navItems: 'a',
		currentClass: 'active',
		changeHash: false,
		easing: 'swing',
		filter: '',
		navHeight: 60,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		begin: false,
		end: false,
		scrollChange: false
    });

    let container = $('#portfolio_wrapper');


    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        let selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        let winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        let winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });

    $(".fancybox").fancybox();
	
    $(window).bind('resize', function() {
        setProjects();
    });
});

 