let storedState, originState;

function getDocumentWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};
  
function getDocumentHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
};

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function setCustomFileInput() {
    let input = jQuery( 'input.input-file' );
    
    let label	 = jQuery('.input-file-label'),
        labelVal = jQuery(label).text();

    jQuery(input).on('change', function(e) {
        let fileName = '';
        if( this.files && this.files.length > 1 )
            fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
            fileName = e.target.value.split( '\\' ).pop();

        if( fileName ) {
            if(fileName.length > 20) fileName = fileName.slice(0,21) + '...';
            jQuery(label).text(fileName);
        }
        else
            jQuery(label).text(labelVal);
    });
    
}

function ajaxLinkHandler(url) {
    // console.log(isCurrentPageAnchor(url));
    if(isCurrentPageAnchor(url) != true) {
        ajaxLoadContent(url);
        if(url.slice(-'projects'.length) === 'projects' || url.slice(-'projects/'.length) === 'projects/') {
            storedState = {
                'pageType': 'project-archive',
                'href': url
            };
        } else if(url.includes('projects')) {
            storedState = {
                'pageType': 'project-single',
                'href': url
            };
        } else storedState = {
            'pageType': 'home',
            'href': url
        };
        window.history.pushState(storedState, '', url);
        // console.log(storedState);
    } else if(url.includes('#')) {
        storedState = {
            'pageType': 'home',
            'href': url
        };
        scrolltoSection(getUrlHash(url));
        if(getDocumentWidth() >= 768) {
            if(jQuery('.sidebar').hasClass('opened')) {
                let menuItemsArray = jQuery('.menu-list-item');
                jQuery('.sidebar canvas').animate({'opacity': 0})
                for(let list of menuItemsArray) {
                    jQuery(list).animate({
                        'opacity': 0,
                        'left': '-150px'
                    },300);
                }
                jQuery('.menu-text').text(menuStrings.menu);
                jQuery('.menu-text + .material-icons').text('expand_more');
                jQuery('.menu-container .tablet-menu').text('menu');
                jQuery('.sidebar').toggleClass('opened');
            }
        } else {
            if(jQuery('.menu-list-container').hasClass('show')) {
                let menuItemsArray = jQuery('.menu-list-item');
                for(let list of menuItemsArray) {
                    jQuery(list).animate({
                        'opacity': 0,
                        'left': '-150px'
                    },300);
                }
                jQuery('.menu-list-container').toggleClass('show')
                if(jQuery('.hamburger').hasClass('open')) jQuery('.hamburger').toggleClass('open')
            }
        }
        window.history.pushState(storedState, '', url);
    }
    // console.log(history.state);
}

function toggleSidebarDesktop() {
    jQuery('.sidebar').toggleClass('opened');
        let menuItemsArray = jQuery('.menu-list-item');

        if(jQuery('.sidebar').hasClass('opened')) {
            let sec = 100;
            for(let list of menuItemsArray) {
                jQuery(list).delay(sec).animate({
                    'opacity': 1,
                    'left': 0
                },300);
                sec += 100;
            }
            jQuery('.sidebar canvas').delay(sec).animate({'opacity': 1});
            jQuery('.menu-text').text(menuStrings.close);
            jQuery('.menu-text + .material-icons, .menu-container .tablet-menu').text('close');
        } else {
            jQuery('.sidebar canvas').animate({'opacity': 0})
            for(let list of menuItemsArray) {
                jQuery(list).animate({
                    'opacity': 0,
                    'left': '-150px'
                },300);
            }
            jQuery('.menu-text').text(menuStrings.menu);
            jQuery('.menu-text + .material-icons').text('expand_more');
            jQuery('.menu-container .tablet-menu').text('menu');
        }
}

function initLightSlider() {
    if(getDocumentWidth() >= 768) {
        jQuery('#lightSlider').lightSlider({
            item: 2.5,
            vertical: true,
            loop: false,
            move: 1,
            verticalHeight: 550,
            pager: false,
            controls: false
        });
    } else {
        jQuery('#lightSlider').lightSlider({
            item: 1,
            vertical: false,
            loop: false,
            move: 1,
            verticalHeight: 550,
            pager: false,
            controls: false
        });
    }
}

