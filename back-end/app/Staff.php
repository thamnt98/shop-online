<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    protected $table = 'staff';
    protected $fillable = [
        'username', 'name', 'password', 'shop_id', 'is_parttime', 'tel', 'zipcode', 'pref_id', 'ward', 'addr1', 'addr2', 'status', 'last_login_time', 'created_date', 'updated_date',
    ];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Relationship between shop
     *
     * @return App\Pref
     */
    public function shops()
    {
        return $this->belongsTo('App\Shop', 'id_store');
    }

    /**
     * Get data for staff
     *
     * @param  $perpage
     * @return  Staff
     */
    public function getStaffs($perPage)
    {
        return Staff::join('shop', 'shop_id', '=', 'shop.id')
            ->leftJoin('pref', 'staff.pref_id', '=', 'pref.id')
            ->where('staff.status', '!=', 0)
            ->where('shop.status', '!=', 0)
            ->select(
                'staff.id',
                'shop.shop_name',
                'staff.name',
                'staff.tel',
                'staff.ward',
                'staff.addr1',
                'staff.addr2',
                'staff.username',
                'staff.last_login_time',
                'staff.created_date'
            )
            ->orderBy('created_date', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get a staff
     *
     * @param  $id of staff
     * @return  Staff
     */
    public function getStaff($id)
    {
        return Staff::join('shop', 'shop_id', '=', 'shop.id')
            ->leftJoin('pref', 'staff.pref_id', '=', 'pref.id')
            ->where('staff.status', '!=', 0)
            ->where('shop.status', '!=', 0)
            ->where('staff.id', $id)
            ->select('staff.id', 'shop.shop_name', 'staff.shop_id', 'pref.name as pref_name', 'staff.pref_id', 'staff.name', 'staff.username', 'is_parttime', 'staff.tel', 'staff.zipcode', 'staff.ward' , 'staff.addr1' , 'staff.addr2', 'staff.last_login_time', 'staff.created_date', 'staff.updated_date')
            ->first();
    }

    /**
     * Create staff
     *
     * @param  Illuminate\Http\Request
     * @return  null
     */
    public function createStaff($request)
    {
        return Staff::create([
            'username' => $request->username,
            'name' => $request->name,
            'password' => md5($request->password),
            'shop_id' => $request->shop_id,
            'is_parttime' => $request->is_parttime ? 1 : 0,
            'tel' => $request->tel,
            'zipcode' => $request->zipcode,
            'pref_id' => $request->pref_id,
            'ward' => $request->ward,
            'addr1' => $request->addr1,
            'addr2' => $request->addr2,
            'created_date' => now(),
            'updated_date' => now(),
        ]);
    }

    /**
     * Update staff
     *
     * @param  $id, Illuminate\Http\Request
     * @return  null
     */
    public function updateStaff($id, $request)
    {
        Staff::where('id', $id)
            ->update([
                'username' => $request->username,
                'name' => $request->name,
                'password' => md5($request->password),
                'shop_id' => $request->shop_id,
                'is_parttime' => $request->is_parttime ? 1 : 0,
                'tel' => $request->tel,
                'zipcode' => $request->zipcode,
                'pref_id' => $request->pref_id,
                'ward' => $request->ward,
                'addr1' => $request->addr1,
                'addr2' => $request->addr2,
                'updated_date' => now(),
            ]);
    }

    /**
     * Delete staff
     *
     * @param  $id of staff
     * @return  null
     */
    public function softDeleteStaff($id)
    {
        Staff::where('id', $id)->update(['status' => 0]);
    }

    /**
     * Change password of staff
     *
     * @param $id of staff,  password
     * @return  null
     */
    public function changePasswordStaff($id, $password)
    {
        Staff::where('id', $id)->update(['password' => md5($password)]);
    }
}

