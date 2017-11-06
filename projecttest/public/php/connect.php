<?php
$dat_host="localhost";
$username="root";
$pass="";
$datab_name="projecttest";
$con=mysqli_connect($dat_host,$username,$pass,$datab_name);
if(!$con)
{
	// this condition means that database is not available
echo"db not available";
}

?>