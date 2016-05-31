<div <?php print $attributes; ?>>

    <?php if ($display_submitted && $page): ?>
    <div class="authors">
      <?php
        print render($content['field_authors']);
        
      ?>
    </div>
  <?php endif; ?>
 
    <div class="social">
      <?php
       print render($content['addtoany']);    
      ?>
    </div>

<?php
    // Discussion image or author image otherwise.
    if (!empty($content['field_featured_image']['#items'])):
  ?>
    <div class="discussion-image-wrapper">
      <?php print render($content['field_featured_image']); ?>
    </div>
  <?php
    elseif (empty($content['field_featured_image']['#items'])):
  ?>
    <div class="discussion-image-wrapper">
      <?php
        $profile = profile2_load_by_user(user_load($uid), 'xf_profile');
        field_attach_prepare_view('profile2', array($profile->pid => $profile), 'full');
        entity_prepare_view('profile2', array($profile->pid => $profile));
        $profile_elements = field_attach_view('profile2', $profile, 'full');
        print render($profile_elements['field_xfp_photo']);
      ?>
    </div>
  <?php endif; ?>

  <div class="forums-teaser-content">
  <?php print render($title_prefix); ?>
  <?php if (!$page): ?>
    <h2<?php print $title_attributes; ?>>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
    </h2>
  <?php endif; ?>
  <?php print render($title_suffix); ?>

  <?php if ($display_submitted && !$page): ?>
    <div class="meta submitted">
      <?php // print $user_picture; ?>
      <?php
         print render($content['field_authors']);
      ?>
    </div>
  <?php endif; ?>


  <div class="content clearfix"<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      //dsm($content);
      hide($content['socialsharing_top']);
      hide($content['prelinks']);
      hide($content['comments']);
      hide($content['last_comment']);
      hide($content['links']);
      hide($content['links_extra']);
      if($teaser) { hide($content['field_image']); }
      hide($content['field_news_category']);
      print render($content);
    ?>
  </div>


  <?php
    $last_comment = render($content['last_comment']);
    $last_comment_date = !empty($content['last_comment_date']) ? format_date($content['last_comment_date']) : '';

    if ($last_comment):
  ?>
    <div class="last-comment-by">
      <p>Last comment on <?php print $last_comment_date; ?> by <?php print  theme('username', array('account' => user_load($node->last_comment_uid))); ?> </p>
    </div>
<!-- Removed comment teaser
<?php
      // The teaser not only include the last author line, but also a snippet
      // of the actual comment.
      if ($teaser):
    ?>
      <div class="last-comment">
        <blockquote><?php print $last_comment; ?></blockquote>
      </div>
    <?php endif; ?>
 -->
  <?php endif; ?>

  <?php
    // Only display the wrapper div if there are links.
    $links_extra = render($content['links_extra']);
    if ($links_extra && !$teaser):
  ?>
    <div class="link-extra-wrapper">
      <?php print $links_extra; ?>
    </div>
  <?php endif; ?>

  <?php
// Remove the "Add new comment" link on the teaser page or if the comment
// form is being displayed on the same page.
// if ($teaser || !empty($content['comments']['comment_form'])) {
//       unset($content['links']['comment']['#links']['comment-add']);
//     }
// Only display the wrapper div if there are links.
    //dsm($content['links']);
    
    $links = render($content['links']);
    if ($links):
    ?>
    <?php
    if (!$teaser):
    ?>
    <div class="share-links">
      <?php print render($content['links']['print_html']); ?> 
      <a href="mailto:?subject=PaperAlert&body='<?php print $GLOBALS['base_url'].$node_url; ?>'"><img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Mail_20px.svg" alt="E-mail Icon" height="20" width="20" /></a>
    
    </div>
    <?php endif; ?>
      <?php print "<p></p>"; ?>
      <div class="link-wrapper">
      <div class="comment-div">
      <img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Comment_20px.svg" alt="Comment Icon" height="20" width="20" />
      <?php print render($content['links']['comment_extra1']); ?>
      <?php if (!empty($content['links']['comment_extra2']['#links'])) { print "|"; }?>
      <?php print render($content['links']['comment_extra2']); ?>
      </div>
      <img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Bookmark_20px.svg" alt="Bookmark Icon"  height="20" width="20" />
      <?php print flag_anon_create_link('bookmarks', $node->nid); ?>
      <img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Recommend_20px.svg" alt="Recommend Icon"  height="20" width="20" />
      <?php print flag_anon_create_link('recommend', $node->nid); ?>
      <?php if (!empty($content['links']['recommend']['#links'])) { print "|"; }?>
      <?php print render($content['links']['recommend']); ?>
      <img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Follow_20px.svg" alt="Follow Icon" height="20" width="20" />
      <?php print flag_anon_create_link('follow_node', $node->nid); ?>
      </div>
  <?php endif; ?>

  <?php print render($content['comments']); ?>
  </div>
</div>

