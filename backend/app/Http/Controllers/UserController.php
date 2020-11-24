<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController
{
    public function index()
    {
        $users = DB::select("SELECT id, first_name, last_name, email FROM users");

        return $users;
    }

    public function store()
    {
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];

        $inserted = DB::insert("INSERT INTO users (first_name, last_name, email) VALUES('$first_name' , '$last_name', '$email')");

        return 'Üdv a fedélzeten: '. $first_name;
    }

    public function show($id)
    {
        $selected = DB::select("SELECT first_name, last_name, email FROM users WHERE id=$id");

        return $selected;
    }

    public function destroy($id)
    {
        $deleted = DB::delete("DELETE FROM users WHERE id = $id");

        return $deleted;
    }

    public function update($id)
    {
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];

        $updated = DB::update("UPDATE users SET first_name='$first_name', last_name='$last_name', email='$email' WHERE id=$id");

        return $updated;
    }
}
