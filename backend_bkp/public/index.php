<?php

header("Access-Control-Allow-Origin: *");

$loader = require '../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable('../');
$dotenv->load();

$router = new \Bramus\Router\Router();

$router->mount('/api', function () use ($router){
    //Burger routok
    $router->get('/burgers', '\App\Controllers\BurgerController@index');
    $router->get('/burgers/create', '\App\Controllers\BurgerController@create');
    $router->post('/burgers', '\App\Controllers\BurgerController@store');
    $router->get('/burgers/{id}/edit', '\App\Controllers\BurgerController@show');
    $router->post('/burgers/{id}/update', '\App\Controllers\BurgerController@update');
    $router->post('/burgers/{id}/delete', '\App\Controllers\BurgerController@delete');
    //User routok
    $router->get('/users', 'App\Controllers\UserController@index');
    $router->get('/users/create', 'App\Controllers\UserController@create');
    $router->post('/users', '\App\Controllers\UserController@store');
    $router->get('/users/{id}/edit', '\App\Controllers\UserController@show');
    $router->post('/users/{id}/update', '\App\Controllers\UserController@update');
    $router->post('/users/{id}/delete', '\App\Controllers\UserController@delete');

    $router->post('/login/verify', 'App\Controllers\AuthController@show');
});

$router->run();