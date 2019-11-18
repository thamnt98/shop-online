<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pref extends Model
{
    protected $table = 'pref';
    protected $fillable = [
        'id', 'name'
    ];

    /**
     * Relationship
     *
     * @return App\Shop
     */
    public function shop()
    {
        return $this->hasMany('App\Shop', 'pref_id', 'id');
    }

    /**
     * Relationship between pref and zip code
     *
     * @return void
     */
    public function zipcodes()
    {
        return $this->hasMany('App\ZipCode');
    }

    /**
     * Display a listing of the resource.
     *
     * @return App\Pref
     */
    public function getAllPref()
    {
        return Pref::all();
    }

    /**
     *  Get Pref by Id
     *
     * @param [type] $id
     * @return void
     */
    public function getPrefById($id)
    {
        return Pref::find($id);
    }

    /**
     * Relationship between producer and pref
     *
     * @return void
     */
    public function producers()
    {
        return $this->hasMany('App\Producer', 'pref_id', 'id');
    }
}

