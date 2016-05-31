<?php
/**
 * @file
 * Realname module drush integration.
 */

/**
 * Implements hook_drush_command().
 *
 * @return array
 *   An associative array describing your command(s).
 *
 * @see hook_drush_command()
 * @see drush_parse_command()
 *   For a list of recognised keys.
 */
function realname_drush_command() {
  $items = array();

  $items['realname-recreate'] = array(
    'description' => "Recreate realnames on the site.",
    'drupal dependencies' => array('realname'),
    'arguments' => array(
      'uid' => '(optional) A space-delimited list of User IDs',
    ),
    'aliases' => array('rrc'),
    'examples' => array(
      'drush rrc' => 'Recreate realnames for every user on the site.',
      'drush rrc 3' => 'Recreate realname for user with UID 3.',
      'drush rrc 3 4 5 6 7' => 'Recreate realnames for users  with UIDs 3, 4, 5, 6, and 7.',
    ),
  );

  return $items;
}

/**
 * Implements hook_drush_help().
 *
 * Add help components to a command
 *
 * @param string $section
 *
 * @return string
 *   Translated help text string to present to the user.
 *
 * @see hook_drush_help()
 */
function realname_drush_help($section) {
  switch ($section) {
    case 'drush:realname-recreate':
      return dt("Recreate realnames on the site. If left blank, all realnames will be recreated.");
  }
}


/**
 * Recreates realnames for specified (or all) users.
 *
 * Parameters to this function are optional. If any parameters are defined then
 * they should all be valid UIDs of users to update. If no UIDs are given then
 * all users are updated.
 *
 * @return FALSE | NULL
 *   If an error, returns drush_set_error(). If successful completion, nothing
 *   is returned, but a completed message is logged to the console.
 */
function drush_realname_recreate() {
  $args = func_get_args();
  //var_dump($args[0]);

  // If there are any arguments (at all) then they should all be UIDs.
  // Added special code here so that if arg is a pantheon alias, it isn't assumed to be a uid
  if ( (count($args)) && !(substr($args[0], 0, strlen("@pantheon")) === "@pantheon") ) {
    $uids = array();

    // Loop over each of the UIDs and check if the user account exists.
    foreach ($args as $uid) {
      if ($account = user_load($uid)) {
        // Account exists, add the UID to our array.
        $uids[] = $uid;
      }
      else {
        // Account does not exist, let the user know.
        drush_set_error('error', dt('User with UID #!uid does not exist.', array('!uid' => $uid)));
      }
    }

    // Loop complete, it's possible there are no valid UIDs to update
    if (empty($uids)) {
      return drush_set_error(dt('No valid users available to update.'));
    }
  }
  else {
    // No UIDs defined, so we need to load all of the UIDs from {users}
    $uids = db_select('users', 'u')
      ->fields('u', array('uid'))
      // no point updating the anonymous user.
      ->condition('u.uid', 0, '!=')
      ->execute()
      ->fetchCol();
  }

  // $uids now contains an array of users we know to exist.
  realname_user_operations_realname_update($uids);

  drush_log(dt('Updated realnames for !count users.', array(
    '!count' => count($uids),
  )), 'completed');
}
