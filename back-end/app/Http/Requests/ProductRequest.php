<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product_code' => 'required',
            'product_name' => 'required',
            'member_price' => 'required',
            'stock_price' => 'regex:/(^[0-9]*$)/',
            'maker_id'=> 'required',
            'supplier_id'=> 'required',
            'shop_id'=> 'required',
        ];
    }
}

