<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShopResources extends JsonResource
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
            'id'            => $this->id,
            'shop_code'     => $this->shop_code,
            'shop_name'     => $this->shop_name,
            'color'         => $this->color,
            'tel'           => $this->tel,
            'address'       => $this->pref['name'].$this->ward . $this->addr2,
            'zipcode'       => $this->zipcode,
            'city'          => $this->pref['name'],
            'employees'     => $this->staff->count(),
            'ward'          => $this->ward,  //district
            'addr1'         => $this->addr1,  //town
            'addr2 '        => $this->addr2,  //detailed_add
            'register_price'        => $this->register_price,
            'second_register_price' => $this->second_register_price,
            'other_shop_entry_fee'  => $this->other_shop_entry_fee,
            'created_date'  => $this->created_date
        ];
    }
}
