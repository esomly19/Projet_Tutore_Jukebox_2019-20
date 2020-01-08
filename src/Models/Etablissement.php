<?php

namespace App\models;


class Etablissement extends \Illuminate\Database\Eloquent\Model
{
    protected $table = "etablissement";
    protected $primaryKey = "id";
    public $timestamps = false;

    public function Proprietaire() {
        return $this->belongsTo('app\models\Proprietaire');
    }

    public function jukebox() {
        return $this->hasMany('app\models\Jukebox');
    }
}