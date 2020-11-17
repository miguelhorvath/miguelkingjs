<?php

namespace App\Models;

use App\Models\Interfaces\CrudInterface;
use mysqli;

class Database
{
    protected static $connection;

    public function __construct()
    {
        static::$connection = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PWD'], $_ENV['DB_NAME']);
    }

    public static function makeConnection()
    {
        return static::$connection = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PWD'], $_ENV['DB_NAME']);
    }

}
