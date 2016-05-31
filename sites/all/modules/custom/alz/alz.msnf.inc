<?php
/**
 * @file
 * alz.msnf.inc
 */

/**
 * Implements hook_msnf_step_info().
 */
function alz_msnf_step_info() {
  $export = array();

  $msnf = new stdClass();
  $msnf->disabled = FALSE; /* Edit this to true to make a default msnf disabled initially */
  $msnf->api_version = 1;
  $msnf->identifier = 'step_enter_disclosure|node|disclosure';
  $msnf->step_name = 'step_enter_disclosure';
  $msnf->entity_type = 'node';
  $msnf->bundle = 'disclosure';
  $msnf->data = array(
    'label' => 'Enter Disclosure',
    'weight' => '3',
    'children' => array(
      0 => 'field_certify',
      1 => 'field_consulting_fees_desc',
      2 => 'field_consulting_fees_none',
      3 => 'field_equity_stock_desc',
      4 => 'field_equity_stock_none',
      5 => 'field_industry_grant_support',
      6 => 'field_lecture_fees_desc',
      7 => 'field_lecture_fees_none',
      8 => 'field_nothing_to_disclose',
      9 => 'field_patents_royalties',
      10 => 'field_sponsor_employer',
      11 => 'field_author',
      12 => 'field_manuscript',
      13 => 'field_industry_sponsor',
      14 => 'field_patent_royalties',
      15 => 'field_disclosure_grants',
      16 => 'path',
      17 => 'redirect',
      18 => 'additional_settings',
    ),
    'format_type' => 'default',
    'format_settings' => array(
      'instance_settings' => array(
        'description' => '',
        'show_label' => 1,
        'label_element' => 'h3',
        'classes' => '',
        'skip_non_required' => 1,
        'hide_if_empty' => 0,
        'buttons' => array(
          'previous' => 'Back',
          'next' => 'Next',
          'skip' => 'Skip next step',
        ),
      ),
    ),
  );
  $export['step_enter_disclosure|node|disclosure'] = $msnf;

  $msnf = new stdClass();
  $msnf->disabled = FALSE; /* Edit this to true to make a default msnf disabled initially */
  $msnf->api_version = 1;
  $msnf->identifier = 'step_enter_manuscript_number|node|disclosure';
  $msnf->step_name = 'step_enter_manuscript_number';
  $msnf->entity_type = 'node';
  $msnf->bundle = 'disclosure';
  $msnf->data = array(
    'label' => 'Enter Manuscript Number',
    'weight' => '1',
    'children' => array(
      0 => 'field_manuscript_number_prefix',
      1 => 'field_number_b',
    ),
    'format_type' => 'default',
    'format_settings' => array(
      'instance_settings' => array(
        'description' => '',
        'show_label' => 1,
        'label_element' => 'h3',
        'classes' => '',
        'skip_non_required' => 1,
        'hide_if_empty' => 0,
        'buttons' => array(
          'previous' => 'Back',
          'next' => 'Next',
          'skip' => 'Skip next step',
        ),
      ),
    ),
  );
  $export['step_enter_manuscript_number|node|disclosure'] = $msnf;

  return $export;
}
