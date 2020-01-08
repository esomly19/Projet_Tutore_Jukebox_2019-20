<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class playlist extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
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