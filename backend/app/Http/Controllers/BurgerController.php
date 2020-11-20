<?php

namespace App\Http\Controllers;

use App\Models\Burger;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class BurgerController extends BaseController
{
    public function index()
    {
        $burgers = DB::select("SELECT * FROM burgers");

        return $burgers;
    }

    public function store()
    {
        $name = $_POST['name'];
        $value = $_POST['value'];

        $inserted = DB::insert("INSERT INTO burgers (name, value) VALUES('$name' , '$value')");

        return $name.' nevű burger hozzáadva';
    }

    public function show($id)
    {
        $selected = DB::select("SELECT * FROM burgers WHERE id=$id");

        return $selected;
    }

    public function destroy($id)
    {
        $deleted = DB::delete("DELETE FROM burgers WHERE id = $id");

        return $deleted;
    }

    public function update($id)
    {
        $name = $_POST['name'];
        $value = $_POST['value'];

        $updated = DB::update("UPDATE burgers SET name='$name', value='$value' WHERE id=$id");

        return $updated;
    }
}
