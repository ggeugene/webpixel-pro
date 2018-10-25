<?php
/**
 * 
 * Template to display archive of all Projects
 * 
 */


get_header(); ?>

<main role="main" class="col-md-11 col-12 project-content">
    <div id="fullscreen">
    <section id="projects" class="fullscreen-section section projects-archive">
                        <div class="row align-items-end align-items-md-end h-100">
                            <div class="col-lg-1 d-lg-block d-none"></div>
                            <div class="col-md-11 col-lg-9 flex-column flex-md-row animated">
                                <h2 class="section-heading text-left font-weight-extrabold text-uppercase mb-5 pb-5">Наши <br>работы<span class="blue-text">:</span></h2>
                                <?php echo do_shortcode('[projects_slider]'); ?>        
                            </div>
                            <div class="col-lg-2 d-lg-block d-none w-md-100"></div>
                            <canvas class="canvas-right animated"></canvas>
                        </div>
                </section>

    </div>
</main>

<?php get_footer();


?>
