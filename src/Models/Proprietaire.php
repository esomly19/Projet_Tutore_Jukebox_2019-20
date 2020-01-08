<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proprietaire extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
    protected $table = "proprietaire";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['nom', 'prenom', 'telephone', 'mail', 'adresse'];
   
    public function Etablissement() {
        return $this->hasMany('app\models\Musique');
    }
}