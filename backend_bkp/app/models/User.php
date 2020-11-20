<?php

namespace App\Models;

class User extends Crud
{
    protected static $tableName = 'users';

    private $id;
    private $first_name;
    private $last_name;
    private $email;
    private $googleToken;

    public function __construct()
    {
        parent::__construct(static::$tableName);
    }

    public static function index()
    {
        $tableName = static::$tableName;
        $query = "SELECT * FROM $tableName";

        $result = parent::makeConnection()->query($query);

        $rows = [];

        while ($row = $result->fetch_assoc()) {
            $user = new User();
            $user->setId($row['id']);
            $rows[] = $row;
        }
        return $rows;
    }

    public function store()
    {
        $tableName = static::$tableName;
        $first_name = $this->getfirst_name();
        $last_name = $this->getlast_name();

        $query = "INSERT INTO $tableName (first_name, last_name) VALUES ('$first_name', '$last_name')";

        return static::$connection->query($query);
    }

    public function delete()
    {
        $tableName = static::$tableName;
        $id = $this->getId();
        $query = "DELETE FROM $tableName WHERE id=$id";
        return static::$connection->query($query);
    }

    public function update()
    {
        $tableName = static::$tableName;
        $first_name = $this->getfirst_name();
        $last_name = $this->getlast_name();
        $id = $this->getId();

        $query = "UPDATE $tableName SET first_name = '$first_name', last_name ='$last_name' WHERE id=$id";

        return static::$connection->query($query);
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }
    public function getfirst_name()
    {
        return $this->first_name;
    }

    public function setfirst_name($first_name)
    {
        $this->first_name = $first_name;
    }

    public function getlast_name()
    {
        return $this->last_name;
    }

    public function setlast_name($last_name)
    {
        $this->last_name = $last_name;
    }
    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getgoogle_token()
    {
        return $this->googleToken;
    }

    public function setgoogle_token($googleToken)
    {
        $this->googleToken = $googleToken;
    }
}




