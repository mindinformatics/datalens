<div <?php print $attributes; ?>>
<?php
    // Discussion image or author image otherwise.
    if (!empty($content['field_featured_image']['#items']) && !$page ):
  ?>
    <div class="discussion-image-wrapper">
      <?php print render($content['field_featured_image']); ?>
    </div>
  <?php
    elseif (empty($content['field_featured_image']['#items']) && !$page):
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

<?php if (isset($content['field_authors'])): ?>
    <div class="submitted">
      <?php
      	 //dsm($content['field_authors'][0]['#items']);
         print "by " . implode(", ", $content['field_authors'][0]['#items']);
      ?>
    </div>
<?php endif; ?>

<?php if(isset($content['field_byline']) && isset($content['field_forum_category'])) {
 	print $content['field_byline'][0]['#markup'];
 	
 	if($content['field_forum_category'][0]['#markup']!="Virtual Conferences") {
 		print "<br>Posted on " . $date ;
 	}
 }
 else {
 	print "Posted on " . $date ;
 }
 ?>

 

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
      hide($content['field_image']);
      hide($content['field_authors']); 
      hide($content['field_byline']); 
      if($page) {hide($content['field_forum_category']);}
      
      print render($content) ;
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

      <?php print "<p></p>"; ?>
      <div class="link-wrapper">
      <ul class="links inline">
      <li>
      <?php print render($content['links']['comment_extra1']); ?>
      <?php if (!empty($content['links']['comment_extra2']['#links'])) { print render($content['links']['comment_extra2']);}?>
     </li>
      <li><?php print flag_anon_create_link('bookmarks', $node->nid); ?></li>
      <li><?php print flag_anon_create_link('recommend', $node->nid); ?>
      <?php if (!empty($content['links']['recommend'])) {print render($content['links']['recommend']); } ?></li>
      <li class="last"><?php print flag_anon_create_link('follow_node', $node->nid); ?></li>
      </div>
      </ul>

   
  <?php endif; ?>

  <?php print render($content['comments']); ?>
  </div>
</div>

