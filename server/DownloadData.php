<?php
include("dbconfig.php");

$sql="SELECT * FROM lottery WHERE id='8213'";
$obj=mysqli_query($link,$sql);
if($obj){
    $arr=mysqli_fetch_array($obj,MYSQLI_ASSOC);
    $jsonStr = array('mua_n'=>$arr['mua_n'],'hug_n'=>$arr['hug_n'],'has_recorded'=>$arr['has_recorded'],'left_times'=>$arr['left_times'],'award_1'=>$arr['award_1'],'award_2'=>$arr['award_2'],'award_3'=>$arr['award_3'],'award_4'=>$arr['award_4'],'award_5'=>$arr['award_5'],'award_6'=>$arr['award_6'],'award_7'=>$arr['award_7'],'award_8'=>$arr['award_8'],'award_9'=>$arr['award_9']);
    echo json_encode($jsonStr);
}