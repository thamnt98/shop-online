<?php

namespace App\Http\Resources\Producer;

use App\Producer;
use Illuminate\Http\Resources\Json\JsonResource;

class ProducersResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        if ($this->pref_id) {
            $pref = (Producer::find($this->id)->pref->name);
        } else {
            $pref = "";
        }
        return [
            'id' => $this->id,
            'makerCode' => $this->maker_code,
            'makerName' => $this->maker_name,
            'shopName' => Producer::find($this->id)->shop->shop_name,
            'phoneNumber' => $this->tel,
            'zipCode' => $this->zipcode,
            'address' => $pref . $this->ward . $this->addr1 . $this->addr2,
        ];
    }
}

