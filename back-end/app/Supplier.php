<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Supplier extends Model
{
    protected $table = 'supplier';

    protected $fillable = ['shop_id', 'supplier_name', 'supplier_code',
         'tel', 'zipcode', 'pref_id', 'ward', 'addr1', 'addr2', 'created_date', 'updated_date'];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Get data of suppliers
     *
     * @param  null
     * @return  App\Supplier
     */
    public function getSuppliers($perPage){
        return DB::table('supplier')
            ->rightJoin('shop', 'supplier.shop_id','shop.id')
            ->leftJoin('pref', 'supplier.pref_id','pref.id')
            ->where([
                ['supplier.status', '!=', '0'],
                ['shop.status', '!=', '0']
            ])
            ->select('supplier.id', 'supplier.shop_id', 'supplier.supplier_name', 'supplier.supplier_code',
            'supplier.tel', 'supplier.zipcode', 'supplier.pref_id', 'supplier.ward', 'supplier.addr1',
            'supplier.addr2', 'supplier.created_date', 'supplier.updated_date',  
             'pref.name', 'shop.shop_name')
            ->get();
    }

    /**
     * Get data of supplier
     *
     * @param  $idSupplier is id of supplier
     * @return  App\Supplier
     */
    public function getSupplier($idSupplier){
        return DB::table('supplier')
            ->leftJoin('pref', 'supplier.pref_id','pref.id')
            ->join('shop', 'supplier.shop_id','shop.id')
            ->where([
                ['supplier.status', '!=', '0'],
                ['shop.status', '!=', '0'],
                ['supplier.id', $idSupplier]
            ])
            ->select('supplier.id', 'supplier.shop_id', 'supplier.supplier_name', 'supplier.supplier_code',
            'supplier.tel', 'supplier.zipcode', 'supplier.pref_id', 'supplier.ward', 'supplier.addr1',
            'supplier.addr2', 'supplier.created_date', 'supplier.updated_date',  
             'pref.name', 'shop.shop_name')
            ->first();
    }

    /**
     * Create a supplier
     *
     * @param  App\Http\Requests\SupplierRequest
     * @return  App\Supplier
     */
    public function createSupplier($request){
        return Supplier::create([
            'shop_id' => $request->shop_id,
            'supplier_name' => $request->supplier_name,
            'supplier_code' => $request->supplier_code,
            'tel' => $request->tel,
            'zipcode' => $request->zipcode,
            'pref_id' => $request->pref_id,
            'ward' => $request->ward,
            'addr1' => $request->addr1,
            'addr2' => $request->addr2
        ]);
    }

    /**
     * Update a supplier
     *
     * @param  $supplierId is id of supplier, App\Http\Requests\SupplierRequest
     * @return  null
     */
    public function updateSupplier($supplierId, $request)
    {
        Supplier::where('id', $supplierId)
            ->update([
                'shop_id' => $request->shop_id,
                'supplier_name' => $request->supplier_name,
                'supplier_code' => $request->supplier_code,
                'tel' => $request->tel,
                'zipcode' => $request->zipcode,
                'pref_id' => $request->pref_id,
                'ward' => $request->ward,
                'addr1' => $request->addr1,
                'addr2' => $request->addr2
            ]);
    }

    /**
     * Delete supplier
     *
     * @param  $id
     * @return  null
     */
    public function softDeleteSupplier($id)
    {
        Supplier::where('id', $id)->update(['status' => 0]);
    }

}

