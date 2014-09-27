<?php
//ob_start();  // to ON header (location)

//on error showing in this php page
//error_reporting(E_ALL);
//ini_set('display_errors',1);
$result="no output";
if (isset($_REQUEST["userid"])) { //check received data

$con = mysqli_connect("localhost","username","password","mastermathtest"); //host,username,password,database	   
if (mysqli_connect_errno($con)) {
  $result = "conn prob in first db: " . mysqli_connect_error($con);
}

// escape variables for security
$userid = mysqli_real_escape_string($con, $_REQUEST['userid']);	   
$name = mysqli_real_escape_string($con, $_REQUEST['name']);	   
$timestring = mysqli_real_escape_string($con, $_REQUEST['timestring']);
$timechunk = explode(":",$timestring);
$userscore = mysqli_real_escape_string($con, $_REQUEST['userscore']);
$umaxlevel = mysqli_real_escape_string($con, $_REQUEST['ucurrentlevel']);
$candies = mysqli_real_escape_string($con, $_REQUEST['ucandies']);

$timechunk[0]=$timechunk[0]*60000000;
$timechunk[1]=$timechunk[1]*1000000;
$time = $timechunk[0].$timechunk[1].$timechunk[2];

if(mysqli_query($con,"INSERT INTO  mastermathtest.eachgame ( fbid ,string, uagent, ip ) VALUES ( '$userid' , '$timestring', '$_SERVER[HTTP_USER_AGENT]', '$_SERVER[REMOTE_ADDR]' )"))
{
$result="datainserted";
}
else
{
$result="query error: ".mysqli_error($con);
} 
$query = mysqli_query($con,"select maxscore from mastermathtest.bande where fbid='$userid'");
if($query)
{
while($row = mysqli_fetch_array($query)) {
  //$row['maxscore'];
//$result = "userscore and maxscore".$userscore."<>".$row['maxscore']; 
if($userscore>$row['maxscore'])
{

 if(mysqli_query($con,"UPDATE mastermathtest.bande SET maxscore='$userscore',maxlevel='$umaxlevel',candies='$candies' WHERE fbid='$userid'"))
{
//$result="result saved in bande too>> ".$userid. "timestring>> ".$timestring."userscore>>".$userscore."usermaxlevel".$umaxlevel;
$result="maxscoreupdated";
}
else{  
    $result="query error: ".mysqli_error($con);
} 
}
}//while loops ends here
}   //select query ends here

}
else
{
$result="no value in isset";
}
echo $result;


//db table is "users" fields   


	//id	varchar(50)	latin1_swedish_ci		No			 Browse distinct values	 Change	 Drop	 Primary	 Unique	 Index	Fulltext
	//name	varchar(20)	latin1_swedish_ci		No			 Browse distinct values	 Change	 Drop	 Primary	 Unique	 Index	Fulltext
	//string	varchar(8)	latin1_swedish_ci		No			 Browse distinct values	 Change	 Drop	 Primary	 Unique	 Index	Fulltext
	//time	int(20)
	
	

?>
