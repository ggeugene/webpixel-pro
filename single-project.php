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
                    <div class="project-title-container">
                        <h2 class="project-title"><?php the_title()?></h2>
                    </div>
                    <div class="project-date-container">
                        <p class="project-year"><?php the_field('year')?></p>
                        <p class="project-month"><?php the_field('month')?></p>
                    </div>
                </div>
            </div>
        </section>
        <section class="section project-images fp-auto-height-responsive">
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
