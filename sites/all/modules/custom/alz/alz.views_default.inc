<?php
/**
 * @file
 * alz.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function alz_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'latest_news';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Latest News';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Latest News';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '10';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['row_options']['view_mode'] = 'rss';
  $handler->display->display_options['row_options']['links'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  /* Sort criterion: Content: Sticky */
  $handler->display->display_options['sorts']['sticky']['id'] = 'sticky';
  $handler->display->display_options['sorts']['sticky']['table'] = 'node';
  $handler->display->display_options['sorts']['sticky']['field'] = 'sticky';
  $handler->display->display_options['sorts']['sticky']['order'] = 'DESC';
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'news' => 'news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;

  /* Display: Page */
  $handler = $view->new_display('page', 'Page', 'page');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'node';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'h3';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '600',
  );
  $handler->display->display_options['defaults']['filter_groups'] = FALSE;
  $handler->display->display_options['defaults']['filters'] = FALSE;
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'news' => 'news',
  );
  $handler->display->display_options['filters']['type']['group'] = 1;
  $handler->display->display_options['path'] = 'latest-news';
  $handler->display->display_options['menu']['title'] = 'Latest News';
  $handler->display->display_options['menu']['weight'] = '0';
  $handler->display->display_options['menu']['name'] = 'main-menu';
  $handler->display->display_options['menu']['context'] = 0;
  $handler->display->display_options['menu']['context_only_inline'] = 0;

  /* Display: Feed */
  $handler = $view->new_display('feed', 'Feed', 'feed');
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['style_plugin'] = 'rss';
  $handler->display->display_options['row_plugin'] = 'node_rss';
  $handler->display->display_options['path'] = 'latest-news.xml';
  $handler->display->display_options['displays'] = array(
    'default' => 'default',
    'page' => 'page',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $handler->display->display_options['defaults']['title'] = FALSE;
  $handler->display->display_options['title'] = 'News';
  $handler->display->display_options['defaults']['use_more'] = FALSE;
  $handler->display->display_options['use_more'] = TRUE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['defaults']['use_more_text'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'VIEW MORE';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '4';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Post date */
  $handler->display->display_options['fields']['created']['id'] = 'created';
  $handler->display->display_options['fields']['created']['table'] = 'node';
  $handler->display->display_options['fields']['created']['field'] = 'created';
  $handler->display->display_options['fields']['created']['label'] = '';
  $handler->display->display_options['fields']['created']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['created']['date_format'] = 'custom';
  $handler->display->display_options['fields']['created']['custom_date_format'] = 'd M Y';
  $handler->display->display_options['fields']['created']['second_date_format'] = 'long';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  /* Field: Content: Body */
  $handler->display->display_options['fields']['body']['id'] = 'body';
  $handler->display->display_options['fields']['body']['table'] = 'field_data_body';
  $handler->display->display_options['fields']['body']['field'] = 'body';
  $handler->display->display_options['fields']['body']['label'] = '';
  $handler->display->display_options['fields']['body']['alter']['max_length'] = '100';
  $handler->display->display_options['fields']['body']['alter']['trim'] = TRUE;
  $handler->display->display_options['fields']['body']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['body']['type'] = 'text_summary_or_trimmed';
  $handler->display->display_options['fields']['body']['settings'] = array(
    'trim_length' => '300',
  );
  /* Field: Content: Category */
  $handler->display->display_options['fields']['field_category']['id'] = 'field_category';
  $handler->display->display_options['fields']['field_category']['table'] = 'field_data_field_category';
  $handler->display->display_options['fields']['field_category']['field'] = 'field_category';
  $handler->display->display_options['fields']['field_category']['label'] = '';
  $handler->display->display_options['fields']['field_category']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_category']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_category']['delta_offset'] = '0';
  $handler->display->display_options['fields']['field_category']['separator'] = '|';
  $export['latest_news'] = $view;

  $view = new view();
  $view->name = 'meetings';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Meetings';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Upcoming Meetings';
  $handler->display->display_options['use_more'] = TRUE;
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['use_more_text'] = 'VIEW MORE';
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '15';
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['inline'] = array(
    'field_meeting_image' => 'field_meeting_image',
    'nothing' => 'nothing',
  );
  /* Field: Content: Meeting Image */
  $handler->display->display_options['fields']['field_meeting_image']['id'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['table'] = 'field_data_field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['field'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_meeting_image']['settings'] = array(
    'image_style' => 'jad_thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Meeting Name */
  $handler->display->display_options['fields']['field_meeting_link']['id'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['table'] = 'field_data_field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['field'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_link']['element_type'] = 'strong';
  $handler->display->display_options['fields']['field_meeting_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_link']['click_sort_column'] = 'url';
  /* Field: Content: Meeting Date */
  $handler->display->display_options['fields']['field_meeting_dates']['id'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['table'] = 'field_data_field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['field'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_dates']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_dates']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Location */
  $handler->display->display_options['fields']['field_meeting_location']['id'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['table'] = 'field_data_field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['field'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_location']['element_label_colon'] = FALSE;
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  /* Sort criterion: Content: Meeting Date (field_meeting_dates) */
  $handler->display->display_options['sorts']['field_meeting_dates_value']['id'] = 'field_meeting_dates_value';
  $handler->display->display_options['sorts']['field_meeting_dates_value']['table'] = 'field_data_field_meeting_dates';
  $handler->display->display_options['sorts']['field_meeting_dates_value']['field'] = 'field_meeting_dates_value';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 1;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'meetings' => 'meetings',
  );

  /* Display: Upcoming Meetings Page */
  $handler = $view->new_display('page', 'Upcoming Meetings Page', 'page');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Meeting Image */
  $handler->display->display_options['fields']['field_meeting_image']['id'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['table'] = 'field_data_field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['field'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_meeting_image']['settings'] = array(
    'image_style' => 'jad_thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Meeting Name */
  $handler->display->display_options['fields']['field_meeting_link']['id'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['table'] = 'field_data_field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['field'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_link']['element_type'] = 'strong';
  $handler->display->display_options['fields']['field_meeting_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_link']['click_sort_column'] = 'url';
  /* Field: Content: Meeting Date */
  $handler->display->display_options['fields']['field_meeting_dates']['id'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['table'] = 'field_data_field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['field'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_dates']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_dates']['settings'] = array(
    'format_type' => 'short',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Location */
  $handler->display->display_options['fields']['field_meeting_location']['id'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['table'] = 'field_data_field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['field'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_location']['alter']['strip_tags'] = TRUE;
  $handler->display->display_options['fields']['field_meeting_location']['alter']['preserve_tags'] = '<br>';
  $handler->display->display_options['fields']['field_meeting_location']['element_type'] = '0';
  $handler->display->display_options['fields']['field_meeting_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_location']['settings'] = array(
    'trim_length' => '600',
  );
  $handler->display->display_options['path'] = 'upcoming-meetings';

  /* Display: Upcoming Meetings Block */
  $handler = $view->new_display('block', 'Upcoming Meetings Block', 'block');
  $handler->display->display_options['display_description'] = 'Upcoming Meetings Block';
  $handler->display->display_options['defaults']['pager'] = FALSE;
  $handler->display->display_options['pager']['type'] = 'some';
  $handler->display->display_options['pager']['options']['items_per_page'] = '2';
  $handler->display->display_options['pager']['options']['offset'] = '0';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Meeting Image */
  $handler->display->display_options['fields']['field_meeting_image']['id'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['table'] = 'field_data_field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['field'] = 'field_meeting_image';
  $handler->display->display_options['fields']['field_meeting_image']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_meeting_image']['settings'] = array(
    'image_style' => 'jad_thumbnail',
    'image_link' => '',
  );
  /* Field: Content: Meeting Name */
  $handler->display->display_options['fields']['field_meeting_link']['id'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['table'] = 'field_data_field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['field'] = 'field_meeting_link';
  $handler->display->display_options['fields']['field_meeting_link']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_link']['element_type'] = 'strong';
  $handler->display->display_options['fields']['field_meeting_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_link']['click_sort_column'] = 'url';
  /* Field: Content: Meeting Date */
  $handler->display->display_options['fields']['field_meeting_dates']['id'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['table'] = 'field_data_field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['field'] = 'field_meeting_dates';
  $handler->display->display_options['fields']['field_meeting_dates']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_dates']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_meeting_dates']['settings'] = array(
    'format_type' => 'long',
    'fromto' => 'both',
    'multiple_number' => '',
    'multiple_from' => '',
    'multiple_to' => '',
  );
  /* Field: Content: Location */
  $handler->display->display_options['fields']['field_meeting_location']['id'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['table'] = 'field_data_field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['field'] = 'field_meeting_location';
  $handler->display->display_options['fields']['field_meeting_location']['label'] = '';
  $handler->display->display_options['fields']['field_meeting_location']['element_label_colon'] = FALSE;
  $handler->display->display_options['block_description'] = 'Upcoming Meetings';
  $export['meetings'] = $view;

  return $export;
}
