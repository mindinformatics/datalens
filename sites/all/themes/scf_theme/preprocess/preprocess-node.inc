<?php
// $Id:$

if(!defined('TRUNCATE_LEN')) {
  define('TRUNCATE_LEN',20); //Number of words to truncate teasers by
}

$node = $vars['node'];
$teaser = $vars['teaser'];
// Setting for the comments on the node.
$comment = $vars['comment'];

// Adds links as 'prelinks' to be displayed above the node content.
$links = array();
if ($comment == COMMENT_NODE_OPEN && user_access('post comments')) {
  $links['comment-add'] = array(
    'title' => t('Comment'),
    'href' => 'node/' . $vars['nid'],
    'attributes' => array('title' => t('Share your thoughts and opinions related to this posting.')),
    'fragment' => 'comment-form',
  );
}
elseif ($comment == COMMENT_NODE_OPEN && !user_access('post comments')) {
  $links['comment-add'] = array(
    'title' => t('Comment'),
    'href' => 'access-denied',
    'attributes' => array('title' => t('Please log in to access this function.')),
  );
}
// comment.module only inserts these links on teaser only. We redefined them
// here as need them on full node as well.
if ($vars['comment_count']) {
  $links['comment-comments'] = array(
    'title' => format_plural($vars['comment_count'], '1 comment', '@count comments'),
    'href' => 'node/' . $vars['nid'],
    'attributes' => array('title' => t('Jump to the first comment of this posting.')),
    'fragment' => 'comments',
  );
}

$vars['content']['prelinks'] = array(
  '#theme' => 'links__node',
  '#links' => $links,
  '#attributes' => array('class' => array('links', 'inline')),
);

// Tweaks the links to be displayed below the node content.
$links1 = array();
$links2 = array();
$links3 = array();

// Reuse the same links from prelinks.
if ($comment == COMMENT_NODE_OPEN) {
  $links1['comment-add'] = $vars['content']['prelinks']['#links']['comment-add'];
}

$vars['content']['links']['comment_extra1'] = array(
  '#theme' => 'links__node__comment',
  '#links' => $links1,
  '#attributes' => array('class' => array('links', 'inline')),
);

if (!empty($vars['content']['prelinks']['#links']['comment-comments'])) {
  $links2['comment-comments'] = $vars['content']['prelinks']['#links']['comment-comments'];
}

$vars['content']['links']['comment_extra2'] = array(
  '#theme' => 'links__node__comment',
  '#links' => $links2,
  '#attributes' => array('class' => array('links', 'inline')),
);
    
$flag_recommend = flag_get_flag('recommend');
if (!empty($flag_recommend) && $count = $flag_recommend->get_count($vars['nid'])) {
  $links3['recommend-members'] = array(
    'title' => format_plural($count, '1 member recommends', '@count members recommend'),
    'attributes' => array('id' => 'recommend-nid-' . $vars['nid']),
  );
}

$vars['content']['links']['recommend'] = array(
  '#theme' => 'links__node__comment',
  '#links' => $links3,
  '#attributes' => array('class' => array('links', 'inline')),
);


// Merge the new comments link with the regular comment-count element.
if (!empty($vars['content']['links']['comment']['#links']['comment-new-comments'])) {
  $vars['content']['links']['comment']['#links']['comment-comments']['title'] .= ' (' . comment_num_new($node->nid) . ' new)';
  unset($vars['content']['links']['comment']['#links']['comment-new-comments']);
}

// Remove the read more link, which is placed elsewhere.
unset($vars['content']['links']['#links']['node-readmore']);

$vars['content']['links_extra'] = '';

// Displays the last comment of a thread in node teaser.
$last_reply = db_query_range('SELECT cid, name, changed, uid FROM {comment} WHERE nid = :nid AND status = :status ORDER BY cid DESC', 0, 1, array(
  ':nid' => $vars['nid'],
  ':status' => COMMENT_PUBLISHED,
))->fetchObject();

// Append a read more link in the end of the content.
if ($last_reply) {
  $comment_elements = comment_view(comment_load($last_reply->cid), node_load($vars['nid']));
  $vars['content']['last_comment'] = $comment_elements['comment_body'];
  //dsm($comment_elements['#comment']->created);
  //dsm(date("Y-m-d", $comment_elements['#comment']->created));
  //dsm(format_date($comment_elements['#comment']->created, $type = 'medium', $format = '', $timezone = NULL, $langcode = NULL));
  //$vars['content']['last_comment_date'] = format_date($comment_elements['#comment']->created, $type = 'medium', $format = '', $timezone = NULL, $langcode = NULL); /*? $comment_elements['#comment']->created : false; */
  //
  //Trim comment length in node teaser view.
  if($teaser) {
    $comment_length = TRUNCATE_LEN;
    $full_comment = $vars['content']['last_comment'][0]['#markup'];
    $trimmed_comment = $full_comment;
    $vars['content']['last_comment'][0]['#markup'] = $trimmed_comment;
    // Resolves filed issue #423, remove MORE link when not truncated
    if(strlen($trimmed_comment) < strlen($full_comment)) {
      $vars['content']['last_comment'][0]['#markup'] .=  ' ' . l('more', 'comment/' . $vars['cid'], array('fragment' => 'comment-' . $vars['cid']));
    }
  }
}


