<?php
$url = $_POST['url'];

// Result object
$r = new stdClass();
// Result content type
header('content-type: application/json');

$filename = 'text/' . sha1(@date('U')) . '.jpg';
$fp = fopen($filename, 'w');
fwrite($fp, base64_decode($url));
fclose($fp);

// LOG
$log = '=== ' . @date('Y-m-d H:i:s') . ' ===============================' . "\n"
        . 'text:' . $filename . "\n";
$fp = fopen('log.txt', 'a');
fwrite($fp, $log);
fclose($fp);

// File path
$path = str_replace('save_text.php', '', $_SERVER['SCRIPT_NAME']);
// Image tag
$r->filename = $filename;
$r->path = $path;
$r->img = '<img src="' . $path . $filename . '" alt="sign" />';
echo json_encode($r);
