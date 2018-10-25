<?php
function register_pll_string($name, $string, $group) {
    if (function_exists('pll_register_string')) {
        pll_register_string($name, $string, $group);
    }
}
register_pll_string('Menu', 'Menu', 'webpixel');
register_pll_string('Menu', 'Close', 'webpixel');
register_pll_string('Modal', 'Callback', 'webpixel');
register_pll_string('Modal', 'What are you interested in?', 'webpixel');

function webpixel_enqueue_styles() {
    if(!is_admin()) {
        wp_enqueue_script( 'gmaps','https://maps.googleapis.com/maps/api/js?key=AIzaSyD0fe5KeWRuLOz7JcolFCRz2Xlu24-qEsg', array());
        wp_enqueue_script( 'scrolloverflow', get_stylesheet_directory_uri() . '/js/scrolloverflow.min.js', array ('jquery'));
        // wp_enqueue_script( 'fullpage-easing', get_stylesheet_directory_uri() . '/js/fullPage/easings.min.js', array ('jquery'));
        wp_enqueue_script( 'fullpage-min', get_stylesheet_directory_uri() . '/js/fullPage/jquery.fullpage.min.js', array ('jquery'));
        // wp_enqueue_script( 'fullpage-ext', get_stylesheet_directory_uri() . '/js/fullPage/fullpage.extensions.min.js', array('jquery'));
        wp_enqueue_script( 'lightslider', get_stylesheet_directory_uri() . '/js/lightslider.js', array('jquery'));
        wp_enqueue_script( 'Twinmax', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js', array('jquery'));

        wp_enqueue_script( 'webpixeljs', get_stylesheet_directory_uri() . '/js/webpixel.js', array('jquery'));
        $dataToBePassed = array(
            'menu' => pll__('Menu'),
            'close' => pll__('Close')
        );
        wp_localize_script('webpixeljs', 'menuStrings', $dataToBePassed);

        wp_enqueue_style('lightslider', get_stylesheet_directory_uri() . '/css/lightslider.css');
        wp_enqueue_style('fullpage', get_stylesheet_directory_uri() . '/css/jquery.fullpage.min.css');
        wp_enqueue_style('bootstrap4', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
        wp_enqueue_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
        wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.3.1/css/all.css');

        add_action( 'wp_enqueue_scripts', 'enqueue_parent_theme_style');
        function enqueue_parent_theme_style() {
            wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
        }
    }
}
add_action( 'wp_enqueue_scripts', 'webpixel_enqueue_styles' );

function pll_custom_switcher() {
    if(function_exists('pll_the_languages')) {
        $raw_switcher = pll_the_languages(array('raw' => true));
        $custom_switcher = '<ul class="nav sidebar_pll-language-switcher">';

        foreach ($raw_switcher as $key) {
            $custom_switcher .= '<li class="lang-item ' . 'lang-item-' . $key[slug];
            if($key[current_lang]) {
                $custom_switcher .= ' current-lang">';
            } else $custom_switcher .= '">';
            $custom_switcher .= '<a lang="' . $key[locale] . '" hreflang="' . $key[locale] . '" href="' . $key[url] . '">' . $key[name] . '</a></li>';
        }

        $custom_switcher .= '</ul>';

        return $custom_switcher;

    } else {
        return;
    }
    
}

function clean_custom_menus() {
	$menu_name = 'top'; // specify custom menu slug
	if (($locations = get_nav_menu_locations()) && isset($locations[$menu_name])) {
		$menu = wp_get_nav_menu_object($locations[$menu_name]);
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        $menu_list = '<nav class="sidebar bg-white show-mobile">' ."\n";
        $menu_list .= '<div class="sidebar-sticky d-md-flex flex-md-column justify-content-md-center align-items-md-center py-3">';
        $menu_list .= '<canvas class="canvas-right"></canvas>';
        $menu_list .= '<div class="hamburger"><span class="strip"></span><span class="strip"></span><span class="strip"></span></div>';
        $menu_list .= '<div class="menu-list-container">';
		$menu_list .= "\t\t\t\t". '<ul class="nav menu-list flex-column text-uppercase">' ."\n";
		foreach ((array) $menu_items as $key => $menu_item) {
			$title = $menu_item->title;
			$url = $menu_item->url;
			$menu_list .= "\t\t\t\t\t". '<li class="menu-list-item"><a href="'. $url .'" class="ajax-link">'. $title .'<span>.</span></a></li>' ."\n";
        }
        if(pll_custom_switcher()) {
            $menu_list .= '<li class="menu-list-item sidebar_pll-container">' . pll_custom_switcher() . '</li>';
        }
        $menu_list .= "\t\t\t\t". '</ul>' ."\n" . '</div>';
        $menu_list .= '<div class="logo-container align-self-center">';
        $menu_list .= '<a href="' . get_home_url() . '" class="logo-link ajax-link">
        <img src="/webpixel/wp-content/themes/webpixel/img/logo_mini.png"/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 663.773 127.419"><rect class="cls-1" width="343.656" height="127.419"/><g transform="translate(25.735)"><path class="cls-2" d="M124.007,7.6h11.3L107.688,80.411h-9.1L71.6,20.154,45.861,80.411h-9.1L8.2,7.6H19.184L41.153,61.894,64.691,7.6h13.5l25.107,54.294Z" transform="translate(-8.2 16.252)"/><path class="cls-2" d="M109.588,7.6a15.683,15.683,0,0,1,10.984,4.394,14.945,14.945,0,0,1,4.394,10.671V49.027H60.943v16.32a5.4,5.4,0,0,0,5.021,5.021h59V80.725h-59A15,15,0,0,1,50.9,65.661v-43A15,15,0,0,1,65.964,7.6ZM60.943,38.984H114.61V22.978a5.4,5.4,0,0,0-5.021-5.021H65.964a5.4,5.4,0,0,0-5.021,5.021V38.984Z" transform="translate(83.11 16.252)"/><path class="cls-2" d="M137.7,23.852a15,15,0,0,1,15.064,15.064V81.6A15,15,0,0,1,137.7,96.663h-59V0H89.057V23.852ZM142.724,81.6V38.916a5.4,5.4,0,0,0-5.021-5.021H94.078a5.04,5.04,0,0,0-3.452,1.569,4.369,4.369,0,0,0-1.569,3.452V81.6a5.4,5.4,0,0,0,5.021,5.021H137.7a5.4,5.4,0,0,0,5.021-5.021Z" transform="translate(142.558)"/><path d="M175.3,7.6a15,15,0,0,1,15.064,15.064V65.347A15,15,0,0,1,175.3,80.411H126.657v28.873H116.3V7.6Zm4.708,57.747V22.664a5.4,5.4,0,0,0-5.021-5.021H131.364a5.4,5.4,0,0,0-5.021,5.021V65.347a5.4,5.4,0,0,0,5.021,5.021h43.624a5.04,5.04,0,0,0,3.452-1.569A4,4,0,0,0,180.01,65.347Z" transform="translate(222.962 16.252)"/><path d="M143.4,80.411V7.6h10.357V80.411Z" transform="translate(280.913 16.252)"/><path d="M210.685,7.6h13.5L193.738,43.378,224.18,80.411h-13.5L186.833,51.224,163.3,80.411H149.8l30.443-37.033L149.8,7.6h13.5l23.538,27.618Z" transform="translate(294.599 16.252)"/><path d="M234.488,7.6a15.683,15.683,0,0,1,10.984,4.394,14.945,14.945,0,0,1,4.394,10.671V49.027H185.843v16.32a5.4,5.4,0,0,0,5.021,5.021h59V80.725h-59A15,15,0,0,1,175.8,65.661v-43A15,15,0,0,1,190.864,7.6ZM185.843,38.984H239.51V22.978a5.4,5.4,0,0,0-5.021-5.021H190.864a5.4,5.4,0,0,0-5.021,5.021Z" transform="translate(350.197 16.252)"/><path d="M202.7,0h10.357V81.6a5.4,5.4,0,0,0,5.021,5.021h12.24V96.977h-12.24a15,15,0,0,1-15.064-15.064V0Z" transform="translate(407.721)"/><rect class="cls-4" width="10.357" height="10.357" transform="translate(424.313 115.18)"/></g></svg>
        </a></div>';
        $menu_list .= '<div class="menu-container text-center">
        <span class="menu-text text-uppercase">' . pll__('Menu') . '</span><i class="material-icons">expand_more</i><i class="material-icons tablet-menu">menu</i>
        </div>';
        $menu_list .= '<ul class="socials-container flex-row justify-content-center">
        <li class="social-item">
            <a class="social-link" href="#"><i class="fab fa-facebook"></i></a>
        </li>
        <li class="social-item">
            <a class="social-link" href="#"><i class="fab fa-linkedin"></i></a>
        </li>
    </ul></div>';

		$menu_list .= "\t\t\t". '</nav>' ."\n";
	} else {
		// $menu_list = '<!-- no list defined -->';
	}
	echo $menu_list;
}

function project_custom_post_type() {
    $args['post-type-project'] = array(
          'labels' => array(
              'name' => __( 'Projects', 'webpixel' ),
              'singular_name' => __( 'Project Item', 'webpixel' ),
              'all_items' => 'Projects',
              'add_new' => __( 'Add New', 'webpixel' ),
              'add_new_item' => __( 'Add New Project Item', 'webpixel' ),
              'edit_item' => __( 'Edit Project', 'webpixel' ),
              'new_item' => __( 'New Project', 'webpixel' ),
              'view_item' => __( 'View Project', 'webpixel' ),
              'search_items' => __( 'Search Projects', 'webpixel' ),
              'not_found' => __( 'No projects found', 'webpixel' ),
              'not_found_in_trash' => __( 'No projects found in Trash', 'webpixel' ),
              'parent_item_colon' => __( 'Parent Projects:', 'webpixel' ),
              'menu_name' => __( 'Projects', 'webpixel' ),
          ),
          'hierarchical' => true,
          'description' => 'Add your Projects',
          'supports' => array( 'title', 'editor', 'thumbnail', 'custom-fields' ),
          'taxonomies' => array('project_cats'),
          'menu_icon' => 'dashicons-screenoptions',
          'show_ui' => true,
          'public' => true,
          'publicly_queryable' => true,
          'exclude_from_search' => false,
          'capability_type' => 'post',
          'query_var' => 'project',
          'menu_position' => 20,
          'has_archive' => true,
          'rewrite' => array('slug' => 'projects', 'with_front' => true)
          );
  
    register_post_type('project', $args['post-type-project']);
  
    $taxonomies = array();
  
    $taxonomies['taxonomy-project_cats'] = array(
      'labels' => array(
        'name' => __( 'Project Categories', 'webpixel' ),
        'singular_name' => __( 'Project Category', 'webpixel' ),
        'search_items' =>  __( 'Search Project Categories', 'webpixel' ),
        'all_items' => __( 'All Project Categories', 'webpixel' ),
        'parent_item' => __( 'Parent Project Category', 'webpixel' ),
        'parent_item_colon' => __( 'Parent Project Category:', 'webpixel' ),
        'edit_item' => __( 'Edit Project Category', 'webpixel' ),
        'update_item' => __( 'Update Project Category', 'webpixel' ),
        'add_new_item' => __( 'Add New Project Category', 'webpixel' ),
        'new_item_name' => __( 'New Project Category Name', 'webpixel' ),
        'choose_from_most_used'	=> __( 'Choose from the most used project categories', 'webpixel' )
      ),
      'hierarchical' => true,
      // 'orderby' => 'slug',
      'query_var' => true,
      'rewrite' => array( 'slug' => 'projects' )
    );
  
    /* Register taxonomy: name, cpt, arguments */
    register_taxonomy('project_cats', array('project'), $taxonomies['taxonomy-project_cats']);
    register_taxonomy_for_object_type('project_cats', 'project');
  }
  
add_action( 'init', 'project_custom_post_type', 0 );

function webpixel_project_slider_shortcode( $atts ) {

    $a = shortcode_atts( array(
       'slug' => 'all'
    ), $atts );

    if(pll_current_language() == 'en_US') {
        $a['slug'] = $a['slug'] . '-en';
    }

    $string = '';

    $args = array(
      'posts_per_page' => -1,
      'paged' => -1,
      'orderby' => 'date',
      'order' => 'DESC',
      'tax_query' => array(
        array(
          'taxonomy' => 'project_cats',
          'field' => 'slug',
          'terms' => $a['slug']
        )
      )
    );

    $query = new WP_Query($args);

    $string = '';

    if($query->have_posts()) { 

        $string .= '<ul id="lightSlider">';

        foreach($query->posts as $post) {
            $string .= '<li class="carousel-item-container row flex-column flex-md-row ">';
            $string .= '<div class="align-self-center col-12 col-lg-1 col-md-2 mb-2 mb-md-0">';
            $string .= '<p class="carousel-item-year text-center text-md-right mb-0">' . get_field('year', $post->ID) . '</p>';
            $string .= '<p class="carousel-item-month text-center text-md-right mb-0">' . get_field('month', $post->ID) . '</p>';
            $string .= '</div>';
            $string .= '<div class="align-items-center col-12 col-lg-4 col-md-3 d-flex justify-content-center mb-2 mb-md-0">';
            $string .= '<div class="carousel-item-image-container text-center d-flex align-items-center">';
            if(!empty(get_the_post_thumbnail_url($post->ID))) {
                $string .= '<img class="carousel-item-image" src="' . get_the_post_thumbnail_url($post->ID) . '"/>';
            } else {
                $string .= '<img class="carousel-item-image" src="https://via.placeholder.com/300x200"/>';
            }
            $string .= '</div></div>';
            $string .= '<div class="align-self-center col-12 col-lg-7 col-md-7 mb-2 mb-md-0">';
            $string .= '<a href="' . get_the_permalink($post->ID) . '" class="carousel-item-link ajax-link">';
            $string .= '<p class="carousel-item-heading text-uppercase">' . get_the_title( $post->ID) . '</p></a>';
            $string .= '<p class="carousel-item-excerpt">' . get_field('excerpt', $post->ID) . '</p>';
            $string .= '</div></li>';
        }

        $string .= '</ul>';

    } else {
        $string .= 'No posts to display.';
    }

    return $string;

}

add_shortcode( 'projects_slider', 'webpixel_project_slider_shortcode' );

?>