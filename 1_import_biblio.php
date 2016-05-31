<?php

/**
 * Updates imports pubmed papers and sets an id 
 * using the values in an input file.
 * 
 * Usage: drush scr 1_import_biblio.php biblio_import.txt
 */

/**
 * 
 * Functions Section
 * 
 */ 

/**
 * Get nid of biblio content by pubmed id.
 * 
 * @param integer $pmid
 */

function _get_nid_by_pubmed($pmid) {
	 return db_select('biblio_pubmed', 'bp')
    ->fields('bp', array('nid'))
    ->condition('bp.biblio_pubmed_id', $pmid)
    ->execute()
    ->fetchField();		
}


/**
 * 
 * Code Section
 * 
 */ 
 
$options = drush_get_arguments();
$filename = $options[2]; 

$row = 1;
if ($fh = fopen($filename, "r")) {
  //Read first/header line, but do nothing with it 
  $header_row = fgets($fh);
  
  //require_once(drupal_get_path('module', 'biblio'));
  while (!feof($fh)) {
    $line_array = explode("\t", rtrim(fgets($fh)));
    $srf_id = $line_array[0];
    $pmid = $line_array[1]; 
    $date_raw = $line_array[2]; 
    
    $posted_date = strtotime($date_raw);   
    
    //var_dump($pmid);
    echo $row . "\n";
    
    // Get nid associated with pubmed
    if ($pmid) {
      $nid = _get_nid_by_pubmed($pmid);
    }
    
    if ($nid) {
       //Paper found and wanted to do something to it, would need to load it
       	echo "Paper already loaded for pubmed_id:" . $pmid . " srf_id:" . $srf_id . " has nid:" . $nid . "\n";
      	$node = node_load($nid);
    
     } else {
     	
     	// Create the node with Biblio pubmed fetch command, then submit and save. 
	  	try {
	  		$node = biblio_pm_fetch_pmid($pmid);
			//var_dump($node);
			//echo $node->title;
	  	} 
	  	catch (Exception $e) {
	  		echo $e->getMessage();
	  	}
	  	

	  	if(isset($node->title)) {
			if(strlen($node->title) > 255) {
				$node->title = substr($node->title, 0, 255);
	  		}
	  	
	  		node_submit($node);
	  	
	  		try {
	  			node_save($node);
      		}
      		catch (Exception $e) {
        		echo "Failed to add" . $pmid;
        		echo $e->getMessage();
      		}
	  	}
	  	
	
     }
     
   if(isset($node->title)) { 
		//Wrap node with Entity API	
		$node_wrapper = entity_metadata_wrapper('node', $node); 
		$node_wrapper->field_id->set($srf_id);
		$node_wrapper->created->set($posted_date);
		$node_wrapper->language->set("und");
		$node_wrapper->save(); 
   }
    
  
  	$row++;
  }
fclose($fh);
}
?>