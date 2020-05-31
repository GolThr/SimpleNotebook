<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$title = $_POST["title"];
$content = $_POST["content"];
$finish_time = $_POST["finish_time"];

$sql="INSERT INTO todos (user_id,title,content,finish_time) VALUES ('$user_id','$title','$content','$finish_time')";
$obj=mysqli_query($link,$sql);
if($obj){
    $array = array('successful'=>'1');
}else{
    $array = array('successful'=>'0');
}
echo json_encode($array);