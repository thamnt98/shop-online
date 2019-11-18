<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Pref;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shop extends Model
{
    protected $table = 'shop';
    protected $fillable = [
        'id', 'shop_code', 'shop_name', 'color', 'tel', 'zipcode','pref_id', 'status',
        'ward', 'addr1', 'addr2', 'register_price', 'second_register_price', 'other_shop_entry_fee', 'created_date', 'update_date'
    ];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';


    public $primaryKey = 'id';

    /**
     * Relationship between staff
     *
     * @return App\Staff
     */
    public function staff()
    {
        return $this->hasMany('App\Staff','shop_id', 'id');
    }

    /**
     * Relationship between pref
     *
     * @return App\Pref
     */
    public function pref()
    {
        return $this->belongsTo('App\Pref', 'pref_id', 'id');
    }
    public function services()
    {
        return $this->hasMany('App\Service', 'shop_id', 'id');
    }

    /**
     * Relationship between producer and shop
     *
     * @return void
     */
    public function producers()
    {
        return $this->hasMany('App\Producer');
    }

    public function getShopById($id)
    {
        return  Shop::find($id)->get('shop_name');
    }

    public function getAllShop()
    {
        return Shop::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return App\Shop::paginate
     */
    public function getIndex($per_page = 1)
    {
        $per_page = $per_page;
        return Shop::where('status', 1)->orderBy('shop_name', 'asc')->paginate($per_page);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getShow( $id)
    {
        $shop =  Shop::find($id);
        if($shop->status!=0){
            return $shop;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return App\Shop
     */
    public function addShop($request)
    {
        $shop = New Shop();
        $shop ->shop_code = $request['shop_code'];
        $shop ->shop_name = $request['shop_name'];
        $shop ->tel = $request['tel'];
        $shop ->zipcode = $request['zipcode'];
        $shop ->ward = $request['ward'];
        $shop ->addr1 = $request['addr1'];
        $shop ->addr2 = $request['addr2'];
        $shop ->register_price = $request['register_price'];
        $shop ->second_register_price = $request['second_register_price'];
        $shop ->other_shop_entry_fee = $request['other_shop_entry_fee'];
        $pref_id = Pref::where('name', $request['city'])->get('id');
        $shop ->pref_id = $pref_id[0]['id'];
        $shop->save();
        return $shop;

    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return App\Shop
     */
    public function updateShop($id, $request)
    {
        $shop =  Shop::find($id);
        $shop ->shop_code = $request['shop_code'];
        $shop ->shop_name = $request['shop_name'];
        $shop ->tel = $request['tel'];
        $shop ->zipcode = $request['zipcode'];
        $shop ->ward = $request['ward'];
        $shop ->addr1 = $request['addr1'];
        $shop ->addr2 = $request['addr2'];
        $shop ->register_price = $request['register_price'];
        $shop ->second_register_price = $request['second_register_price'];
        $shop ->other_shop_entry_fee = $request['other_shop_entry_fee'];
        $pref_id = Pref::where('name', $request['city'])->get('id');
        $shop ->pref_id = $pref_id[0]['id'];
        $shop->save();
        return $shop;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return boolean
     */
    public function deleteShop($id)
    {
        $shop =  Shop::find($id);
        if($shop->status==1){
            $shop->status = 0;
            $shop->save();
            return true;
        }
        return false;
    }

    public function mstRentals(){
        $this->hasMany('App\MstRental');
    }

    /**
     * Get Shop
     *
     * @param int $id
     * @return void
     */
    public function getShop($id){
        return Shop::find($id);
    }

    /**
     * Get shop dropdown
     *
     * @return void
     */
    public function getShopDropDown(){
        return Shop::select('id', 'shop_name')->distinct()->orderBy('id')->get();
    }
}

