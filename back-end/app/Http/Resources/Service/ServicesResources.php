<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Service;

class ServicesResources extends JsonResource
{

    /**
     * Transform the resource of services  into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'shop_id'=>$this->shop_id,
            'customer_type_id'=>$this->customer_type_id,
            'service_name' => $this->service_name,
            'type' => Service::find($this->id)->customerType->customer_type,
            'service_description' => $this->service_description,
            'fee' => $this->fee,
            'child_count' => $this->child_count,
        ];
    }
}

