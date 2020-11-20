<?php

namespace App\Controllers;

use App\Models\Burger;

class BurgerController
{
    public function index()
    {
        $burgers = Burger::index();
        echo json_encode($burgers);
    }

    public function store()
    {
        $burger = new Burger();

        $burger->setName($_POST['name']);
        $burger->setValue($_POST['value']);

        $burger->store();
    }

    public static function readObject($object) {
        $name = get_class ($object);
        $name = str_replace('\\', "\\\\", $name); 
        
        $raw = (array)$object;
    
        $attributes = array();
        foreach ($raw as $attr => $val) {
            $attributes[preg_replace('('.$name.'|\*|)', '', $attr)] = $val;
        }
        return $attributes;
    }

    public function show($id)
    {
        $burger = new Burger();
        $burger->find($id);
        
        $array = self::readObject($burger);

        echo str_replace('\u0000\u0000','',json_encode($array));
    }

    public function delete($id)
    {
        $burger = new Burger();
        $burger->find($id);
        
        if(isset($burger)){
            $burger->delete();
            echo 'Szendvics sikeresen törölve';
        } else {
            echo 'Törlés sikertelen';
        }
    }

    public function update($id)
    {
        $burger = new Burger();
        $burger->find($id);
        $burger->setName($_POST['name']);
        $burger->setValue($_POST['value']);
        $burger->update();
        
    }
}

