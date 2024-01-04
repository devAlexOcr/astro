<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    header('Content-Type: application/json');

    error_reporting(E_ALL);
    ini_set('display_errors', 1);


    require "./middleware/.DbConnect.php";

    $request = $_SERVER['REQUEST_URI'];

    $viewDir = "/api/";

        switch ($request) {
            case '/add':
                    require __DIR__ . $viewDir . '.add.php';
                break;
            case '/get':
                    require __DIR__ . $viewDir . '.getMessier.php';
                break;
            case '/login':
                    require __DIR__ . $viewDir . '.users.php';
                break;
            default:
                    http_response_code(204); require __DIR__ . $viewDir . '.404.php';
                break;
        }