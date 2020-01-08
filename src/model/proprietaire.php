<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class proprietaire extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
    protected $table = "proprietaire";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['nom', 'prenom', 'telephone', 'mail', 'adresse'];

}