<?php
/**
 * @file
 * members.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function members_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  if ($module == "feeds" && $api == "feeds_importer_default") {
    return array("version" => "1");
  }
  if ($module == "feeds_tamper" && $api == "feeds_tamper_default") {
    return array("version" => "2");
  }
  if ($module == "quicktabs" && $api == "quicktabs") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function members_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_flag_default_flags().
 */
function members_flag_default_flags() {
  $flags = array();
  // Exported flag: "bookmarks".
  $flags['bookmarks'] = array(
    'entity_type' => 'node',
    'title' => 'bookmarks',
    'global' => 0,
    'types' => array(
      0 => 'article',
      1 => 'discussion',
      2 => 'news',
    ),
    'flag_short' => 'Bookmark',
    'flag_long' => 'Add this post to your bookmarks',
    'flag_message' => '',
    'unflag_short' => 'Remove bookmark',
    'unflag_long' => 'Remove this item from your bookmarks',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 0,
    'anon_display' => 1,
    'anon_message' => '<a title="Please log in to access this function." href="/user/login">Bookmark</a>',
    'show_in_links' => array(
      'full' => 'full',
      'teaser' => 'teaser',
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
      'print' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 0,
    'module' => 'members',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  // Exported flag: "follow_comments".
  $flags['follow_comments'] = array(
    'entity_type' => 'comment',
    'title' => 'follow_comments',
    'global' => 0,
    'types' => array(
      0 => 'comment_node_article',
      1 => 'comment_node_discussion',
      2 => 'comment_node_news',
    ),
    'flag_short' => 'Follow',
    'flag_long' => 'Receive notifications via e-mail when this comment is updated',
    'flag_message' => '',
    'unflag_short' => 'Unfollow',
    'unflag_long' => 'Remove e-mail notifications upon update',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 2,
    'anon_display' => 1,
    'anon_message' => '<a title="Please log in to access this function." href="/user/login">Follow</a>',
    'show_in_links' => array(
      'full' => 'full',
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'module' => 'members',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  // Exported flag: "follow_node".
  $flags['follow_node'] = array(
    'entity_type' => 'node',
    'title' => 'follow_node',
    'global' => 0,
    'types' => array(
      0 => 'article',
      1 => 'discussion',
      2 => 'news',
    ),
    'flag_short' => 'Follow',
    'flag_long' => 'Receive e-mail notifications when new comments are added',
    'flag_message' => '',
    'unflag_short' => 'Unfollow',
    'unflag_long' => 'Remove e-mail notifications when new comments are added',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 1,
    'anon_display' => 1,
    'anon_message' => '<a title="Please log in to access this function." href="/user/login">Follow</a>',
    'show_in_links' => array(
      'teaser' => 'teaser',
      'full' => 0,
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
      'print' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 0,
    'module' => 'members',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  // Exported flag: "follow users".
  $flags['follow_users'] = array(
    'entity_type' => 'user',
    'title' => 'follow users',
    'global' => 0,
    'types' => array(),
    'flag_short' => 'Follow this user',
    'flag_long' => 'Receive e-mail notifications when this user creates content',
    'flag_message' => '',
    'unflag_short' => 'Unfollow',
    'unflag_long' => 'Remove e-mail notifications for this user\'s content',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 3,
    'anon_display' => '',
    'anon_message' => '',
    'show_in_links' => array(
      'full' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'show_on_profile' => 0,
    'access_uid' => 'others',
    'module' => 'members',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  // Exported flag: "recommend".
  $flags['recommend'] = array(
    'entity_type' => 'node',
    'title' => 'recommend',
    'global' => 0,
    'types' => array(
      0 => 'article',
      1 => 'discussion',
      2 => 'news',
    ),
    'flag_short' => 'Recommend',
    'flag_long' => 'Recommend this post',
    'flag_message' => '',
    'unflag_short' => 'Unrecommend',
    'unflag_long' => 'Cancel your recommendation',
    'unflag_message' => '',
    'unflag_denied_text' => '',
    'link_type' => 'toggle',
    'weight' => 4,
    'anon_display' => 1,
    'anon_message' => '<a title="Please log in to access this function." href="/user/login">Recommend</a>',
    'show_in_links' => array(
      'full' => 'full',
      'teaser' => 'teaser',
      'rss' => 0,
      'search_index' => 0,
      'search_result' => 0,
      'print' => 0,
      'token' => 0,
    ),
    'show_as_field' => 0,
    'show_on_form' => 0,
    'access_author' => '',
    'show_contextual_link' => 0,
    'i18n' => 0,
    'module' => 'members',
    'locked' => array(
      0 => 'name',
    ),
    'api_version' => 3,
  );
  return $flags;

}

/**
 * Implements hook_node_info().
 */
function members_node_info() {
  $items = array(
    'article' => array(
      'name' => t('Article'),
      'base' => 'node_content',
      'description' => t('Use <em>articles</em> for time-sensitive content like news, press releases or blog posts.'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'dataset' => array(
      'name' => t('Dataset'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'discussion' => array(
      'name' => t('Forums'),
      'base' => 'node_content',
      'description' => t('Forums'),
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'meetings' => array(
      'name' => t('Meetings'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'news' => array(
      'name' => t('News'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}

/**
 * Implements hook_default_profile2_type().
 */
function members_default_profile2_type() {
  $items = array();
  $items['xf_profile'] = entity_import('profile2_type', '{
    "userCategory" : true,
    "userView" : true,
    "type" : "xf_profile",
    "label" : "My Profile",
    "weight" : "0",
    "data" : { "registration" : 1 },
    "rdf_mapping" : []
  }');
  return $items;
}
