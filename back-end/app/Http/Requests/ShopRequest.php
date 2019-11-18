<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShopRequest extends FormRequest
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
        $shopId = $this->route('shop');
        return [
            'shop_code'  => ['required', Rule::unique('shop', 'shop_code')->ignore($shopId)],
            'shop_name'  => ['required', Rule::unique('shop', 'shop_name')->ignore($shopId)],
            'zipcode'  => 'required',
            'city'  => 'required',
        ];
    }
}

