<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProducerRequest extends FormRequest
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
            'maker_name' => 'required',
            'maker_code' => 'required',
            'shop_id' => 'required',
            'tel' => 'required|numeric',
            'zipcode' => 'required',
        ];
    }
}

