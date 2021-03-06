<?php
/**
 * 
 * Template to display single Project
 * 
 */


get_header(); ?>

<main role="main" class="col-md-11 col-12 project-content">
    <div id="fullscreen">
        <section class="section">
            <div class="row align-items-center justify-content-center">
                <canvas class="canvas-right"></canvas>
                <div class="align-items-center col-12 d-flex flex-column justify-content-center">
                    <div class="project-logo-container">
                        <img src="<?php the_field('project_logo')?>" class="project-logo"/>
                    </div>
                    <div class="project-title-container text-center">
                        <h2 class="project-title my-4 text-uppercase"><?php the_title()?></h2>
                    </div>
                    <div class="project-date-container">
                        <p class="project-date"><?php the_field('month')?> <span class="project-year"><?php the_field('year')?></span></p>
                    </div>
                    <div class="project-excerpt-container mt-4">
                        <p class="project-excerpt text-center"><?php the_field('excerpt', $post->ID) ?></p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section project-single fp-auto-height-responsive">
            <div class="row">
                <div class="col-12">
                    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <?php the_content(); ?>
                    <?php endwhile; endif; ?>
                </div>
            </div>
        </section>

    </div>
</main>

<?php get_footer();


?>
