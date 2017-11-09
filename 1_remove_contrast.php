<?php

/**
 * Remove Contrast uploaded with Mouse 2.0 Analysis files by mistake
 * using the values in an input file.
 *
 * Usage: drush scr 1_remove_contrast.php analysis_nids.txt
 */


$options = drush_get_arguments();
$filename = $options[2];

if ($fh = fopen($filename, "r")) {
  //Read first/header line, but do nothing with it
  //$header_row = fgets($fh);

  while (!feof($fh)) {
    $line_array = explode("\t", rtrim(fgets($fh)));
    $nid = $line_array[0];

  if ($nid) {
    // Load the node by NID then wrap node with Entity API
    $node = node_load($nid);
    $node_wrapper = entity_metadata_wrapper('node', $node);

    //$node_wrapper->field_contrast->set('');
    //$node_wrapper->field_contrast->set(array(NULL)); does not work.
    //$node_wrapper->field_contrast = null; errors but works

   $node_wrapper->field_contrast = null;
   var_dump("Contrast removed for:" . $nid);

    //$node_wrapper->field_contrast->set(NULL);

    $node_wrapper->save();

    } else {
      var_dump("Error! Not a valid nid. Probably empty last line of file.");
      var_dump($nid);
    }

  }
fclose($fh);
}
?>
