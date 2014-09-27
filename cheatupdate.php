<?php
if (isset($_REQUEST["cheater_id"])) {


$con = mysqli_connect("localhost","username","password","mastermathtest"); //host,username,password,database	   
if (mysqli_connect_errno($con)) {
  $result = "conn prob in first db: " . mysqli_connect_error($con);
}





$userid = mysqli_real_escape_string($con, $_REQUEST['cheater_id']);	
$userscore = mysqli_real_escape_string($con, $_REQUEST['cheater_score']);	
$candies = mysqli_real_escape_string($con, $_REQUEST['cheater_candies']); 	
//echo $userid."<userid scokre>".$score."< candies>".$candies;

$query = mysqli_query($con,"select maxscore from mastermathtest.bande where fbid='$userid'");
if($query)
{
 while($row = mysqli_fetch_array($query)) {
 
 //$result = $userscore."<>".$row['maxscore']; 
 


if($userscore>$row['maxscore'])
{
//$result=$userscore."<>".$row['maxscore'];
 if(mysqli_query($con,"UPDATE mastermathtest.bande SET maxscore='$userscore',candies='$candies' WHERE fbid='$userid'"))
{
$result=1;
}
else{  
    $result="query error: ".mysqli_error($con);
} 
}// $userscore>$row['maxscore'] if statement ends here
else
{
$result=0;
}
echo $result;
}//end while loop 

} //select query

}
else{
echo "isset not defined";
}

?>