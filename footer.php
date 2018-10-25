
        </div> <!-- container-fluid -->

    </div> <!-- row -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
  <?php wp_footer() ?>
  <footer>
        <div class="footer_pll-language-switcher d-none d-md-block">
            <?php pll_the_languages(array('dropdown' => 1)); ?>
        </div>
        <div class="callback-button">
            <a class="callback-link d-flex align-items-center justify-content-center w-100 h-100" data-toggle="modal" data-target="#modal-callback">
                <i class="material-icons">call</i>
            </a>
      </div>
        <div class="modal fade" id="modal-callback" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i class="material-icons">close</i>
                    </button>
                    <div class="modal-body align-items-center d-flex justify-content-center">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <h2 class="section-heading text-uppercase text-center mb-4"><?php pll_e('Callback') ?><span class="blue-text">.</span></h2>
                                </div>
                            </div>
                            <div class="row align-items-center justify-content-center">
                                <div class="col-12 col-lg-3 col-md-6">
                                    <?php echo do_shortcode('[contact-form-7 id="55" title="Callback contact form RU"]'); ?>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-brief" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <i class="material-icons">close</i>
                        </button>
                        <div class="modal-body align-items-center d-flex justify-content-center">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12">
                                        <h2 class="section-heading text-uppercase text-center mb-4"><?php pll_e('What are you interested in?') ?></h2>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-12 col-lg-6">
                                    <?php echo do_shortcode('[contact-form-7 id="56" title="Brief contact form RU"]'); ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
  </footer>
</html>