<?php
/**
 * @file
 * members.context.inc
 */

/**
 * Implements hook_context_default_contexts().
 */
function members_context_default_contexts() {
  $export = array();

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'directory';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'members' => 'members',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'block-15' => array(
          'module' => 'block',
          'delta' => '15',
          'region' => 'user_first',
          'weight' => '-10',
        ),
        'search-form' => array(
          'module' => 'search',
          'delta' => 'form',
          'region' => 'user_second',
          'weight' => '-10',
        ),
        'scfmembers-scfmembers_user_top_menu' => array(
          'module' => 'scfmembers',
          'delta' => 'scfmembers_user_top_menu',
          'region' => 'user_second',
          'weight' => '-9',
        ),
        'quicktabs-member_comments' => array(
          'module' => 'quicktabs',
          'delta' => 'member_comments',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'block-16' => array(
          'module' => 'block',
          'delta' => '16',
          'region' => 'footer_first',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;
  $export['directory'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'forum';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'forums' => 'forums',
        'forums/*' => 'forums/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'custom_search_blocks-1' => array(
          'module' => 'custom_search_blocks',
          'delta' => '1',
          'region' => 'sidebar_second',
          'weight' => '-36',
        ),
        'poll-recent' => array(
          'module' => 'poll',
          'delta' => 'recent',
          'region' => 'sidebar_second',
          'weight' => '-36',
        ),
        'quicktabs-popular_forums' => array(
          'module' => 'quicktabs',
          'delta' => 'popular_forums',
          'region' => 'sidebar_second',
          'weight' => '-36',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;
  $export['forum'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'members';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'members/*' => 'members/*',
        'users/*' => 'users/*',
        'user' => 'user',
        'user/*' => 'user/*',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-member_commented_on-block_1' => array(
          'module' => 'views',
          'delta' => 'member_commented_on-block_1',
          'region' => 'content',
          'weight' => '20',
        ),
        'block-15' => array(
          'module' => 'block',
          'delta' => '15',
          'region' => 'user_first',
          'weight' => '-10',
        ),
        'search-form' => array(
          'module' => 'search',
          'delta' => 'form',
          'region' => 'user_second',
          'weight' => '-10',
        ),
        'scfmembers-scfmembers_user_top_menu' => array(
          'module' => 'scfmembers',
          'delta' => 'scfmembers_user_top_menu',
          'region' => 'user_second',
          'weight' => '-9',
        ),
        'quicktabs-member_comments' => array(
          'module' => 'quicktabs',
          'delta' => 'member_comments',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'custom_search_blocks-2' => array(
          'module' => 'custom_search_blocks',
          'delta' => '2',
          'region' => 'sidebar_second',
          'weight' => '-9',
        ),
        'block-16' => array(
          'module' => 'block',
          'delta' => '16',
          'region' => 'footer_first',
          'weight' => '-10',
        ),
      ),
    ),
  );
  $context->condition_mode = 0;
  $export['members'] = $context;

  return $export;
}
