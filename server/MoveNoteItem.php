<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$note_id = $_POST["note_id"];
$book_id = $_POST["book_id"];

$sql="UPDATE notes SET book_id='$book_id' WHERE user_id='$user_id' AND note_id='$note_id'";
$obj=mysqli_query($link,$sql);
if($obj){
    $array = array('successful'=>'1');
}else{
    $array = array('successful'=>'0');
}
echo json_encode($array);