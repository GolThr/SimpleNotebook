<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$note_id = $_POST["note_id"];
$m_title = $_POST["m_title"];
$m_content = $_POST["m_content"];

$sql="UPDATE notes SET title='$m_title',content='$m_content' WHERE user_id='$user_id' AND note_id='$note_id'";
$obj=mysqli_query($link,$sql);
$array = array('successful'=>'1');
echo json_encode($array);