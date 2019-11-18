<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Shop;
use App\Size;
use App\Supplier;
use App\Color;
use App\Producer;
use App\Stock;

class ProductResource extends JsonResource
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
            'attributes' => [
                'is_enable' => $this->is_enable,
                'product_name' => $this->product_name,
                'product_code' => $this->product_code,
                'member_price' => $this->member_price,
                'stock_price' => $this->stock_price,
                'notax_price' => $this->notax_price,
                'tax_price' => $this->tax_price,
                'size_text' => $this->size_text,
                'size_id' => $this->size_id,
                'size_name' => (Size::find($this->size_id)->status) ? (Size::find($this->size_id)->size_name) : "",
                'color_text' => $this->color_text,
                'color_id' => $this->color_id,
                'color_name' => (Color::find($this->color_id)->status) ? (Color::find($this->color_id)->color_name) : "",
                'maker_id' => $this->maker_id,
                'maker_name' => (Producer::find($this->maker_id)->status) ? (Producer::find($this->maker_id)->maker_name) : "",
                'shop_id' => $this->shop_id,
                'color_shop' => (Shop::find($this->shop_id)->status) ? (Shop::find($this->shop_id)->color) : "",
                'shop_name' => (Shop::find($this->shop_id)->status) ? (Shop::find($this->shop_id)->shop_name) : "",
                'supplier_id' => $this->supplier_id,
                'supplier_name' => (Supplier::find($this->supplier_id)->status) ? (Supplier::find($this->supplier_id)->supplier_name) : "",
                'stock_number' => (Stock::where('product_id', $this->id)) ? (Stock::where('product_id', $this->id)->first()->stock_number) : "",
                'stock_id' => (Stock::where('product_id', $this->id)) ? (Stock::where('product_id', $this->id)->first()->id) : "",
                'notes' => $this->notes,
                'created_date' => $this->created_date ? $this->created_date->format('Y.m.d H:i:s') : "",
                'updated_date' => $this->updated_date ? $this->updated_date->format('Y.m.d H:i:s') : ""
            ]
        ];
    }
}

