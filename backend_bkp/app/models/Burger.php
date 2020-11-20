<?php

namespace App\Models;

class Burger extends Crud
{
    protected static $tableName = 'burgers';

    private $id;
    private $name;
    private $value;

    public function __construct()
    {
        parent::__construct(static::$tableName);
    }

    public function store()
    {
        $query = "INSERT INTO " .static::$tableName. "(name, value) VALUES ('".$this->getName()."', ".$this->getValue().");";

        return static::$connection->query($query);
    }

    public function delete()
    {
        $query = "DELETE FROM ".static::$tableName." WHERE id=".$this->getId();

        return static::$connection->query($query);
    }

    public function update()
    {
        $tableName = static::$tableName;
        $name = $this->getName();
        $value = $this->getValue();
        $id = $this->getId();

        $query = "UPDATE $tableName SET name = '$name', value = '$value' WHERE id=$id";

        return static::$connection->query($query);
    }

    public static function all()
    {
        $burgers = [];
        $query = "SELECT * FROM burgers";
        $result = static::$connection->query($query);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()){
                array_push($burgers,$row);
            }
        }

        return $burgers;
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

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getValue()
    {
        return $this->value;
    }

    public function setValue($value)
    {
        $this->value = $value;

        return $this;
    }

}
