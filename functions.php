<?php


function webpixel_enqueue_styles() {

    // wp_register_script( 'gmaps','https://maps.googleapis.com/maps/api/js?key=AIzaSyD0fe5KeWRuLOz7JcolFCRz2Xlu24-qEsg', array ( 'gmaps' ));
    // wp_register_script( 'webpixeljs', get_stylesheet_directory_uri() . 'js/webpixel.js', array('webpixeljs'), '', false);
    // wp_register_script( 'lightslider', get_stylesheet_directory_uri() . '/js/lightslider.js', array ( 'lightslider' ));
    // wp_register_script( 'fullpage-easing', get_stylesheet_directory_uri() . '/js/fullPage/easings.min.js', array ( 'fullpage' ), ''. false);
    // wp_register_script( 'fullpage-min', get_stylesheet_directory_uri() . '/js/fullPage/fullpage.min.js', array ( 'fullpage' ), ''. false);
    // wp_register_script( 'fullpage-ext', get_stylesheet_directory_uri() . '/js/fullPage/fullpage.extensions.min.js', array ( 'fullpage' ), ''. false);
    // wp_register_script( 'Twinmax', get_stylesheet_directory_uri() . 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js', array ( 'twinmax' ));

    wp_enqueue_style('lightslider', get_stylesheet_directory_uri() . '/css/lightslider.css');
    wp_enqueue_style('fullpage', get_stylesheet_directory_uri() . '/css/fullpage.min.css');
    wp_enqueue_style('bootstrap4', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
    wp_enqueue_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
    wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.3.1/css/all.css');

    $parent_style = 'twentyseventeen-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.

    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );

}
add_action( 'wp_enqueue_scripts', 'webpixel_enqueue_styles' );

// function clean_custom_menus() {
//     $menu_name = 'top'; 
// 	if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
// 		$menu = wp_get_nav_menu_object($locations[$menu_name]);
// 		$menu_items = wp_get_nav_menu_items($menu->term_id);

//         $menu_list = '<nav class="sidebar bg-white">';
//         $menu_list .= '<div class="sidebar-sticky d-md-flex flex-md-column justify-content-md-center align-items-md-center py-3">';
//         $menu_list .= '<canvas class="canvas-right"></canvas>';
//         $menu_list .= '<div class="hamburger"><span class="strip"></span><span class="strip"></span><span class="strip"></span></div>';
//         $menu_list .= '<div class="menu-list-container">';
// 		$menu_list .= "\t\t\t\t". '<ul class="nav menu-list flex-column text-uppercase">';
// 		foreach ((array) $menu_items as $key => $menu_item) {
// 			$title = $menu_item->title;
// 			$url = $menu_item->url;
// 			$menu_list .= "\t\t\t\t\t". '<li class="menu-list-item"><a href="'. $url .'">'. $title .'<span>.</span></a></li>';
// 		}
//         $menu_list .= "\t\t\t\t". '</ul>' . '</div>';
//         $menu_list .= '<div class="logo-container align-self-center">' . '<a href="/" class="logo-link">' . '<img src="img/logo_mini.png"/>' . "\n";
//         $menu_list .= ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 663.773 127.419"><rect class="cls-1" width="343.656" height="127.419"/><g transform="translate(25.735)"><path class="cls-2" d="M124.007,7.6h11.3L107.688,80.411h-9.1L71.6,20.154,45.861,80.411h-9.1L8.2,7.6H19.184L41.153,61.894,64.691,7.6h13.5l25.107,54.294Z" transform="translate(-8.2 16.252)"/><path class="cls-2" d="M109.588,7.6a15.683,15.683,0,0,1,10.984,4.394,14.945,14.945,0,0,1,4.394,10.671V49.027H60.943v16.32a5.4,5.4,0,0,0,5.021,5.021h59V80.725h-59A15,15,0,0,1,50.9,65.661v-43A15,15,0,0,1,65.964,7.6ZM60.943,38.984H114.61V22.978a5.4,5.4,0,0,0-5.021-5.021H65.964a5.4,5.4,0,0,0-5.021,5.021V38.984Z" transform="translate(83.11 16.252)"/><path class="cls-2" d="M137.7,23.852a15,15,0,0,1,15.064,15.064V81.6A15,15,0,0,1,137.7,96.663h-59V0H89.057V23.852ZM142.724,81.6V38.916a5.4,5.4,0,0,0-5.021-5.021H94.078a5.04,5.04,0,0,0-3.452,1.569,4.369,4.369,0,0,0-1.569,3.452V81.6a5.4,5.4,0,0,0,5.021,5.021H137.7a5.4,5.4,0,0,0,5.021-5.021Z" transform="translate(142.558)"/><path d="M175.3,7.6a15,15,0,0,1,15.064,15.064V65.347A15,15,0,0,1,175.3,80.411H126.657v28.873H116.3V7.6Zm4.708,57.747V22.664a5.4,5.4,0,0,0-5.021-5.021H131.364a5.4,5.4,0,0,0-5.021,5.021V65.347a5.4,5.4,0,0,0,5.021,5.021h43.624a5.04,5.04,0,0,0,3.452-1.569A4,4,0,0,0,180.01,65.347Z" transform="translate(222.962 16.252)"/><path d="M143.4,80.411V7.6h10.357V80.411Z" transform="translate(280.913 16.252)"/><path d="M210.685,7.6h13.5L193.738,43.378,224.18,80.411h-13.5L186.833,51.224,163.3,80.411H149.8l30.443-37.033L149.8,7.6h13.5l23.538,27.618Z" transform="translate(294.599 16.252)"/><path d="M234.488,7.6a15.683,15.683,0,0,1,10.984,4.394,14.945,14.945,0,0,1,4.394,10.671V49.027H185.843v16.32a5.4,5.4,0,0,0,5.021,5.021h59V80.725h-59A15,15,0,0,1,175.8,65.661v-43A15,15,0,0,1,190.864,7.6ZM185.843,38.984H239.51V22.978a5.4,5.4,0,0,0-5.021-5.021H190.864a5.4,5.4,0,0,0-5.021,5.021Z" transform="translate(350.197 16.252)"/><path d="M202.7,0h10.357V81.6a5.4,5.4,0,0,0,5.021,5.021h12.24V96.977h-12.24a15,15,0,0,1-15.064-15.064V0Z" transform="translate(407.721)"/><rect class="cls-4" width="10.357" height="10.357" transform="translate(424.313 115.18)"/></g></svg>';
//         $menu_list .= '</a></div>'; 
//         $menu_list .= '<div class="menu-container text-center">' . '<span class="menu-text text-uppercase">Меню</span><i class="material-icons">expand_more</i>' . '</div>';
//         $menu_list .= '<ul class="socials-container flex-row justify-content-center">';
//         $menu_list .= '<li class="social-item"><a class="social-link" href="#"><i class="fab fa-facebook"></i></a></li>';
//         $menu_list .= '<li class="social-item"><a class="social-link" href="#"><i class="fab fa-linkedin"></i></a></li>';
//         $menu_list .= '</ul></di></nav>'
// 	} else {
// 		$menu_list = '<!-- no list defined -->';
// 	}
// 	echo $menu_list;
// }

?>