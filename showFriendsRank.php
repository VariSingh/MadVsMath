<?php
//ob_start();  // to ON header (location)

//on error showing in this php page
//error_reporting(E_ALL);
//ini_set('display_errors',1);
$result="no output";
if (isset($_REQUEST["data"])) { //check received data

include 'config.php';
$con = mysqli_connect($host,$username,$password,$database); //host,username,password,database	   
if (mysqli_connect_errno($con)) {
  $result = "conn prob in first db: " . mysqli_connect_error($con);
}

// escape variables for security
$dataString = mysqli_real_escape_string($con, $_REQUEST['data']);	
$dataString2 = $dataString;//used in next query
$dataString2 = str_replace("%%%", "','", $dataString);
$dataString2 = "'".$dataString2."'";
/* extracting my current userId from the string (start)*/   
$pos = stripos($dataString, "%%%");
$userid = substr($dataString,0,$pos);
/* extracting my current userId from the string (end)*/ 


$dataString = chop($dataString,"%%%");
$dataString = str_replace("%%%", "','", $dataString);
$dataString = "'".$dataString."'";
$queryString = "select fbid,fname,maxscore from bande where fbid IN(".$dataString.") ORDER BY maxscore DESC LIMIT 6";
$query = mysqli_query($con,$queryString);
if($query)
{
$result='';
$rank = 1;
$topsix = 0;//user rank is in top six   0 == no  / 1 == yes
while($row = mysqli_fetch_array($query)) {
if($row['fbid']==$userid)
{
  $topsix = 1;
}
$result = $result.$rank."#".$row['fbid']."#".$row['fname']."#".$row['maxscore'].">>>";
$rank++;
}//while loops ends here

 if($topsix!=1)
  {
  //query for reference:  SELECT  d.*, c.rank FROM(SELECT maxscore, @rank:=@rank+1 rank FROM(SELECT  DISTINCT maxscore FROM    bande a ORDER   BY maxscore DESC ) t, (SELECT @rank:= 0) r) c INNER JOIN bande d ON c.maxscore= d.maxscore WHERE   d.fbid = '650620925018446'
  $queryString = "SELECT  d.*, c.rank FROM(SELECT maxscore, @rank:=@rank+1 rank FROM(SELECT maxscore FROM bande a WHERE fbid IN(".$dataString2.") ORDER   BY maxscore DESC) t, (SELECT @rank:= 0) r) c INNER JOIN bande d ON c.maxscore= d.maxscore WHERE   d.fbid = '$userid'";
  $myquery = mysqli_query($con,$queryString);
if(!$myquery)
{
$result="haha! this shit's not wokring".$dataString2."<><><><><>".mysqli_error($con);
}
else
{
  while($row = mysqli_fetch_array($myquery)) {
  $result=$result.$row['rank']."#".$row['fbid']."#".$row['fname']."#".$row['maxscore']; 
  }
  }
  
  }
}   //select query ends here 
else
{
$result="query not working".mysqli_error($con);
}
}
else
{
$result="no value in isset showFriendsRank";
}
echo $result;

?>
