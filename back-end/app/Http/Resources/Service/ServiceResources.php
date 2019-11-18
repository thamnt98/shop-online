<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Service;

class ServiceResources extends JsonResource
{

    /** 
     * Transform the resource of one service  into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $created_date = $this->created_date ? ($this->created_date->format('Y.m.d H:i:s')) : "";
        $updated_date = $this->updated_date ? $this->updated_date->format('Y.m.d H:i:s') : "";
        
        return [
            'id' => $this->id,
            "shop_id" => $this->shop_id,
            "customer_type_id" => $this->customer_type_id,
            'service_name' => $this->service_name,
            'type' => Service::find($this->id)->customerType->customer_type,
            'service_description' => $this->service_description,
            'fee' => $this->fee,
            'shop_name' => Service::find($this->id)->shops->shop_name,
            'child_count' => $this->child_count,
            'created_date' => $created_date,
            'updated_date' => $updated_date,
        ];
    }
}

