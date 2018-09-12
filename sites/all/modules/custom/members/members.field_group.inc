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
  $field_group->identifier = 'group_agenda|node|meetings|default';
  $field_group->group_name = 'group_agenda';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'meetings';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Agenda',
    'weight' => '0',
    'children' => array(
      0 => 'field_meeting_image',
      1 => 'field_agenda_text',
      2 => 'field_agenda_files',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Agenda',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-agenda field-group-div',
        'description' => '',
        'show_label' => '1',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'fast',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_agenda|node|meetings|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_analysis_tab|node|dataset|default';
  $field_group->group_name = 'group_analysis_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'Analysis',
    'weight' => '2',
    'children' => array(
      0 => 'field_analysis',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-analysis-tab field-group-htab',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_analysis_tab|node|dataset|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_challenge|node|evidence|default';
  $field_group->group_name = 'group_challenge';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'evidence';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Challenged by',
    'weight' => '5',
    'children' => array(
      0 => 'field_evidence_challenge',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Challenged by',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-challenge field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $field_groups['group_challenge|node|evidence|default'] = $field_group;

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
    'weight' => '13',
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
  $field_group->identifier = 'group_disease|node|dataset|form';
  $field_group->group_name = 'group_disease';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Disease',
    'weight' => '25',
    'children' => array(
      0 => 'field_ad',
      1 => 'field_control',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-disease field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_disease|node|dataset|form'] = $field_group;

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
    'weight' => '11',
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
  $field_group->identifier = 'group_general_tab|node|dataset|default';
  $field_group->group_name = 'group_general_tab';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'default';
  $field_group->parent_name = 'group_tabs';
  $field_group->data = array(
    'label' => 'General',
    'weight' => '1',
    'children' => array(
      0 => 'body',
      1 => 'field_group',
      2 => 'field_project',
      3 => 'field_status',
      4 => 'field_species',
      5 => 'field_brain_region',
      6 => 'field_files',
      7 => 'field_data_type',
      8 => 'field_links',
      9 => 'field_disease',
      10 => 'field_sample_size',
    ),
    'format_type' => 'htab',
    'format_settings' => array(
      'formatter' => 'closed',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-general-tab field-group-htab',
        'id' => '',
      ),
    ),
  );
  $field_groups['group_general_tab|node|dataset|default'] = $field_group;

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
  $field_group->identifier = 'group_notes|node|meetings|default';
  $field_group->group_name = 'group_notes';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'meetings';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Notes',
    'weight' => '3',
    'children' => array(
      0 => 'field_notes_text',
      1 => 'field_notes_files',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Notes',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-notes field-group-div',
        'description' => '',
        'show_label' => '1',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'fast',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_notes|node|meetings|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_race|node|dataset|form';
  $field_group->group_name = 'group_race';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Race',
    'weight' => '18',
    'children' => array(
      0 => 'field_white',
      1 => 'field_black',
      2 => 'field_asian',
      3 => 'field_hispanic',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-race field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_race|node|dataset|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_reports|node|meetings|default';
  $field_group->group_name = 'group_reports';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'meetings';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Progress Reports',
    'weight' => '2',
    'children' => array(
      0 => 'field_progress_reports_text',
      1 => 'field_progress_reports_files',
    ),
    'format_type' => 'div',
    'format_settings' => array(
      'label' => 'Progress Reports',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-reports field-group-div',
        'description' => '',
        'show_label' => '1',
        'label_element' => 'h3',
        'effect' => 'none',
        'speed' => 'fast',
      ),
      'formatter' => 'open',
    ),
  );
  $field_groups['group_reports|node|meetings|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_sex|node|dataset|form';
  $field_group->group_name = 'group_sex';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'form';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Sex',
    'weight' => '17',
    'children' => array(
      0 => 'field_num_male',
      1 => 'field_num_female',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'formatter' => 'collapsible',
      'instance_settings' => array(
        'description' => '',
        'classes' => 'group-sex field-group-fieldset',
        'required_fields' => 1,
        'id' => '',
      ),
    ),
  );
  $field_groups['group_sex|node|dataset|form'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_support|node|evidence|default';
  $field_group->group_name = 'group_support';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'evidence';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Supported by',
    'weight' => '4',
    'children' => array(
      0 => 'field_evidence_support',
    ),
    'format_type' => 'fieldset',
    'format_settings' => array(
      'label' => 'Supported by',
      'instance_settings' => array(
        'id' => '',
        'classes' => 'group-support field-group-fieldset',
        'description' => '',
      ),
      'formatter' => 'collapsed',
    ),
  );
  $field_groups['group_support|node|evidence|default'] = $field_group;

  $field_group = new stdClass();
  $field_group->disabled = FALSE; /* Edit this to true to make a default field_group disabled initially */
  $field_group->api_version = 1;
  $field_group->identifier = 'group_tabs|node|dataset|default';
  $field_group->group_name = 'group_tabs';
  $field_group->entity_type = 'node';
  $field_group->bundle = 'dataset';
  $field_group->mode = 'default';
  $field_group->parent_name = '';
  $field_group->data = array(
    'label' => 'Tabs',
    'weight' => '0',
    'children' => array(
      0 => 'group_analysis_tab',
      1 => 'group_general_tab',
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
  $field_groups['group_tabs|node|dataset|default'] = $field_group;

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
  t('Agenda');
  t('Analysis');
  t('Challenged by');
  t('Datasets');
  t('Disease');
  t('Evidence');
  t('General');
  t('Literature');
  t('Nomination');
  t('Notes');
  t('Progress Reports');
  t('Race');
  t('Sex');
  t('Supported by');
  t('Tabs');

  return $field_groups;
}
