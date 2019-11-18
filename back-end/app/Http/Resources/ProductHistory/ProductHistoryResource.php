<?php

namespace App\Http\Resources\ProductHistory;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductHistoryResource extends JsonResource
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
            'date'=>$this->date,
            'id'=>$this->id,
            'product_name'=>$this->product_name,
            'product_code'=>$this->product_code,
            'number'=>$this->number,
            'type'=>$this->type,
        ];
    }
}

