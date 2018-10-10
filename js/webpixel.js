function getDocumentWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  };
  
  function getDocumentHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  };
  


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
            $('.menu-text').text('Закрыть');
            $('.menu-text + .material-icons').text('close');
        } else {
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
    var canvas = document.getElementById('dotCanvas');
    var context = canvas.getContext('2d');
    
    var vw = getDocumentWidth() / 2,
        vh = getDocumentHeight() * 3/4;
    
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', function() {
        onResize(canvas);
    }, false);

    function onResize(canvas) {
      vw = getDocumentWidth() / 2;
      vh = getDocumentHeight() * 3/4;
      resizeCanvas(canvas);
    }
    
    function resizeCanvas(canvas) {
      canvas.width = vw;
      canvas.height = vh;
      drawDots(context);
    }
    resizeCanvas(canvas);
    
    function drawDots(context) {
      var r = 2.2,
          cw = 25,
          ch = 25;
      
      for (var x = 20; x < vw; x+=cw) {
        for (var y = 20; y < vh; y+=ch) {
            context.fillStyle = '#C6C6C6';   
            context.fillRect(x-r/2,y-r/2,r,r);
          }
      }
    }
    drawDots(context);

});