<?php

header("Access-Control-Allow-Origin: *");

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->get('burgers', 'BurgerController@index');
    $router->post('burgers', 'BurgerController@store');
    $router->get('burgers/{id}', 'BurgerController@show');
    $router->put('burgers/{id}', 'BurgerController@update');
    $router->delete('burgers/{id}', 'BurgerController@destroy');

    $router->get('users', 'UserController@index');
    $router->post('users', 'UserController@store');
    $router->get('users/{id}', 'UserController@show');
    $router->put('users/{id}', 'UserController@update');
    $router->delete('users/{id}', 'UserController@destroy');

    $router->post('login/verify', 'AuthController@check');
});

