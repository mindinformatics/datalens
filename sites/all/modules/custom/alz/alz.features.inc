<?php
/**
 * @file
 * alz.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function alz_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "context" && $api == "context") {
    return array("version" => "3");
  }
  if ($module == "feeds" && $api == "feeds_importer_default") {
    return array("version" => "1");
  }
  if ($module == "feeds_tamper" && $api == "feeds_tamper_default") {
    return array("version" => "2");
  }
  if ($module == "msnf" && $api == "msnf") {
    return array("version" => "1");
  }
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function alz_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function alz_image_default_styles() {
  $styles = array();

  // Exported image style: feature.
  $styles['feature'] = array(
    'label' => 'feature',
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 325,
          'height' => 150,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: jad_thumbnail.
  $styles['jad_thumbnail'] = array(
    'label' => 'JAD Thumbnail',
    'effects' => array(
      4 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 75,
          'height' => 75,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: profile_picture.
  $styles['profile_picture'] = array(
    'label' => 'Profile Picture',
    'effects' => array(
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 85,
          'height' => 115,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function alz_node_info() {
  $items = array(
    'meetings' => array(
      'name' => t('Meetings'),
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
