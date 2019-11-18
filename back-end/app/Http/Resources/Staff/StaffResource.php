<?php

namespace App\Http\Resources\Staff;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => [
                'type' => 'staff',
                'id' => $this->id,
                'attributes' => [
                    'shopName' => $this->shop_name,
                    'shop' => $this->shop_id,
                    'cityName' => $this->pref_name,
                    'city' => $this->pref_id,
                    'name' => $this->name,
                    'username' => $this->username,
                    'parttime' => $this->is_parttime,
                    'tel' => $this->tel,
                    'zipcode' => $this->zipcode,
                    'ward' => $this->ward,
                    'addr1' => $this->addr1,
                    'addr2' => $this->addr2,
                    'username' => $this->username,
                    'lastLoginTime' => $this->last_login_time,
                    'created_date' => $this->created_date,
                    'updated_date' => $this->updated_date
                ]
            ]
        ];
    }
}

