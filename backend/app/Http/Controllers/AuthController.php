<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
   public function check(Request $request)
   {
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $googleToken = $request->input('google_token');
        $email = $request->input('email');

        $user = DB::select("SELECT * FROM users WHERE email='$email'");

        foreach($user as $data){
            $dbEmail = $data->email;
            if($dbEmail == $email){
                
            }
        }

        if(count($user)>0){
            echo 'A User létezik az adatbázisban';
        } else {
            echo 'A User nem létezik az adatbázisban';
            $user = DB::insert("
            INSERT INTO users (first_name, last_name, google_token, email) 
            VALUES('$first_name' , '$last_name', '$googleToken', '$email')");
        }
    }
}
