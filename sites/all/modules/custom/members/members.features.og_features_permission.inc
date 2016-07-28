<?php
/**
 * @file
 * members.features.og_features_permission.inc
 */

/**
 * Implements hook_og_features_default_permissions().
 */
function members_og_features_default_permissions() {
  $permissions = array();

  // Exported og permission: 'node:group:add user'
  $permissions['node:group:add user'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:administer group'
  $permissions['node:group:administer group'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:approve and deny subscription'
  $permissions['node:group:approve and deny subscription'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:create analysis content'
  $permissions['node:group:create analysis content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:create dataset content'
  $permissions['node:group:create dataset content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:delete any analysis content'
  $permissions['node:group:delete any analysis content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:delete any dataset content'
  $permissions['node:group:delete any dataset content'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:delete own analysis content'
  $permissions['node:group:delete own analysis content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:delete own dataset content'
  $permissions['node:group:delete own dataset content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:manage members'
  $permissions['node:group:manage members'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:manage permissions'
  $permissions['node:group:manage permissions'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:manage roles'
  $permissions['node:group:manage roles'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:subscribe'
  $permissions['node:group:subscribe'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:subscribe without approval'
  $permissions['node:group:subscribe without approval'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:unsubscribe'
  $permissions['node:group:unsubscribe'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update any analysis content'
  $permissions['node:group:update any analysis content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update any dataset content'
  $permissions['node:group:update any dataset content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update body field'
  $permissions['node:group:update body field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_acknowledgement field'
  $permissions['node:group:update field_acknowledgement field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_analysis field'
  $permissions['node:group:update field_analysis field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_brain_region field'
  $permissions['node:group:update field_brain_region field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_data_type field'
  $permissions['node:group:update field_data_type field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_disease field'
  $permissions['node:group:update field_disease field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_files field'
  $permissions['node:group:update field_files field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_group field'
  $permissions['node:group:update field_group field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update field_input field'
  $permissions['node:group:update field_input field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_links field'
  $permissions['node:group:update field_links field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_project field'
  $permissions['node:group:update field_project field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_result field'
  $permissions['node:group:update field_result field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_sample_size field'
  $permissions['node:group:update field_sample_size field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_species field'
  $permissions['node:group:update field_species field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update field_status field'
  $permissions['node:group:update field_status field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:update group'
  $permissions['node:group:update group'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update group_content_access field'
  $permissions['node:group:update group_content_access field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update group_group field'
  $permissions['node:group:update group_group field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update og_group_ref field'
  $permissions['node:group:update og_group_ref field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update og_user_node field'
  $permissions['node:group:update og_user_node field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:update own analysis content'
  $permissions['node:group:update own analysis content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:update own dataset content'
  $permissions['node:group:update own dataset content'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:view body field'
  $permissions['node:group:view body field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_acknowledgement field'
  $permissions['node:group:view field_acknowledgement field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_analysis field'
  $permissions['node:group:view field_analysis field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_brain_region field'
  $permissions['node:group:view field_brain_region field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_data_type field'
  $permissions['node:group:view field_data_type field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_disease field'
  $permissions['node:group:view field_disease field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_files field'
  $permissions['node:group:view field_files field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:view field_group field'
  $permissions['node:group:view field_group field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:view field_input field'
  $permissions['node:group:view field_input field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:view field_links field'
  $permissions['node:group:view field_links field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_project field'
  $permissions['node:group:view field_project field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_result field'
  $permissions['node:group:view field_result field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
    ),
  );

  // Exported og permission: 'node:group:view field_sample_size field'
  $permissions['node:group:view field_sample_size field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_species field'
  $permissions['node:group:view field_species field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view field_status field'
  $permissions['node:group:view field_status field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
      'member' => 'member',
      'non-member' => 'non-member',
    ),
  );

  // Exported og permission: 'node:group:view group_content_access field'
  $permissions['node:group:view group_content_access field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:view group_group field'
  $permissions['node:group:view group_group field'] = array(
    'roles' => array(),
  );

  // Exported og permission: 'node:group:view og_group_ref field'
  $permissions['node:group:view og_group_ref field'] = array(
    'roles' => array(
      'administrator member' => 'administrator member',
    ),
  );

  // Exported og permission: 'node:group:view og_user_node field'
  $permissions['node:group:view og_user_node field'] = array(
    'roles' => array(),
  );

  return $permissions;
}
