<?php
/**
 * @file
 * members.field_group.inc
 */

/**
 * Implements hook_field_group_info().
 */
function members_field_group_info() {
  $field_groups = array();

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_datasets_tab|node|targets|default';
  $field_group->group_name = 'group_datasets_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'targets';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Datasets',
    'weight' => '11',
    'children' => array(
      0 => 'field_dataset_links',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-datasets-tab field-group-htab',
        'required_fields' => 1,
      ),
    ),
  );
  $field_groups['group_datasets_tab|node|targets|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_evidence_tab|node|targets|default';
  $field_group->group_name = 'group_evidence_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'targets';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Evidence',
    'weight' => '13',
    'children' => array(
      0 => 'field_claim_links',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-evidence-tab field-group-htab',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_evidence_tab|node|targets|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_literature_tab|node|targets|default';
  $field_group->group_name = 'group_literature_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'targets';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Literature',
    'weight' => '12',
    'children' => array(
      0 => 'field_literature_links',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-literature-tab field-group-htab',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_literature_tab|node|targets|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_nomination_tab|node|targets|default';
  $field_group->group_name = 'group_nomination_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'targets';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Nomination',
    'weight' => '10',
    'children' => array(
      0 => 'body',
      1 => 'field_nominator',
      2 => 'field_links',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-nomination-tab field-group-htab',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_nomination_tab|node|targets|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tabs|node|targets|default';
  $field_group->group_name = 'group_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'targets';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tabs',
    'weight' => '3',
    'children' => array(
      0 => 'group_datasets_tab',
      1 => 'group_evidence_tab',
      2 => 'group_literature_tab',
      3 => 'group_nomination_tab',
    ),
    'format_type' => 'htabs',
    'format_settings' => array(
      'formatter' => '',
      'instance_settings' => array(
        'classes' => 'group-tabs field-group-htabs',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_tabs|node|targets|default'] = $field_group;

  // Translatables
  // Included for use with string extractors like potx.
  t('Datasets');
  t('Evidence');
  t('Literature');
  t('Nomination');
  t('Tabs');

  return $field_groups;
}
