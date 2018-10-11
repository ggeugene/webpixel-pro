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
      
    $.each($(path), function(i, el) {
        tl.set($(this), {
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

function initGoogleMap() {
    // The location
    let icon = {
        url: 'file:///mnt/187ABD057ABCE124/Projects/webpixel/img/location.svg',
        scale: 0.6
    };
    let pos = {lat: 48.466741, lng: 35.050695};
    let center = {lat: 48.466925, lng: 35.045921};

    // The map, centered
    let map = new google.maps.Map(
        document.getElementById('googlemap'), {
            zoom: 17,
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

$(document).ready(function() {

    initGoogleMap();

    //Projects slider
    $('#lightSlider').lightSlider({
        item: 2.5,
        vertical: true,
        loop: false,
        move: 1,
        verticalHeight: 550,
        pager: false,
        controls: false
    });

    //Fullpage scroll
    new fullpage('#fullscreen', {
        //options here
        autoScrolling:true,
        scrollHorizontally: true,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	    navigation: true,
        navigationPosition: 'right',
        parallax: true,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        responsiveWidth: 768,
        onLeave: function(origin, destination, direction) {
            let prevAnimatedElements = $(origin.item).find('.animated');
            if(prevAnimatedElements) {
                for (const element of prevAnimatedElements) {
                    $(element).animate({'opacity': 0}, 300 );
                }
            }
            if(origin.index == 0) {
                $('.sidebar').addClass('show-sb');
                $('main').removeClass('fullwidth');
            } else if (destination.index == 0) {
                $('.sidebar').removeClass('show-sb');
                $('main').addClass('fullwidth');
            }
        },
        afterLoad: function(origin, destination, direction) {
            if(destination.item) {
                let nextAnimatedElements = $(destination.item).find('.animated');
                let delay = 0;
                for (const element of nextAnimatedElements) {
                    $(element).delay(delay)
                        .animate({'opacity': 1}, 500 );
                    delay += 100;
                }
            }
        }
    });
    
    //methods
    fullpage_api.setAllowScrolling(true);

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

    //Canvas
    let canvasArray = document.getElementsByTagName('canvas');
    let contextArray = [];
    for (const canvas of canvasArray) {
        contextArray.push(canvas.getContext('2d'));
    }
    // let context = canvas.getContext('2d');
    console.dir(contextArray);
    
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

    setTimeout(function() {
        animateLogo();
    }, 1000);
      

});