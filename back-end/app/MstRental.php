<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MstRental extends Model
{
    protected $table = 'mst_rental';

    protected $fillable = ['shop_id', 'retal_name', 'retal_description', 'fee', 'created_date', 'updated_date'];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    public function shop()
    {
        return $this->belongsTo('App\Shop');
    }

    /**
     * Get data for rental
     *
     * @param  $shopId, $perpage
     * @return  Mts_rental
     */
    public function getRentals($shopId, $perPage)
    {
        return MstRental::whereRaw('shop_id = ' . $shopId . ' and status != 0')->paginate($perPage);
    }

    /**
     * Get a rental
     *
     * @param  $renatalId
     * @return  Mts_rental
     */
    public function getRental($rentalId)
    {
        return MstRental::whereRaw('id = ' . $rentalId . ' and status != 0')->first();
    }

    /**
     * Create rental
     *
     * @param  Illuminate\Http\Request
     * @return  null
     */
    public function createRental($request)
    {

        return MstRental::create([
            'shop_id' => $request->shop_id,
            'retal_name' => $request->rental_name,
            'retal_description' => $request->rental_description,
            'fee' => $request->fee,
            'created_date' => now(),
            'updated_date' => now(),
        ]);
    }

    /**
     * Update rental
     *
     * @param  $rentalId, Illuminate\Http\Request
     * @return  null
     */
    public function updateRental($rentalId, $request)
    {
        MstRental::where('id', $rentalId)
            ->update([
                'shop_id' => $request->shop_id,
                'retal_name' => $request->rental_name,
                'retal_description' => $request->rental_description,
                'fee' => $request->fee,
                'updated_date' => now(),
            ]);
    }

    /**
     * Delete rental
     *
     * @param  $idRental
     * @return  null
     */
    public function softDeleteRental($idRental)
    {
        DB::table('mst_rental')->where('id', $idRental)->update(['status' => 0]);
    }

    /**
     * Check rental name is exist
     *
     * @param  $rentalName, $shopId
     * @return  bool
     */
    public function checkRentalNameIsExist($rentalName, $shopId)
    {
        return MstRental::where([
            ['retal_name', $rentalName],
            ['status', 1],
            ['shop_id', $shopId],
        ])->doesntExist();
    }

    /**
     * Check rental name is exist ignore current rental
     *
     * @param  $rentalName, $shopId, $rentalId
     * @return  bool
     */
    public function checkRentalNameIsExistIgnore($rentalName, $shopId, $rentalId)
    {
        return MstRental::where('status', 1)
            ->where('shop_id', $shopId)
            ->where('id', '!=', $rentalId)
            ->where('retal_name', $rentalName)
            ->doesntExist();
    }
}

