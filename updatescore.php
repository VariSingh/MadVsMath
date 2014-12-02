<?php

 if (isset($_REQUEST["uniqueId"])) { 
include 'config.php';
$con = mysqli_connect($host,$username,$password,$database); //host,username,password,database	
if (mysqli_connect_errno($con)) {
  echo"conn prob: " . mysqli_connect_error($con);
}
$userid  =  mysqli_real_escape_string($con, $_REQUEST['uniqueId']);
$userscore   =  mysqli_real_escape_string($con, $_REQUEST['updatedScore']);


$query = mysqli_query($con,"select maxscore from mastermath.bande where fbid='$userid'");
if($query)
{
while($row = mysqli_fetch_array($query)) {
  //$row['maxscore'];
//$result = "userscore and maxscore".$userscore."<>".$row['maxscore']; 
if($userscore>$row['maxscore'])
	{

		if(mysqli_query($con,"UPDATE mastermath.bande SET maxscore='$userscore' WHERE fbid='$userid'"))
			{
				$result=1;
			}
		else{  
				mysqli_error($con);
			} 
	}
else
	{
	$result=2;
	}
}//while loops ends here
}   //select query ends here
	echo $result;
}
?>