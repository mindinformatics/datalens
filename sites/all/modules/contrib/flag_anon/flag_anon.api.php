<?php

/**
 * @file
 * Hooks provided by the Flag anonymous module.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Alter anonymous message placeholders list.
 *
 * @param array $placeholders
 *   Placeholders list, usage in PHP strtr() function second parameter.
 * @param object $flag
 *   The Flag entity.
 * @param int $entity_id
 *   The flaggable entity id.
 */
function hook_flag_anon_message_placeholders_alter(array &$placeholders, $flag, $entity_id) {

}
