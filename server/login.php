<?php
include("dbconfig.php");

$email = $_POST["username"];
$pwd = $_POST["pwd"];

$sql="SELECT * FROM usersinfo WHERE id='$email'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($pwd == $arr['password']){
        $jsonStr = array('success'=>'1');
    }else{
        $jsonStr = array('success'=>'0');
    }
}else{
    $jsonStr = array('success'=>'-1');
}
echo json_encode($jsonStr);