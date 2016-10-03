<?php
/**
 * @file
 * members.feeds_importer_default.inc
 */

/**
 * Implements hook_feeds_importer_default().
 */
function members_feeds_importer_default() {
  $export = array();

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'datasets_importer';
  $feeds_importer->config = array(
    'name' => 'Datasets Importer',
    'description' => 'Import CATS datasets',
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
        'encoding' => 'UTF-8',
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
            'source' => 'Center',
            'target' => 'field_group',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          1 => array(
            'source' => 'Study Name',
            'target' => 'title',
            'unique' => FALSE,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'Data Type',
            'target' => 'field_data_type',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'Data',
            'target' => 'field_links:title',
            'unique' => FALSE,
            'language' => 'und',
          ),
          4 => array(
            'source' => 'Data_Link',
            'target' => 'field_links:url',
            'unique' => FALSE,
            'language' => 'und',
          ),
          5 => array(
            'source' => 'Sample Size',
            'target' => 'field_sample_size',
            'unique' => FALSE,
            'language' => 'und',
          ),
          6 => array(
            'source' => 'Male',
            'target' => 'field_num_male',
            'unique' => FALSE,
            'language' => 'und',
          ),
          7 => array(
            'source' => 'Female',
            'target' => 'field_num_female',
            'unique' => FALSE,
            'language' => 'und',
          ),
          8 => array(
            'source' => 'Study_Body',
            'target' => 'body',
            'unique' => FALSE,
            'language' => 'und',
          ),
          9 => array(
            'source' => 'Brain Regions',
            'target' => 'field_brain_region',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          10 => array(
            'source' => 'Disease',
            'target' => 'field_disease',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          11 => array(
            'source' => 'Species',
            'target' => 'field_species',
            'term_search' => '0',
            'autocreate' => 1,
            'language' => 'und',
          ),
          12 => array(
            'source' => 'Public',
            'target' => 'group_content_access',
            'unique' => FALSE,
          ),
        ),
        'insert_new' => '1',
        'update_existing' => '0',
        'update_non_existent' => 'skip',
        'input_format' => 'full_html',
        'skip_hash_check' => 0,
        'bundle' => 'dataset',
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['datasets_importer'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'evidence_importer';
  $feeds_importer->config = array(
    'name' => 'Evidence importer',
    'description' => 'Upload differentially expressed genes into evidence',
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
        'encoding' => 'UTF-8',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsFieldCollectionProcessor',
      'config' => array(
        'field_name' => 'field_evidence',
        'host_entity_type' => 'node',
        'is_field' => 0,
        'guid_field_name' => 'nid',
        'identifier_field_name' => 'field_evidence_id',
        'mappings' => array(
          0 => array(
            'source' => 'nid',
            'target' => 'host_entity_guid',
            'unique' => FALSE,
            'language' => 'und',
          ),
          1 => array(
            'source' => 'eid',
            'target' => 'identifier_field',
            'unique' => FALSE,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'eid',
            'target' => 'field_evidence_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'genes',
            'target' => 'field_genes_diff',
            'term_search' => '0',
            'autocreate' => 0,
            'language' => 'und',
          ),
        ),
        'insert_new' => '1',
        'update_existing' => '2',
        'update_non_existent' => 'skip',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'field_evidence',
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['evidence_importer'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'gene_importer';
  $feeds_importer->config = array(
    'name' => 'Gene importer',
    'description' => 'Import genes into taxonomy',
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
        'encoding' => 'UTF-8',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsTermProcessor',
      'config' => array(
        'vocabulary' => 0,
        'mappings' => array(
          0 => array(
            'source' => 'symbol',
            'target' => 'name',
            'unique' => FALSE,
            'language' => 'und',
          ),
          1 => array(
            'source' => 'entrezID',
            'target' => 'guid',
            'unique' => 1,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'entrezID',
            'target' => 'field_gene_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'taxID',
            'target' => 'field_taxonomy_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
          4 => array(
            'source' => 'synonyms',
            'target' => 'field_synonyms',
            'unique' => FALSE,
            'language' => 'und',
          ),
          5 => array(
            'source' => 'chromosome',
            'target' => 'field_chromosome',
            'unique' => FALSE,
            'language' => 'und',
          ),
          6 => array(
            'source' => 'map_location',
            'target' => 'field_map_location',
            'unique' => FALSE,
            'language' => 'und',
          ),
          7 => array(
            'source' => 'full_name',
            'target' => 'field_full_name',
            'unique' => FALSE,
            'language' => 'und',
          ),
          8 => array(
            'source' => 'hgnc_id',
            'target' => 'field_hgnc_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
          9 => array(
            'source' => 'ensembl_gene_id',
            'target' => 'field_ensembl_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
        ),
        'insert_new' => '1',
        'update_existing' => '2',
        'update_non_existent' => 'skip',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'genes',
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => 1800,
    'expire_period' => 3600,
    'import_on_create' => TRUE,
    'process_in_background' => FALSE,
  );
  $export['gene_importer'] = $feeds_importer;

  $feeds_importer = new stdClass();
  $feeds_importer->disabled = FALSE; /* Edit this to true to make a default feeds_importer disabled initially */
  $feeds_importer->api_version = 1;
  $feeds_importer->id = 'tag_evidence_with_genes';
  $feeds_importer->config = array(
    'name' => 'Tag Evidence with Genes',
    'description' => 'Tag Evidence Field Collections in Claims with Genes',
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
        'encoding' => 'UTF-8',
        'no_headers' => 0,
      ),
    ),
    'processor' => array(
      'plugin_key' => 'FeedsFieldCollectionProcessor',
      'config' => array(
        'field_name' => 'field_evidence',
        'host_entity_type' => 'node',
        'is_field' => 0,
        'guid_field_name' => 'nid',
        'identifier_field_name' => 'field_evidence_id',
        'mappings' => array(
          0 => array(
            'source' => 'nid',
            'target' => 'host_entity_guid',
            'unique' => FALSE,
            'language' => 'und',
          ),
          1 => array(
            'source' => 'eid',
            'target' => 'identifier_field',
            'unique' => FALSE,
            'language' => 'und',
          ),
          2 => array(
            'source' => 'eid',
            'target' => 'field_evidence_id',
            'unique' => FALSE,
            'language' => 'und',
          ),
          3 => array(
            'source' => 'genes',
            'target' => 'field_genes_diff',
            'term_search' => '0',
            'autocreate' => 0,
            'language' => 'und',
          ),
        ),
        'insert_new' => '1',
        'update_existing' => '2',
        'update_non_existent' => 'skip',
        'input_format' => 'plain_text',
        'skip_hash_check' => 0,
        'bundle' => 'field_evidence',
        'language' => 'und',
      ),
    ),
    'content_type' => '',
    'update' => 0,
    'import_period' => '-1',
    'expire_period' => 3600,
    'import_on_create' => 1,
    'process_in_background' => 0,
  );
  $export['tag_evidence_with_genes'] = $feeds_importer;

  return $export;
}
