<?php

// Remove Biblio titles on node pages
if(!empty($vars['node']) && $vars['node']->type == 'biblio') {
  $vars['title']="";
}