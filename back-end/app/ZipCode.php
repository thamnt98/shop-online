<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ZipCode extends Model
{
    protected $table = "zipcode";
    protected $fillable = ['zipcode', 'pref_id', 'ward', 'addr1', 'addr2'];

    /**
     *  Relationship between pref and zip code
     *
     * @return void
     */
    public function pref()
    {
        return $this->belongsTo('App\Pref');
    }

    /**
     * Get one zip code by id 
     *
     * @param [type] $id
     * @return void
     */
    public function getZipCodeById($id)
    {
        return ZipCode::where('status', 1)->where('zipcode', $id)->first();
    }
}

