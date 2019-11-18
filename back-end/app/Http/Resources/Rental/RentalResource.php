<?php

namespace App\Http\Resources\Rental;

use Illuminate\Http\Resources\Json\JsonResource;

class RentalResource extends JsonResource
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
                'type' => 'rental',
                'id' => $this->id,
                'attributes' => [
                    'rentalName' => $this->retal_name,
                    'rentalDescription' => $this->retal_description,
                    'fee' => $this->fee,
                    'created_date' => $this->created_date,
                    'updated_date' => $this->updated_date,
                    'status' => $this->status
                ],
                'relationships' => [
                    new RentalRelationshipResource($this)
                ],
                'links' => [
                    'seft' => route('rentals.show', ['rental' => $this->id])
                ]
            ]
        ];
        
    }
}

