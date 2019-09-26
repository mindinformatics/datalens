<?php

/**
 * @file
 * members.default_field_validation_rules.inc
 */

/**
 * Implements hook_default_field_validation_rule().
 */
function members_default_field_validation_rule() {
  $export = array();

  $rule = new stdClass();
  $rule->disabled = FALSE; /* Edit this to true to make a default rule disabled initially */
  $rule->api_version = 2;
  $rule->rulename = 'Unique ResultID';
  $rule->name = 'unique_resultid';
  $rule->field_name = 'field_result_id';
  $rule->col = 'value';
  $rule->entity_type = 'field_collection_item';
  $rule->bundle = 'field_result';
  $rule->validator = 'field_validation_unique_validator';
  $rule->settings = array(
    'data' => 'entity',
    'per_user' => 0,
    'bypass' => 0,
    'roles' => array(
      1 => 0,
      2 => 0,
      3 => 0,
      4 => 0,
      5 => 0,
    ),
    'errors' => 0,
    'condition' => 0,
    'condition_wrapper' => array(
      'condition_field' => '',
      'condition_operator' => 'equals',
      'condition_value' => '',
    ),
  );
  $rule->error_message = 'The Result ID needs to be unique for Feeds.';
  $export['unique_resultid'] = $rule;

  return $export;
}
