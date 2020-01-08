<?php

namespace app\models;


class Playlist extends \Illuminate\Database\Eloquent\Model
{
   
    protected $table = "playlist";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['nom', 'description', 'auteur'];

    public function Musique() {
        return $this->belongsToMany('app\models\Musique');
    }

    public function jukebox() {
        return $this->hasMany('app\models\Musique');
    }
    
}