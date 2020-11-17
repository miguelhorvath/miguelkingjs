<?php

namespace App\Controllers;

use App\Models\User;

class UserController
{
    public function index()
    {
        $users = User::index();
        echo json_encode($users);
    }

    public function store()
    {
        $user = new User();

        $user->setfirst_name($_POST['first_name']);
        $user->setlast_name($_POST['last_name']);

        $user->store();
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
        $user = new User();
        $user->find($id);
        
        $array = self::readObject($user);

        echo str_replace('\u0000\u0000','',json_encode($array));
    }

    public function delete($id)
    {
        $user = new User();
        $user->find($id);
        
        if(isset($user)){
            $user->delete();
            echo 'User sikeresen törölve';
        } else {
            echo 'Törlés sikertelen';
        }
    }

    public function update($id)
    {
        $user = new User();
        $user->find($id);
        $user->setfirst_name($_POST['first_name']);
        $user->setlast_name($_POST['last_name']);
        $user->update();
    }
}