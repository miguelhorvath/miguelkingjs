<?php

namespace App\Controllers;

use App\Models\User;

class AuthController
{

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

    public function show()
    {
        $user = new User();
        $user->where($_POST);
        
        $array = self::readObject($user);

        echo str_replace('\u0000\u0000','',json_encode($array));
    }
}

