<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class jukebox extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
    protected $table = "jukebox";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['id_etablissement', 'id_playlist', 'nom', 'date_creation', 'etat'];

}