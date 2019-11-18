<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    protected $table = "maker";
    protected $fillable = ['shop_id', 'maker_name', 'maker_code', 'tel', 'zipcode', 'pref_id', 'ward', 'addr1', 'addr2'];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Relationship between shop and producer
     *
     * @return void
     */
    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }

    /**
     * Relationship between  pref and producer
     *  
     * @return void
     */
    public function pref()
    {
        return $this->belongsTo('App\Pref', 'pref_id', 'id');
    }

    /**
     * Get list of producer 
     *
     * @param integer $per_page
     * @return void
     */
    public function getAll($per_page)
    {
        return Producer::where('status', 1)->paginate($per_page);
    }

    /**
     * Get one producer by id 
     *
     * @param [type] $id
     * @return void
     */
    public function getProducerById($id)
    {
        return Producer::where('status', 1)->where('id', $id)->first();
    }

    /**
     * Update producer by id
     *
     * @param [type] $id
     * @param [type] $request
     * @return void
     */
    public function updateProducer($id, $request)
    {
        return Producer::where('status', 1)->where('id', $id)->update($request->all());
    }

    /**
     * Add one producer by id
     *
     * @param [type] $request
     * @return void
     */
    public function addProducer($request)
    {
        return Producer::create($request->all());
    }

    /**
     * Soft delete one producer 
     *
     * @param [type] $id
     * @return void
     */
    public function deleteProducer($id)
    {
        return (Producer::where('status', 1)->where('id', $id)->update(['status' => 0]));
    }

    /**
     * Get max producer code
     *
     * @return void
     */
    public function getMaxProducerCode()
    {
        return Producer::max('maker_code');
    }
}

