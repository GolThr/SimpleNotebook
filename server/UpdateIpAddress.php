<?php
include("dbconfig.php");

$intranetIp = $_POST["intranet_ip"];
$extranetIp = $_POST["extranet_ip"];

$sql="UPDATE ip_address SET intranet_ip='$intranetIp',extranet_ip='$extranetIp' WHERE id='SERVER_HOME'";
$obj=mysqli_query($link,$sql);
$array = array('a'=>1);
echo json_encode($array);