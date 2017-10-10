<?php

function lzoom_services_resource() {
  $api = array(
	'lzoom' => array(
  	'operations' => array(
    	'retrieve' => array(
      	'help' => 'Retrieves LocusZoom Services info.',
      	'file' => array(
        	'type' => 'inc',
        	'module' => 'lzoom_services',
        	'name' => 'includes/lzoom.services',
      	),
      	'callback' => 'lzoom_services_resource_retrieve',
      	'access callback' => 'user_access',
      	'access arguments' => array('access content'),
      	'access arguments append' => FALSE,
      	'args' => array(
        	array(
          	'name' => 'filter',
          	'type' => 'string',
          	'description' => 'Function to perform',
          	'source' => array(
            	'path' => '0'
          	),
          	'optional' => TRUE,
          	'default' => '0',
        	),
      	),
    	),
      	),
	),
  );

  return $api;
}


?>
