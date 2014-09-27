<?php
ob_start();  // to ON header (location)

//on error showing in this php page
//error_reporting(E_ALL);
//ini_set('display_errors',1);

   if (isset($_REQUEST["userid"])) { //check received data    
	   
 	   // Create connection
$con =  mysqli_connect("localhost","username","password","mastermathtest");//host,username,password,database
	   
if (mysqli_connect_errno($con)) {
  $result = "conn prob: " . mysqli_connect_error($con);
}

$userid         = mysqli_real_escape_string($con, $_REQUEST['userid']);	 
$first_name     = mysqli_real_escape_string($con, $_REQUEST['ufirstname']);	 
$last_name      = mysqli_real_escape_string($con, $_REQUEST['ulastname']);	 
$sex            = mysqli_real_escape_string($con, $_REQUEST['ugender']);	 
$email          = mysqli_real_escape_string($con, $_REQUEST['emailId']);	 
//$country        = mysqli_real_escape_string($con, $_REQUEST['userid']);	 

if (!isset($_REQUEST["userid"]))
{
$email = NULL;
}
//if(mysqli_query($con,"INSERT INTO  mastermathtest.bande( fbid , fname, lname, gender, email, candies, maxscore, country, maxlevel) VALUES ( '$userid' , '$first_name', '$last_name, '$sex', '$email', '0', '0','$country','0'  )"))
if(mysqli_query($con,"INSERT INTO  mastermathtest.bande( fbid , fname, lname, gender, email, candies, maxscore, maxlevel) VALUES ( '$userid' , '$first_name', '$last_name', '$sex', '$email', '0', '0','0'  )"))
{
$data = "welcome first time user";
}
else if(mysqli_errno($con) == 1062) {

//$data = "Welcome back ";

  $result = mysqli_query($con,"SELECT fbid,candies,maxscore FROM mastermathtest.bande WHERE fbid='$userid'");
 //if(mysqli_query($result))
 //{
  while($row = mysqli_fetch_array($result)) {
  $data = "Welcome back ".$row['fbid']."#".$row['candies']."#".$row['maxscore'];
  echo $data;
  exit;}
 // } 
  /* else
  {
  $data = "query error inside if".mysqli_error($con);
  } */
}
else{
$data = "query error: ".mysqli_error($con);
} 
//$data = "working"; 
//$data = $userid."<>".$first_name."<>".$last_name."<>".$sex."<>".$email."<>".$country; 

}
else
{
$data="isset not working";
}
echo $data;

?>
