<?php

// Local db settings.
$databases = array (
  'default' =>
  array (
    'default' =>
    array (
      'database' => 'mind-template',
      'username' => 'root',
      'password' => 'root',
      'host' => 'localhost',
      'port' => '',
      'driver' => 'mysql',
      'prefix' => '',
    ),
  ),
);

// Disable performance settings which come enabled by default on Pantheon.
$conf['cache'] = 0;
$conf['block_cache'] = 0;
$conf['page_compression'] = 0;
$conf['preprocess_css'] = 0;
$conf['preprocess_js'] = 0;

// Display errors on screen during development.
$conf['error_level'] = 2;

// Force emails to be sent to local filesystem /tmp/devels-mails/
// instead of sending them to users.
$conf['mail_system'] = array(
  'default-system' => 'DevelMailLog',
);
