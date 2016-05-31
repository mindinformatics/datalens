<?php
/**
 * @file
 * members.quicktabs.inc
 */

/**
 * Implements hook_quicktabs_default_quicktabs().
 */
function members_quicktabs_default_quicktabs() {
  $export = array();

  $quicktabs = new stdClass();
  $quicktabs->disabled = FALSE; /* Edit this to true to make a default quicktabs disabled initially */
  $quicktabs->api_version = 1;
  $quicktabs->machine_name = 'member_comments';
  $quicktabs->ajax = 0;
  $quicktabs->hide_empty_tabs = FALSE;
  $quicktabs->default_tab = 0;
  $quicktabs->title = 'Member Comments';
  $quicktabs->tabs = array(
    0 => array(
      'bid' => 'views_delta_scf_comments_recent-block',
      'hide_title' => 1,
      'title' => 'Most Recent',
      'weight' => '-100',
      'type' => 'block',
    ),
    1 => array(
      'bid' => 'views_delta_most_active_commenters-block_1',
      'hide_title' => 1,
      'title' => 'Most Active',
      'weight' => '-99',
      'type' => 'block',
    ),
  );
  $quicktabs->renderer = 'quicktabs';
  $quicktabs->style = 'nostyle';
  $quicktabs->options = array();

  // Translatables
  // Included for use with string extractors like potx.
  t('Member Comments');
  t('Most Active');
  t('Most Recent');

  $export['member_comments'] = $quicktabs;

  $quicktabs = new stdClass();
  $quicktabs->disabled = FALSE; /* Edit this to true to make a default quicktabs disabled initially */
  $quicktabs->api_version = 1;
  $quicktabs->machine_name = 'popular_forums';
  $quicktabs->ajax = 0;
  $quicktabs->hide_empty_tabs = FALSE;
  $quicktabs->default_tab = 0;
  $quicktabs->title = 'Most Popular';
  $quicktabs->tabs = array(
    0 => array(
      'bid' => 'views_delta_forums-block_1',
      'hide_title' => 1,
      'title' => 'Most Viewed',
      'weight' => '-100',
      'type' => 'block',
    ),
    1 => array(
      'bid' => 'views_delta_scf_comments_recent-block',
      'hide_title' => 1,
      'title' => 'Comments',
      'weight' => '-99',
      'type' => 'block',
    ),
  );
  $quicktabs->renderer = 'quicktabs';
  $quicktabs->style = 'nostyle';
  $quicktabs->options = array();

  // Translatables
  // Included for use with string extractors like potx.
  t('Comments');
  t('Most Popular');
  t('Most Viewed');

  $export['popular_forums'] = $quicktabs;

  return $export;
}
