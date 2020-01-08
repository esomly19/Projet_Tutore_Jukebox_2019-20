<?php

namespace app\models;
use Illuminate\Database\Eloquent\SoftDeletes;

class playlist extends \Illuminate\Database\Eloquent\Model
{
    use SoftDeletes;
    protected $table = "playlist";
    protected $primaryKey = "id";
    public $timestamps = false;
    protected $fillable = ['titre', 'id_proprietaire','nom', 'adresse'];

}