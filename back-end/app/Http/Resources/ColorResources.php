<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ColorResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
            'id'         => $this->id,
            'color_name' => $this->color_name,
            'rgb'        => $this->rgb,
            'created_date'  => $this->created_date,
            'updated_date'  => $this->updated_date
        ];
    }
}

