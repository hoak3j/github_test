<?php
//$filename   = addslashes($_GET['fn']).".pdf";
//$filepath   = '/data/'.$filename;
//
//$filesize   = filesize( $filepath );
//$path_parts = pathinfo( $filepath );
//$filename   = $path_parts['basename'];
//$extension  = $path_parts['extension'];
//
//
//header( "Pragma: public" );
//header( "Expires: 0" );
//header("Content-type:application/pdf");
//header( "Content-Disposition: attachment; filename=".$filename);
//header( "Content-Transfer-Encoding: binary" );
////header( "Content-Length: $filesize" );
//
//ob_clean();
//flush();
//readfile( $filepath );



$filename   = addslashes($_GET['fn']).".pdf";
$filepath   = $_SERVER['DOCUMENT_ROOT']."/data/".$filename;
$filesize = filesize($filepath);


if(file_exists($filepath)){
    header("Content-Type:application/octet-stream");
    header("Content-Disposition:attachment;filename=$filename");
    header("Content-Transfer-Encoding:binary");
    header("Content-Length:".filesize($filesize));
    header("Cache-Control:cache,must-revalidate");
    header("Pragma:no-cache");
    header("Expires:0");
    if(is_file($filepath)){
        ob_clean();
        $fp = fopen($filepath,"r");
        while(!feof($fp)){
            $buf = fread($fp,8096);
            $read = strlen($buf);
            print($buf);
            flush();
        }
        fclose($fp);
    }
} else{
    ?><script>alert("존재하지 않는 파일입니다.")</script><?
}
