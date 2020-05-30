<?php
include("dbconfig.php");

$user_id = $_POST["user_id"];
$book_id = $_POST["book_id"];

$sql="SELECT * FROM notes WHERE user_id='$user_id' AND book_id='$book_id'";
$obj=mysqli_query($link,$sql);
$jsonArray = array();
if($obj){
    $jsonStr = array('successful'=>'1');
    array_push($jsonArray, $jsonStr);
    $jsonStrArray = array();
    while($arr=mysqli_fetch_array($obj,MYSQLI_ASSOC)){
        $jsonStr = array('book_id'=>$arr['book_id'],'note_id'=>$arr['note_id'],'title'=>$arr['title'],'content'=>$arr['content']);
        array_push($jsonStrArray, $jsonStr);
    }
    array_push($jsonArray,$jsonStrArray);
}else{
    $jsonStr = array('successful'=>'-1');
    array_push($jsonArray, $jsonStr);
}
echo json_encode($jsonArray);