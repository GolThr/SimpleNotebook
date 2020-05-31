<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$todo_id = $_POST["todo_id"];

$sql="DELETE FROM todos WHERE user_id='$user_id' AND todo_id='$todo_id'";
$obj=mysqli_query($link,$sql);
if($obj){
    $array = array('successful'=>'1');
}else{
    $array = array('successful'=>'0');
}
echo json_encode($array);