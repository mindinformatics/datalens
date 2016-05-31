<?php
/**
 * @file
 * alz.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function alz_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'author_import';
  $feeds_importer->config = array(
    'name' => 'Author Import',
    'description' => 'Allows the import of authors',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => FALSE,
        'directory' => 'private://feeds',
        'allowed_schemes' => array(
          0 => 'public',
          1 => 'private',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '-1',
        'author' => '1',
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'first_name',
            'target' => 'field_first_name',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'middle_name',
            'target' => 'field_middle_name',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'last_name',
            'target' => 'field_last_name',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'full_name',
            'target' => 'title',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'title',
            'target' => 'field_title',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'organization',
            'target' => 'field_organization',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'email',
            'target' => 'field_email',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'deleted',
            'target' => 'field_deleted',
            'unique' => FALSE,
          ),
          8 => array(
            'source' => 'created_date',
            'target' => 'created',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '0',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'authors',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['author_import'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'disclosure';
  $feeds_importer->config = array(
    'name' => 'Disclosure',
    'description' => 'Disclosure',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => FALSE,
        'directory' => 'private://feeds',
        'allowed_schemes' => array(
          0 => 'public',
          1 => 'private',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '-1',
        'author' => '1',
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'manuscript_node_id',
            'target' => 'entityreference:field_manuscript',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'author_node_id',
            'target' => 'entityreference:field_author',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'nothing_to_disclose',
            'target' => 'field_nothing_to_disclose',
            'unique' => FALSE,
          ),
          3 => array(
            'source' => 'consulting_fees',
            'target' => 'field_consulting_fees_desc',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'equity_stock',
            'target' => 'field_equity_stock_desc',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'lecture_fees',
            'target' => 'field_lecture_fees_desc',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'sponsor',
            'target' => 'field_industry_sponsor',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'patents_royalties',
            'target' => 'field_patent_royalties',
            'unique' => FALSE,
          ),
          8 => array(
            'source' => 'confirmed',
            'target' => 'field_checked',
            'unique' => FALSE,
          ),
          9 => array(
            'source' => 'created_date',
            'target' => 'created',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '0',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'disclosure',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['disclosure'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'disclosure_grant';
  $feeds_importer->config = array(
    'name' => 'Disclosure Grant',
    'description' => 'Disclosure Grant',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => FALSE,
        'directory' => 'private://feeds',
        'allowed_schemes' => array(
          0 => 'public',
          1 => 'private',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsFieldCollectionProcessor',
      'config' => array(
        'field_name' => 'field_disclosure_grants',
        'host_entity_type' => 'node',
        'is_field' => 0,
        'guid_field_name' => 'nid',
        'identifier_field_name' => 'field_disclosure_grants',
        'mappings' => array(
          0 => array(
            'source' => 'disclosure_nid',
            'target' => 'host_entity_guid',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'agency',
            'target' => 'field_agency',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'dates',
            'target' => 'field_dates',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'field_disclosure_grants',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['disclosure_grant'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'manuscript';
  $feeds_importer->config = array(
    'name' => 'Manuscript',
    'description' => 'Manuscript',
    'fetcher' => array(
      'plugin_key' => 'FeedsFileFetcher',
      'config' => array(
        'allowed_extensions' => 'txt csv tsv xml opml',
        'direct' => FALSE,
        'directory' => 'private://feeds',
        'allowed_schemes' => array(
          0 => 'public',
          1 => 'private',
        ),
      ),
    ),
    'parser' => array(
      'plugin_key' => 'FeedsCSVParser',
      'config' => array(
        'delimiter' => ',',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsNodeProcessor',
      'config' => array(
        'expire' => '-1',
        'author' => 0,
        'authorize' => 1,
        'mappings' => array(
          0 => array(
            'source' => 'number_a',
            'target' => 'field_number_a',
            'unique' => FALSE,
          ),
          1 => array(
            'source' => 'number_b',
            'target' => 'field_number_b',
            'unique' => FALSE,
          ),
          2 => array(
            'source' => 'title',
            'target' => 'title',
            'unique' => 1,
          ),
          3 => array(
            'source' => 'description',
            'target' => 'field_description',
            'unique' => FALSE,
          ),
          4 => array(
            'source' => 'closed',
            'target' => 'field_closed',
            'unique' => FALSE,
          ),
          5 => array(
            'source' => 'created_date',
            'target' => 'created',
            'unique' => FALSE,
          ),
          6 => array(
            'source' => 'URL',
            'target' => 'url',
            'unique' => FALSE,
          ),
          7 => array(
            'source' => 'authors',
            'target' => 'field_author_id:etid',
            'unique' => FALSE,
          ),
        ),
        'update_existing' => '2',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'manuscript',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['manuscript'] = $feeds_importer;

  return $export;
}
