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
  $context->name = 'home-page';
  $context->description = 'Home page';
  $context->tag = '';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        '<front>' => '<front>',
      ),
    ),
  );
  $context->reactions = array(
    'block' => array(
      'blocks' => array(
        'views-datasets-block' => array(
          'module' => 'views',
          'delta' => 'datasets-block',
          'region' => 'content',
          'weight' => '-10',
        ),
        'views-biblio_view-block_1' => array(
          'module' => 'views',
          'delta' => 'biblio_view-block_1',
          'region' => 'content',
          'weight' => '-8',
        ),
        'scfmembers-scfmembers_user_top_menu' => array(
          'module' => 'scfmembers',
          'delta' => 'scfmembers_user_top_menu',
          'region' => 'user_second',
          'weight' => '-29',
        ),
        'search-form' => array(
          'module' => 'search',
          'delta' => 'form',
          'region' => 'menu',
          'weight' => '-10',
        ),
        'views-latest_news-block' => array(
          'module' => 'views',
          'delta' => 'latest_news-block',
          'region' => 'sidebar_first',
          'weight' => '-10',
        ),
        'views-meetings-block' => array(
          'module' => 'views',
          'delta' => 'meetings-block',
          'region' => 'sidebar_first',
          'weight' => '-9',
        ),
        'block-17' => array(
          'module' => 'block',
          'delta' => '17',
          'region' => 'sidebar_second',
          'weight' => '-10',
        ),
        'nivo_slider-nivo_slider' => array(
          'module' => 'nivo_slider',
          'delta' => 'nivo_slider',
          'region' => 'header_first',
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

  // Translatables
  // Included for use with string extractors like potx.
  t('Home page');
  $export['home-page'] = $context;

  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'interior';
  $context->description = '';
  $context->tag = '';
  $context->conditions = array(
    'default' => array(
      'values' => array(
        'context_condition_default' => 'context_condition_default',
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
        'scfmembers-scfmembers_user_top_menu' => array(
          'module' => 'scfmembers',
          'delta' => 'scfmembers_user_top_menu',
          'region' => 'user_second',
          'weight' => '-31',
        ),
        'search-form' => array(
          'module' => 'search',
          'delta' => 'form',
          'region' => 'user_second',
          'weight' => '-31',
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
  $export['interior'] = $context;

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
