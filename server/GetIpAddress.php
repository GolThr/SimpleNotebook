<?php
include("dbconfig.php");

$sql="SELECT * FROM ip_address WHERE id='SERVER_HOME'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    $jsonStr = array('intranet_ip'=>$arr['intranet_ip'],'extranet_ip'=>$arr['extranet_ip']);
    echo json_encode($jsonStr);
}