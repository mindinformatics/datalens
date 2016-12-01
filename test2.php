<?php

    // Show PHP errors (during development only)
    error_reporting(E_ALL | E_STRICT);
    ini_set("display_errors", 2);
    //phpinfo();

    // Create a Mongo conenction
    $mongo = new MongoClient("mongodb://localhost");

    // Choose the database and collection
    $db = $mongo->drupal_default;
    //echo $db;
    $coll = $db->genetics;


    // Retrieve the document and display it
    $item = $coll->findOne();

    echo "My file name is " . $item['FileName'] . ". Platform is " . $item['PlatformName'] . ".";
