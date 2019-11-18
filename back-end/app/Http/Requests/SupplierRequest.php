<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;

class SupplierRequest extends FormRequest
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
            'supplier_code' => 'required',
            'supplier_name' => 'required',
            'shop_id' => 'required',
            'tel' => 'required',
            'pref_id' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'supplier_code.required' => 'Provider code is required.',
            'supplier_name.required'  => 'Provider name is required.',
            'shop_id.required'  => 'Shop name is required.',
            'tel.required'  => 'Tel is required.',
            'pref_id.required' => 'City is required.'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                "message" => "The given data was invalid.",
                'errors' => $errors,
            ],
            JsonResponse::HTTP_UNPROCESSABLE_ENTITY
        ));
    }
}

