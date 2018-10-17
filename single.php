<?php

get_header(); ?>

<main role="main" class="col-md-11 col-12 fullwidth">
    <div id="fullscreen">

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<?php the_content(); ?>
			<?php endwhile; endif; ?>

    </div>
</main>

<?php get_footer();
