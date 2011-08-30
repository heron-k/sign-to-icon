<?php

// Maximum file size
$maxsize = 1024; //Kb
// Supporting image file types
$types = Array('image/png', 'image/gif', 'image/jpeg');

$headers = getallheaders();

// LOG
$log = '=== ' . @date('Y-m-d H:i:s') . ' ===============================' . "\n"
        . 'HEADERS:' . print_r($headers, 1) . "\n";
$fp = fopen('log.txt', 'a');
fwrite($fp, $log);
fclose($fp);

// Result object
$r = new stdClass();
// Result content type
header('content-type: application/json');

// File size control
if ($headers['x-file-size'] > ($maxsize * 1024)) {
    $r->error = "Max file size: $maxsize Kb";
}

$folder = $headers['x-param-folder'] ? $headers['x-param-folder'] . '/' : '';
if ($folder && !is_dir($folder))
    mkdir($folder);

// File type control
if (in_array($headers['x-file-type'], $types)) {
    // Create an unique file name    
    if ($headers['x-param-value']) {
        $filename = $folder . $headers['x-param-value'];
    } else {
        $filename = $folder . sha1(@date('U') . '-' . $headers['x-file-name'])
                . '.' . $headers['x-param-type'];
    }
    // Uploaded file source
    $source = file_get_contents('php://input');
    file_put_contents($filename, $source);
} else
    $r->error = "Unsupported file type: " . $headers['x-file-type'];

// File path
$path = str_replace('upload.php', '', $_SERVER['SCRIPT_NAME']);
// Image tag
$r->filename = $filename;
$r->path = $path;
$r->img = '<img src="' . $path . $filename . '" alt="image" />';
echo json_encode($r);
