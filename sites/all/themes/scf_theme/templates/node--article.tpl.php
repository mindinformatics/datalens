<article<?php print $attributes; ?>>
<div class="content clearfix"<?php print $content_attributes; ?>>
    <?php print render($content['addtoany']); ?>
   <h3><?php print $date; ?></h3>
   
   <?php if (!$page): ?>
      <h2>
      <a href="<?php print $node_url; ?>"><?php print $title; ?></a>
      </h2>
  <?php endif; ?>
   
    <div class="content clearfix"<?php print $content_attributes; ?>>
	<?php
		// We hide the comments and links now so that we can render them later.
		hide($content['socialsharing_top']);
		hide($content['comments']);
		hide($content['last_comment']);
		hide($content['links']);
		hide($content['links_extra']);
    	hide($content['prelinks']);      
		
		print render($content);
			
	?>
	</div>
 <div class="clearfix">
 <?php 
  $links = render($content['links']); 
  if ($links):
 ?>
 
 <?php
    if (!$teaser):
  ?>
   <div class="share-links">
      <?php print render($content['links']['print_html']); ?> 
      <a href="mailto:?subject=Article&body='<?php print $GLOBALS['base_url'].$node_url; ?>'"><img style="vertical-align: middle;" src="/sites/all/themes/scf_theme/images/Mail_20px.svg" alt="E-mail Icon" height="20" width="20" /></a>
   </div>
	<?php endif; ?>
  
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
</article>
