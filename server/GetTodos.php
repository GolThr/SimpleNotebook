<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];

$sql="SELECT * FROM todos WHERE user_id='$user_id'";
$obj=mysqli_query($link,$sql);
$jsonArray = array();
if($obj){
    $jsonStr = array('successful'=>'1');
    array_push($jsonArray, $jsonStr);
    $jsonStrArray = array();
    while($arr=mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $jsonStr = array('todo_id'=>$arr['todo_id'],'title'=>$arr['title'],'content'=>$arr['content'],'date'=>$arr['date'],'finish_time'=>$arr['finish_time'],'finished'=>$arr['finished']);
        array_push($jsonStrArray, $jsonStr);
    }
    array_push($jsonArray,$jsonStrArray);
}else{
    $jsonStr = array('successful'=>'-1');
    array_push($jsonArray, $jsonStr);
}
echo json_encode($jsonArray);