function ajaxLoadContent(url) {
    jQuery.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(){
            if(getDocumentWidth() >= 768) {
                if(!jQuery('.sidebar').hasClass('opened')) {
                    jQuery('.sidebar').toggleClass('opened');
                }
            } else {
                if(!jQuery('.menu-list-container').hasClass('show')) {
                    jQuery('.menu-list-container').toggleClass('show');
                }
                if(!jQuery('.sidebar').hasClass('show-mobile')) {
                    jQuery('.sidebar').toggleClass('show-mobile');
                }
            }
        },
        success: function(data) {
            if(data) {
                let oldContent = jQuery('#fullscreen');
                let newContent = jQuery(data).find('#fullscreen');
                let oldLangSwitcher = jQuery('footer .footer_pll-language-switcher');
                let newLangSwitcher = jQuery(data).find('.footer_pll-language-switcher');
                let oldMobileLangSwitcher = jQuery('nav .sidebar_pll-language-switcher');
                let newMobileLangSwitcher = jQuery(data).find('.sidebar_pll-language-switcher');
                jQuery.fn.fullpage.destroy('all');
                jQuery(oldContent).remove();
                jQuery(oldLangSwitcher).remove();
                jQuery(oldMobileLangSwitcher).remove();
                jQuery('main').append(newContent);
                jQuery('footer').prepend(newLangSwitcher);
                jQuery('.sidebar_pll-container').append(newMobileLangSwitcher);
                if(jQuery('#lightSlider').length > 0) initLightSlider();
                if(jQuery('#googlemap').length > 0) initGoogleMap();
                initFullPage();
                if(url.includes('#')) scrolltoSection(getUrlHash(url));
                if(getDocumentWidth() >= 768) {
                    let menuItemsArray = jQuery('.menu-list-item');
                    jQuery('.sidebar canvas').animate({'opacity': 0})
                    for(let list of menuItemsArray) {
                        jQuery(list).animate({
                            'opacity': 0,
                            'left': '-150px'
                        },300);
                    }
                    jQuery('.menu-text').text(menuStrings.menu);
                    jQuery('.menu-text + .material-icons').text('expand_more');
                    jQuery('.menu-container .tablet-menu').text('menu');
                    jQuery('.sidebar').toggleClass('opened');
                }
                else {
                    let menuItemsArray = jQuery('.menu-list-item');
                    for(let list of menuItemsArray) {
                        jQuery(list).animate({
                            'opacity': 0,
                            'left': '-150px'
                        },300);
                    }
                    jQuery('.menu-list-container').toggleClass('show');
                    if(jQuery('.hamburger').hasClass('open')) 
                        jQuery('.hamburger').toggleClass('open')
                }
                jQuery(jQuery(newContent).find('.ajax-link')).on('click', function(e){
                    ajaxLinkHandler(jQuery(this).attr('href'));
                    e.preventDefault();
                });
            }
        }
    });
}

function scrolltoSection(hash, silent = true) {
    let index;
    switch(hash) {
        case 'splash':
            index = 1;
            break;
        case 'about':
            index = 2;
            break;
        case 'advantages':
            index = 3;
            break;
        case 'services':
            index = 4;
            break;
        case 'projects':
            index = 5;
            break;
        case 'partners':
            index = 6;
            break;
        case 'contacts':
            index = 7;
            break;
        default:
            index = 1;
    }
    if(silent) {
        jQuery.fn.fullpage.silentMoveTo(index);
    } else {
        jQuery.fn.fullpage.moveTo(index);
    }
    

}

function getUrlHash(url) {
    url = url.slice(url.lastIndexOf('#')+1);
    return url;
}

function isCurrentPageAnchor(url) {
    if(url.includes('#')) {
        url = url.slice(url.lastIndexOf('#')+1);
        if(jQuery('[id=' + url + ']').length > 0) {
            return true;
        }// } else if(!url.includes('projects/')) return true;
            else return false;
        
    } else {
        return false;
    }
}

