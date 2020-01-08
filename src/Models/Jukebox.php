<?php

namespace app\models;


class Jukebox extends \Illuminate\Database\Eloquent\Model
{
   
    protected $table = "jukebox";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['id_etablissement', 'id_playlist', 'nom', 'date_creation', 'etat'];

    public function Etablissement() {
        return $this->belongsTo('app\models\Etablissement');
    }

    public function Playlist() {
        return $this->belongsTo('app\models\Playlist');
    }

}