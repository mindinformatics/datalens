<!DOCTYPE html>
<head>
<?php print $head; ?>
<title><?php print $head_title; ?></title>
<?php print $styles; ?>
<?php if (substr($head_title,0,7) == 'Letters' || substr($head_title,0,7) == 'Latest '): ?><style>div.views-row { padding-left:0px; width: 100%; height: 230px; padding-right: 0px; clear: both } </style><?php endif; ?>
<?php print $scripts; ?>
<!--[if lt IE 9]><script src="<?php print base_path() . drupal_get_path('theme', 'responsive_business') . '/js/html5.js'; ?>"></script><![endif]-->
</head>
<body class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>
