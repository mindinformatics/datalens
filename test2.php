<?php

    // Show PHP errors (during development only)
    error_reporting(E_ALL | E_STRICT);
    ini_set("display_errors", 2);
    //phpinfo();

    // Create a Mongo conenction
    $mongo = new MongoClient("mongodb://localhost");

    // Choose the database and collection
    $db = $mongo->cats;
    //echo $db;
    $coll = $db->expression;


    // Retrieve the document and display it
    $item = $coll->findOne();

    echo "Testing connection to Mongo database: cats, collection = expression";
    echo "\n";
    echo "My file name is " . $item['FileName'] . ". PValue is " . $item['PValue'] . ".";
