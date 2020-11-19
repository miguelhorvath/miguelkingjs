<?php

namespace App\Models;

use App\Models\Interfaces\CrudInterface;

class Crud extends Database implements CrudInterface
{
    private $tableName;

    public function __construct($name)
    {
        parent::__construct();
        $this->tableName = $name;
    }

    public static function index()
    {

        $query = "SELECT * FROM " . static::$tableName;

        $result = parent::makeConnection()->query($query);

        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        return $rows;
    }

    public function find($id)
    {
        $query = "SELECT * FROM $this->tableName WHERE id='$id'";
        $result = static::$connection->query($query);

        if ($result->num_rows > 0) {
            $row = mysqli_fetch_assoc($result);
        } else {
            return NULL;
        }

        foreach ($row as $key => $value) {
            call_user_func([$this, 'set'.$key], $value);
        }
        return $this;
    }

    public function where($filters)
    {
        $query = '';

        foreach($filters as $key => $value) {
            $query .= $key . ' = "'. $value . '"';
            $query .= ' AND ';
        }

        $query .= ' 1 = 1';
        
        $query = "SELECT * FROM $this->tableName WHERE " . $query;
        $result = static::$connection->query($query);

        if ($result->num_rows > 0) {
            $row = mysqli_fetch_assoc($result);
        } else {
            return NULL;
        }

        foreach ($row as $key => $value) {
            call_user_func([$this, 'set'.$key], $value);
        }
        return $this;
    }

    public function show($id)
    {
        $query = "SELECT * FROM $this->tableName WHERE id='$id'";
        $result = static::$connection->query($query);

        if ($result->num_rows > 0) {
            $row = mysqli_fetch_assoc($result);
        } else {
            $row = NULL;
        }
        return $row;
    }

    public function store()
    {
        if (!empty($data)) {
            foreach ($data as $key => $value) {
                $query = "INSERT INTO $this->tableName ($key) VALUES ('$value')";
            }
            return static::$connection->query($query);
        }

        return false;
    }

    public function update()
    {
        if (!empty($data)) {
            foreach ($data as $key => $value) {
                $query = "UPDATE $this->tableName SET $key='$value' WHERE id='$this->getId()'";

                if($this->connection->query($query) == FALSE) {
                    die(var_dump($this->connection->error)) ;
                }
            }
        }
    }

    public function delete()
    {
        $query = "DELETE FROM $this->tableName WHERE id=$this->getId()";
        if(static::$connection->query($query) == FALSE){
            die(var_dump(static::$connection->error));
        } else {
            return $this;
        }
    }

    public function getTableName()
    {
        return $this->tableName;
    }

}
