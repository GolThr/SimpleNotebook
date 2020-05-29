<?php
include("dbconfig.php");

$toolId = $_POST["toolId"];

$sql="UPDATE tools SET tool_views=tool_views+1 WHERE tool_id='$toolId'";
$obj=mysqli_query($link,$sql);
$array = array('a'=>1);
echo json_encode($array);