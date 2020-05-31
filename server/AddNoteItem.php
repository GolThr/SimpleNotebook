<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$book_id = $_POST["book_id"];
$title = $_POST["title"];
$content = $_POST["content"];

$sql="INSERT INTO notes (user_id,title,content,book_id) VALUES ('$user_id','$title','$content','$book_id')";
$obj=mysqli_query($link,$sql);
if($obj){
    $array = array('successful'=>'1');
}else{
    $array = array('successful'=>'0');
}
echo json_encode($array);