<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$note_id = $_POST["note_id"];

$sql="SELECT * FROM notes WHERE user_id='$user_id' AND note_id='$note_id'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($arr){
        $jsonStr = array('successful'=>'1', 'note_id'=>$arr['note_id'], 'title'=>$arr['title'], 'content'=>$arr['content']);
    }else{
        $jsonStr = array('successful'=>'0');
    }
}else{
    $jsonStr = array('successful'=>'-1');
}
echo json_encode($jsonStr);