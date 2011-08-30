<?php
$src1 = parse_url($_POST['src1']);
$src2 = parse_url($_POST['src2']);
$left = $_POST['left'];
$top = $_POST['top'];
$sigma = $_POST['sigma'];
$fname = 'hybridimage/' . sha1(@date('U')) . '.jpg';

$command  = "./hybridimages";
$command .= " --sigma " . $sigma;
$command .= " --left " . $left;
$command .= " --top " . $top;
$command .= " --output " . $fname;
$command .= " " . substr($src1['path'], 1) . " " . substr($src2['path'], 1);

$log = '=== ' . @date('Y-m-d H:i:s') . ' ===============================\n'
     . '=== create hybrid image\n'
     . $command . '\n';
$fp = fopen('log.txt', 'a');
fwrite($fp, $log);
fclose($fp);

$r = new stdClass();

$ret = exec($command);

//$r->output = $fname;
$r->img = '<img src="' . $fname . '" alt="hybridimage" />';
//$r->log = $log;

header('content-type: application/json');
echo json_encode($r);
