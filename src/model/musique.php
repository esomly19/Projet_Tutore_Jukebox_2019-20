<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class musique extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
    protected $table = "musique";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['titre', 'genre', 'description', 'studio', 'album', 'artiste','chemin','ig_image'];

    public function Playlist() {
        return $this->belongsToMany('app\models\Playlist');
    }
}