<?php

namespace App\Http\Resources\Supplier;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
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
                'type' => 'supplier',
                'id' => $this->id,
                'attributes' => [
                    'shopId' => $this->shop_id,
                    'supplierName' => $this->supplier_name,
                    'supplierCode' => $this->supplier_code, 
                    'tel' => $this->tel,
                    'zipcode' => $this->zipcode,
                    'pref_id' => $this->pref_id,
                    'ward' => $this->ward,
                    'addr1' => $this->addr1,
                    'addr2' => $this->addr2,
                    'createdDate' => $this->created_date,
                    'updatedDate' => $this->updated_date
                ],
                'relationships' => [
                    'shop' => [
                        'id' => $this->shop_id,
                        'name' => $this->shop_name
                    ],
                    'perf' => [
                        'id' => $this->pref_id,
                        'name' => $this->name
                    ]
                ],
                'links' => [
                    'seft' => route('suppliers.show', ['supplier' => $this->id])
                ]
            ]
        ];
    }
}

