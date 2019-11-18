<?php

namespace App\Http\Resources\Tax;

use Illuminate\Http\Resources\Json\JsonResource;

class TaxResource extends JsonResource
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
                'type' => 'tax',
                'id' => $this->id,
                'attributes' => [
                    'name' => $this->name,
                    'value' => $this->value
                ]
            ]
        ];
    }
}

