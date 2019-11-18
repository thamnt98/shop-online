<?php

namespace App\Http\Resources\Staff;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffsResource extends JsonResource
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
                    'name' => $this->name,
                    'tel' => $this->tel,
                    'address' => $this->ward . ' ' . $this->addr1 . ' ' . $this->addr2,
                    'username' => $this->username,
                    'lastLoginTime' => $this->last_login_time,
                    'created_date' => $this->created_date
                ]
            ]
        ];
    }
}

