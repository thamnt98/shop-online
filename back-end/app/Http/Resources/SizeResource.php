<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SizeResource extends JsonResource
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
            'id' => $this->id,
            'size_name' => $this->size_name,
            'size_description' => $this->size_description,
            'created_date' => $this->created_date ? $this->created_date->format('Y.m.d H:i:s') : "",
            'updated_date' => $this->updated_date ? $this->updated_date->format('Y.m.d H:i:s') : ""
        ];
    }
}

