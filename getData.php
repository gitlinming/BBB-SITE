<?php
 // $data = array("name" => 'test_name',"content" => 'test_con');
 // $data = http_build_query($data);
 $opts = array(
   'http'=>array(
     'method'=>"POST",
     'header'=>"Content-type: text/plain",
     'content' => '{"_method":"GET","_ApplicationId":"2qsKybPXJ61S4a0Mg4bFnqb3-gzGzoHsz","_ApplicationKey":"5r6kUUiCUQex97AL1L4sTjgT"}',
     'timeout'=>2*60,
   )
 );
 $cxContext = stream_context_create($opts);
 $sFile = file_get_contents("https://2qskybpx.api.lncld.net/1.1/classes/Products?limit=1000&skip=0&order=-createdAt", false, $cxContext);  
 echo $sFile;
?>