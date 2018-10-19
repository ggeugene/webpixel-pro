function getDocumentWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};
  
function getDocumentHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function animateLogo() {
    let tmax_optionsGlobal = {
        repeat: 0,
        repeatDelay: 0.65,
        yoyo: true
    };
      
    CSSPlugin.useSVGTransformAttr = true;
      
    let tl = new TimelineMax(tmax_optionsGlobal),
        path = '.logo-svg *',
        stagger_val = 0.0125,
        duration = 2;
      
    jQuery.each(jQuery(path), function(i, el) {
        tl.set(jQuery(this), {
          x: '+=' + getRandom(-500, 500),
          y: '+=' + getRandom(-500, 500),
          rotation: '+=' + getRandom(-720, 720),
          scale: 0,
          opacity: 0
        });
    });
      
    let stagger_opts_to = {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: Power4.easeInOut
    };
      
    tl.staggerTo(path, duration, stagger_opts_to, stagger_val);
}

function animateLogoExcerpt() {

        let animatedElements = jQuery('#splash').find('.animated.delayed');
        let delay = 3000;
        for (const element of animatedElements) {
            jQuery(element).delay(delay)
                .animate({'opacity': 1}, 1000 );
            delay += 500;
        }
}

function initGoogleMap() {
    // The location
    let icon = {
        url: '/webpixel/wp-content/themes/webpixel/img/location.svg',
        scale: 0.6
    };
    let pos = {lat: 48.466741, lng: 35.050695};
    let center = {lat: 48.466925, lng: 35.045921};
    let zoom = 17;

    if(getDocumentWidth() < 768) {
        center.lat = pos.lat;
        center.lng = pos.lng;
    }
    // The map, centered
    let map = new google.maps.Map(
        document.getElementById('googlemap'), {
            zoom: zoom,
            center: center,
            disableDefaultUI: true,
            animation:  google.maps.Animation.DROP,
            draggable: false,
            draggableCursor: 'default'
        });
    // The marker, positioned
    let marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icon
    });
  }

jQuery(document).ready(function($) {
    // console.dir($('#googlemap'));
    if(document.getElementById('googlemap')) {
        initGoogleMap();
    }

    //Projects slider
    if(getDocumentWidth() > 768) {
        $('#lightSlider').lightSlider({
            item: 2.5,
            vertical: true,
            loop: false,
            move: 1,
            verticalHeight: 550,
            pager: false,
            controls: false
        });
    } else {
        $('#lightSlider').lightSlider({
            item: 1,
            vertical: false,
            loop: false,
            move: 1,
            verticalHeight: 550,
            pager: false,
            controls: false
        });
    }
    

    //Fullpage scroll
    new fullpage('#fullscreen', {
        //options here
        // autoScrolling:true,
        // scrollHorizontally: true,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	    navigation: true,
        navigationPosition: 'right',
        responsiveWidth: 769,
        scrollOverflow: true,
        onLeave: function(origin, destination, direction) {
            let prevAnimatedElements = $(origin.item).find('.animated:not(.delayed)');
            if(prevAnimatedElements) {
                for (const element of prevAnimatedElements) {
                    $(element).animate({'opacity': 0}, 300);
                }
            }
            if(getDocumentWidth() > 768 && $('.project-content').length < 1) {
                if(origin.index == 0) {
                    $('.sidebar').addClass('show-sb');
                    $('main').removeClass('fullwidth');
                } else if (destination.index == 0) {
                    $('.sidebar').removeClass('show-sb');
                    $('main').addClass('fullwidth');
                }
            } 
            // else if (direction == 'up')
            //             $('.sidebar').addClass('show-sb');
            //         else $('.sidebar').removeClass('show-sb');
        },
        afterLoad: function(origin, destination, direction) {
            if(destination.item) {
                animateLogoExcerpt();
                let nextAnimatedElements = $(destination.item).find('.animated:not(.delayed)');
                let delay = 0;
                for (const element of nextAnimatedElements) {
                    $(element).delay(delay)
                        .animate({'opacity': 1}, 500 );
                    delay += 100;
                }
            }
        },
        afterRender: setTimeout(function() {
                        animateLogo();
                    }, 1000)
                    
    });
    if($('.project-content').length > 0) {
        $('.sidebar').addClass('show-sb');
    }
    
    //methods
    // fullpage_api.setAllowScrolling(true);

    //Sidebar animation
    $('.menu-container').on('click', function() {
        $('.sidebar').toggleClass('opened');
        let menuItemsArray = $('.menu-list-item');

        if($('.sidebar').hasClass('opened')) {
            let sec = 100;
            for(let list of menuItemsArray) {
                $(list).delay(sec).animate({
                    'opacity': 1,
                    'left': 0
                },300);
                sec += 100;
            }
            $('.sidebar canvas').delay(sec).animate({'opacity': 1});
            $('.menu-text').text('Закрыть');
            $('.menu-text + .material-icons').text('close');
        } else {
            $('.sidebar canvas').animate({'opacity': 0})
            for(let list of menuItemsArray) {
                $(list).animate({
                    'opacity': 0,
                    'left': '-150px'
                },300);
            }
            $('.menu-text').text('Меню');
            $('.menu-text + .material-icons').text('expand_more');
        }
        
    });

    //Mobile menu animation
    $('.hamburger').on('click', function() {
        $(this).toggleClass('open');
        $('.menu-list-container').toggleClass('show');
        let menuItemsArray = $('.menu-list-item');

        if($('.menu-list-container').hasClass('show')) {
            let sec = 100;
            for(let list of menuItemsArray) {
                $(list).delay(sec).animate({
                    'opacity': 1,
                    'left': 0
                },300);
                sec += 100;
            }
        } else {
            for(let list of menuItemsArray) {
                $(list).animate({
                    'opacity': 0,
                    'left': '-150px'
                },300);
            }
        }

    });

    //Canvas
    let canvasArray = document.getElementsByTagName('canvas');
    let contextArray = [];
    for (const canvas of canvasArray) {
        contextArray.push(canvas.getContext('2d'));
    }
    
    let vw = getDocumentWidth() / 2,
        vh = getDocumentHeight() * 3/4;
    
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', function() {
        onResize(canvasArray);
    }, false);

    function onResize(canvasArray) {
      vw = getDocumentWidth() / 2;
      vh = getDocumentHeight() * 3/4;
      resizeCanvas(canvasArray);
    }
    
    function resizeCanvas(canvasArray) {
        for (const canvas of canvasArray) {
            canvas.width = vw;
            canvas.height = vh;

            drawDots(canvas.getContext('2d'));
        }
    }

    resizeCanvas(canvasArray);
    
    function drawDots(context) {
      let r = 2.2,
          cw = 25,
          ch = 25;
      
      for (let x = 20; x < vw; x+=cw) {
        for (let y = 20; y < vh; y+=ch) {
            context.fillStyle = '#C6C6C6';   
            context.fillRect(x-r/2,y-r/2,r,r);
          }
      }
    }
    for (const canvas of canvasArray) {
        drawDots(canvas.getContext('2d'));
    }

    if (getDocumentWidth() <= 768) {
        setTimeout(function() {
            animateLogo();
        }, 1000);
        animateLogoExcerpt();
    }
      

});