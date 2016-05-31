<?php
	if (empty($search)) {
		header("Location: index.php");
		exit;
	}
// php front end to ht://dig
	$default_font = 'font face="Verdana, Arial, Helvetica, sans-serif"';

// build list of urls for <PREV 1 2 3 ... x NEXT>
function print_page_links ($search,$page,$num_pages,$real_num_pages) {
	$url_search = stripslashes($search);
	$url_search = urlencode($url_search);
  if ($num_pages > 1) {
	$tmp = $page % 10;
	if ($page > 10) {
		if (empty($tmp)) {
			$start = $page - 9;
			$end = $page;
		} else {
			$start = ( (intval(($page / 10))) * 10) + 1;
			#$start = $page;
			$end = $start + 9;
		}
		if ($end > $real_num_pages) {
			$end = $real_num_pages;
		}
	} else {
		$start = 1;
		if ($real_num_pages < 10) {
			$end = $real_num_pages;
		} else {
			$end = 10;
		}
	}
	$prev = $page - 1;
	$next = $page + 1;
	if ($prev) {
	  print "<a href=\"results.php?search=$url_search&page=$prev\">Previous</a>";
	}
	for ($i=$start; $i <= $end; $i++) {
		if ($i == $page) {
			print " <b>$i</b> ";
		} else {
			print " <a href=\"results.php?search=$url_search&page=$i\">$i</a> ";
		}
	}
	if ($next <= $real_num_pages) {
	  print "<a href=\"results.php?search=$url_search&page=$next\">Next</a>";
	}
  } else {
	print "<b>1</b>";
  }
}
?>
<HTML>
<HEAD>
<TITLE>Search</TITLE>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/inc/global/header.php"); ?>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/inc/global/subheader.php"); ?>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/inc/search/head.php"); ?>
<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/inc/search/left.php"); ?>


<?php
// test for the $search variable to see whether we're the form or the results
if (empty($search)) {
	$search = $words;
}
  // print the search results
  $HTSEARCH_PROG = "$DOCUMENT_ROOT/inc/.php/htdig.sh";
	$srch = stripslashes($search);
  $words = EscapeShellCmd(UrlEncode($srch));
  $exclude = EscapeShellCmd(UrlEncode($exclude));
  $restrict = EscapeShellCmd(UrlEncode($restrict));
  $config = "j-alz";
  $format = "j-alz";
  $query = "config=$config/htdig&format=$format&words=$words&page=$page&exclude=$exclude&restrict=$restrict";
 
  $command="$HTSEARCH_PROG \"$query\"";
	#print "$command<p>";
  exec($command,$result);
  
  $rc = count($result);
 
	#print " r = $result[2] | rc = $rc<p>"; 
  if ($rc<3) {
	print "There was an error executing this query.  Please try later.\n";
  } elseif ($result[2]=="NOMATCH") {
	print "There were no matches for <B>$search</B> found on the website.<P>\n";
  } elseif ($result[2]=="SYNTAXERROR") {
	print "There is a syntax error in your search for <B>$search</B>:<BR>";
	print "<PRE>" . $result[3] . "</PRE>\n";
  } else {
	$matches = $result[2];
	$firstdisplayed = $result[3];
	$lastdisplayed = $result[4];
	$words = $result[5];
	$page = $result[6];
	$num_pages = $result[7];
	$matches_per_page = $result[8];
  
	$real_num_pages = intval($matches/$matches_per_page +1);
	
	if (!$page) {
	  $page = 1;
	  $firstdisplayed = 1;
	  $lastdisplayed = (min($matches,$matches_per_page));
	}
	$i=9;
	print "
					<!-- You have searched the site for <b>$search</b> -->
					<span class=\"sub2\">Search Results</span> 
						$firstdisplayed - $lastdisplayed of $matches
					<br>
						Results page: 
	";
	print_page_links($search,$page,$num_pages,$real_num_pages);
  
	while($i<$rc) {

	  // grab the match information
	  $title = $result[$i];
	  $url = $result[$i+1];
	  $percent = $result[$i+2];
	  $excerpt = $result[$i+3];

	  // output the match information
		print <<<EOF
      <p><hr noshade size="1">
      </p>
<p><b><a href="$url">$title</a></b><br>
        $excerpt
        </p>
EOF;

	  // move to the next match
	  $i = $i + 4;
	}
	print <<<EOF
      <p><hr noshade size="1">
      </p>
	<p>
					<span class="sub2">Search Results</span>  
						$firstdisplayed - $lastdisplayed of $matches</span>
<br>
						Results page: 
EOF;
  	print_page_links($search,$page,$num_pages,$real_num_pages);
				
  }
?>

<?php include_once($_SERVER['DOCUMENT_ROOT'] . "/inc/global/footer.php"); ?>
