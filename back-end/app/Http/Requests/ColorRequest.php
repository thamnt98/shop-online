<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ColorRequest extends FormRequest
{

    public function rules()
    {
        $colorId = $this->route('color');
        return [
            'color_name'  => ['required', Rule::unique('mst_color', 'color_name')->ignore($colorId)],
        ];
    }
}