function initFullPage() {
        //Fullpage scroll
        jQuery('#fullscreen').fullpage({
            navigation: true,
            navigationPosition: 'right',
            responsiveWidth: 768,
            scrollOverflow: true,
            onLeave: function(index, nextIndex, direction) {
                let prevAnimatedElements = jQuery(this).find('.animated:not(.delayed)');
                if(prevAnimatedElements) {
                    for (const element of prevAnimatedElements) {
                        jQuery(element).animate({'opacity': 0}, 300);
                    }
                }
                if(getDocumentWidth() >= 768 && (jQuery('.project-single').length < 1 || jQuery('.projects-archive').length < 1)) {
                    if(index == 1) {
                        jQuery('.sidebar').addClass('show-sb');
                        jQuery('main').removeClass('fullwidth');
                    } else if (nextIndex == 1) {
                        jQuery('.sidebar').removeClass('show-sb');
                        jQuery('main').addClass('fullwidth');
                    }
                } 
                else if(getDocumentWidth() < 768 ) {
                    if(direction == 'up') jQuery('.sidebar').addClass('show-mobile');
                    else jQuery('.sidebar').removeClass('show-mobile');
                }
            },
            afterLoad: function(anchorLink, index) {
                if(index > 0) {
                    let newSection = jQuery(this);
                    // animateLogoExcerpt();
                    let nextAnimatedElements = jQuery(newSection).find('.animated:not(.delayed)');
                    let delay = 0;
                    for (const element of nextAnimatedElements) {
                        jQuery(element).delay(delay)
                            .animate({'opacity': 1}, 500 );
                        delay += 100;
                    }
                }
            },
            
            afterRender: function() {
                        if(window.location.href.includes('#')) {
                            scrolltoSection(getUrlHash(window.location.href));
                        }
                        setTimeout(function() {
                            animateLogo();
                        }, 500);
                        animateLogoExcerpt();
            }
                        
        });
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
    if(getDocumentWidth() >= 768 && getDocumentWidth() < 992) {
        center.lat = 48.466868;
        center.lng = 35.048335;
    }
    // The map, centered
    let map = new google.maps.Map(
        document.getElementById('googlemap'), {
            zoom: zoom,
            center: center,
            disableDefaultUI: true,
            animation:  google.maps.Animation.DROP,
            draggable: true,
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

    //init History API state
    
    if($('.project-single').length > 0) {
        originState = storedState = {
            'pageType': 'project-single',
            'href': jQuery(location).attr('href')
        };
    } else if($('.projects-archive').length > 0) {
        originState = storedState = {
            'pageType': 'project-archive',
            'href': jQuery(location).attr('href')
        };
    } else originState = storedState = {'pageType': 'home', 'href': jQuery(location).attr('href')};

    window.history.replaceState(originState, '', originState.url);

    if(document.getElementById('googlemap')) {
        initGoogleMap();
    }

    //Full Page
    initFullPage();

    //Projects slider
    initLightSlider();

    setCustomFileInput();

    if($('.project-content').length > 0) {
        $('.sidebar').addClass('show-sb');
    }
    
    $('.chevron').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    });

    $('.menu-list-item a').on('click', function(){
        $('.menu-list-item').removeClass('active');
        $(this).parent('.menu-list-item').addClass('active');
    }); 

    //Sidebar animation
    $('.menu-container').on('click', function() {
        toggleSidebarDesktop();
        
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

    if (getDocumentWidth() < 768) {
        setTimeout(function() {
            animateLogo();
        }, 500);
        animateLogoExcerpt();
    }
    
    $('.ajax-link').on('click', function(e) {
       ajaxLinkHandler($(this).attr('href'));
       e.preventDefault();
    });

    $(window).on('popstate', function(e) {
        // debugger;
        let prevState, currentState, url;
        
        if(history.state == null) {
            prevState = originState;
        } else {
            prevState = history.state;
        }
        currentState = storedState;
        if(prevState) {
            url = prevState.href;
        }
        if(currentState.pageType != prevState.pageType) {
            
            ajaxLoadContent(url);
        } else if(currentState.pageType == prevState.pageType){
            
            scrolltoSection(getUrlHash(prevState.href), false);
        }

        if(prevState) {
            storedState = prevState;
        }
        e.preventDefault();
    });

});