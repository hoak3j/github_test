<?php

$localfileaddr = "/uploads";
if(isset($_FILES["upload"])){

    $ext = ".".end((explode(".", $_FILES["upload"]["name"])));
    $filename="test";
    $file_public_addr =$localfileaddr.$filename.$ext;

    $success=move_uploaded_file($_FILES["upload"]["tmp_name"],SYS_EXT.$file_public_addr);
    if( $success){
        $json["uploaded"]=true;
        $json["url"]=$localfileaddr;
        json_encode($json);
    }
}

if(!$success){
    $json["uploaded"]=false;
    $json["error"]=array("message"=>"Error Uploaded");
    json_encode($json);
}
