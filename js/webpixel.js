
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

$(document).ready(function(){
    $('#lightSlider').lightSlider({
        item: 2.5,
        vertical: true,
        loop: false,
        move: 1,
        verticalHeight: 550,
        pager: false,
        controls: false
    });
    initGoogleMap();
    new fullpage('#fullscreen', {
        //options here
        autoScrolling:true,
        scrollHorizontally: true,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	    navigation: true,
        navigationPosition: 'right',
        parallax: true,
        parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
        responsiveWidth: 768
        // navigationTooltips: ['about', 'advantages', 'services', 'projects', 'contacts'],
        // showActiveTooltip: false
    });
    
    //methods
    fullpage_api.setAllowScrolling(true);
});