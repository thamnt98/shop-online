<?php

namespace App\Http\Resources\Zipcode;

use Illuminate\Http\Resources\Json\JsonResource;

class ZipcodeResource extends JsonResource
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
                'type' => 'zipcode',
                'id' => $this->id,
                'attributes' => [
                    'zipcode' => $this->zipcode,
                    'pref_id' => $this->pref_id,
                    'ward' => $this->ward,
                    'addr1' => $this->addr1,
                    'addr2' => $this->addr2,
                ],
            ],
        ];
    }
}

