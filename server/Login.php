<?php
include("dbconfig.php");

$email = $_POST["username"];
$pwd = $_POST["pwd"];

$sql="SELECT * FROM usersinfo WHERE email='$email'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($arr){
        if($pwd == $arr['password']){
            $jsonStr = array('successful'=>'1', 'nickname'=>$arr['nickname']);
        }else{
            $jsonStr = array('successful'=>'0');
        }
    }else{
        $jsonStr = array('successful'=>'-1');
    }
}else{
    $jsonStr = array('successful'=>'-1');
}
echo json_encode($jsonStr);