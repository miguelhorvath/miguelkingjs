<?php

namespace App\Models\Interfaces;

interface CrudInterface
{

    public static function index();

    public function show($id);

    public function store();

    public function update();

    public function delete();

}
