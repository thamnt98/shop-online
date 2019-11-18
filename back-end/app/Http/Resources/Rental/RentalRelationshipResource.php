<?php

namespace App\Http\Resources\Rental;

use App\Shop;
use Illuminate\Http\Resources\Json\JsonResource;

class RentalRelationshipResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $shopModel = new Shop();
        $shop = $shopModel->getShop($this->shop_id);

        return [
            'data' => [
                'type' => 'shop',
                'id' => $shop->id,
                'shopName' => $shop->shop_name
            ],
            'links' => route('shops.show', ['shop' => $shop->id])
        ];

        return parent::toArray($request);
    }
}
