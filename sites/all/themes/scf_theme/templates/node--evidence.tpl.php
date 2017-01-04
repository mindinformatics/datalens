<article<?php print $attributes; ?>>
  <?php print render($title_prefix); ?>
  <?php if (!$page && $title): ?>
  <header>
    <?php $claim_prefix = ($content['field_evidence_id']) ? $content['field_evidence_data_type'][0]['#markup'] . ": " . "(". $content['field_evidence_id'][0]['#markup'] . ") " : ""; ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url ?>" title="<?php print $title ?>"><span class="claim-prefix"><?php print $claim_prefix; ?></span><span class="claim-title"><?php print $title; ?></span></a></h2>
  </header>
  <?php endif; ?>
  <?php print render($title_suffix); ?>
  <?php if ($display_submitted): ?>
  <footer class="submitted"><?php print $date; ?> -- <?php print $name; ?></footer>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      dsm($content);
      hide($content['field_evidence_data_type']);
      hide($content['field_evidence_id']);
      hide($content['comments']);
      hide($content['links']);
      hide($content['socialsharing_top']);
      print render($content);
    ?>
  </div>

  <div class="clearfix">
    <?php if (!empty($content['links'])): ?>
      <nav class="links node-links clearfix"><?php print render($content['links']); ?></nav>
    <?php endif; ?>

    <?php print render($content['comments']); ?>
  </div>
</article>
