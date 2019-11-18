<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public $table = "mst_service";
    protected $fillable = ['shop_id', 'customer_type_id', 'service_name', 'service_descrption', 'fee', 'child_count'];
    public $timestamps = true;

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Relationship between shops and mst_service
     *
     * @return array
     */
    public function shops()
    {
        return $this->belongsTo('App\Shop', 'shop_id', 'id');
    }

    /**
     * Relationship between mst_customer_type and mst_service
     *
     * @return array
     */
    public function customerType()
    {
        return $this->belongsTo('App\CustomerType', 'customer_type_id', 'id');
    }

    /**
     * Get list of services from table mst_services
     *
     * @return Collection
     */
    public function getAll()
    {
        return Service::get();
    }

    /**
     * Get one service by id
     *
     * @param  mixed $id
     *
     * @return Service
     */
    public function getServiceById($id)
    {
        return (Service::where('status', 1)->where('id', $id)->first());
    }

    /**
     * Get list of servies by idShop
     *
     * @param  mixed $idShop
     *
     * @return Collection
     */

    public function getServiceByShop($idShop, $per_page)
    {
        return Shop::find($idShop)->services()->where('status', 1)->orderBy('service_name', 'asc')->paginate($per_page);
    }

    /**
     * Add one service
     *
     * @param  mixed $request
     *
     * @return Service
     */
    public function addService($request)
    {
        return Service::create($request->all());
    }

    /**
     * Update one service
     *
     * @param  mixed $id
     * @param  mixed $request
     *
     * @return Service
     **/
    public function updateService($id, $request)
    {
        return Service::where('status', 1)->where('id', $id)->update($request->all());
    }

    /**
     * Soft delete one service
     *
     * @param  mixed $id
     *
     * @return boolean
     */
    public function deleteService($id)
    {
        $service = Service::find($id);
        $service->status = 0;
        $service->save();
        return $service;
    }

    /**
     * Check service name exist when add new service
     *
     * @param [type] $serviceName
     * @param [type] $idShop
     * @return void
     */
    public function checkServiceNameExist($serviceName, $idShop)
    {
        return Service::where([
            ['service_name', $serviceName],
            ['status', 1],
            ['shop_id', $idShop],
        ])->doesntExist();
    }

    /**
     * Check service name exist when update one service
     *
     * @param [type] $serviceName
     * @param [type] $idService
     * @param [type] $idShop
     * @return void
     */
    public function  checkServiceNameIgnoreExist($serviceName, $idService, $idShop)
    {
        return Service::where('status', 1)
            ->where('shop_id', $idShop)
            ->where('id', '!=', $idService)
            ->where('service_name', $serviceName)
            ->doesntExist();
    }
}

