<?php

namespace App\Http\Resources\Service;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerTypeResources extends JsonResource
{

    /**
     * Transform the resource of Customer Type  into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'customer_type' => $this->customer_type,
            'id' => $this->id,
        ];
    }
}

