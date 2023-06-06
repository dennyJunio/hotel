<?php

function dd($parametro = [])
{
    echo "<pre>";
    print_r($parametro);
    echo "</pre><br><pre>";
    print_r($_POST);
    echo "<pre>";
    exit;
}
?>