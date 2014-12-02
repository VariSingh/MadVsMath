<?php
 if (isset($_REQUEST["yourid"])) { 
include 'config.php';
$con = mysqli_connect($host,$username,$password,$database); //host,username,password,database	
if (mysqli_connect_errno($con)) {
  echo"conn prob: " . mysqli_connect_error($con);
}
$userid  =  mysqli_real_escape_string($con, $_REQUEST['yourid']);	 
//$result = mysqli_query($con,"SELECT DISTINCT * from users WHERE id IN(SELECT DISTINCT id FROM users)ORDER BY time ASC LIMIT 50");
//$result = mysqli_query($con,"SELECT name,string,MIN(time) FROM users GROUP BY id ORDER BY time ASC LIMIT 10");
 $result = mysqli_query($con,"SELECT fbid,fname,maxscore FROM bande ORDER BY maxscore DESC LIMIT 6");
if($result)
{
$rank   = 1;
$topsix = 0;//user rank is in top six   0 == no  / 1 == yes
while($row = mysqli_fetch_array($result)) {
if($row['fbid']==$userid)
{
  $topsix = 1;
}
  $output = $output.$rank."#".$row['fbid']."#".$row['fname']."#".$row['maxscore'].">>>";
$rank++;
  }
  
  if($topsix!=1)
  {
  //query for reference:  SELECT  d.*, c.rank FROM(SELECT maxscore, @rank:=@rank+1 rank FROM(SELECT  DISTINCT maxscore FROM    bande a ORDER   BY maxscore DESC ) t, (SELECT @rank:= 0) r) c INNER JOIN bande d ON c.maxscore= d.maxscore WHERE   d.fbid = '650620925018446'
  
  $result = mysqli_query($con,"SELECT  d.*, c.rank FROM(SELECT maxscore, @rank:=@rank+1 rank FROM(SELECT  DISTINCT maxscore FROM    bande a ORDER   BY maxscore DESC ) t, (SELECT @rank:= 0) r) c INNER JOIN bande d ON c.maxscore= d.maxscore WHERE   d.fbid = '$userid'");
  while($row = mysqli_fetch_array($result)) {
  $output=$output.$row['rank']."#".$row['fbid']."#".$row['fname']."#".$row['maxscore'];
  
  }
  
  }
  $output = chop($output,">>>");
echo $output;
}
else
{
echo "some query issue ".mysqli_query($con);
}
mysqli_close($con);
}
else{
echo "isset not defined";
}
?>