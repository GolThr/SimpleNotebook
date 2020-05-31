<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$todo_id = $_POST["todo_id"];

$sql="SELECT * FROM todos WHERE user_id='$user_id' AND todo_id='$todo_id'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    if($arr){
        $jsonStr = array('successful'=>'1', 'todo_id'=>$arr['todo_id'], 'title'=>$arr['title'], 'content'=>$arr['content'], 'date'=>$arr['date'], 'finish_time'=>$arr['finish_time']);
    }else{
        $jsonStr = array('successful'=>'0');
    }
}else{
    $jsonStr = array('successful'=>'-1');
}
echo json_encode($jsonStr);