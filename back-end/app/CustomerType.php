<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CustomerType extends Model
{
    public $table = "mst_customer_type";
    protected $fillable = ['customer_type'];

    /**
     * Relationship between mst_customer_type and mst_service
     *
     * @return array
     */
    public function services()
    {
        return $this->hasMany('App\Service', 'customer_type_id', 'id');
    }

    /**
     * Get customer_type field by id from table mst_customer_type
     *
     * @param  mixed $id
     *
     * @return string
     */
    public function getTypeById($id)
    {
        return CustomerType::find($id)->get('customer_type');
    }

    /**
     *  Get list of records  from table mst_customer_type
     *
     * @return collection
     */
    public function getAllCustomerType()
    {
        return CustomerType::all();
    }
}

