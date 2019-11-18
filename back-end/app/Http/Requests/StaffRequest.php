<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Validation\Rule;

class StaffRequest extends FormRequest
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
        $staff = $this->route('staff');
        return [
            'name' => 'required',
            'username'  => ['required', Rule::unique('staff', 'username')->ignore($staff)],
            'password' => 'required',
            'shop_id' => 'required',
            'is_parttime' => 'required',
            'pref_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'is_parttime.required' => 'Passttime is required.',
            'name.required'  => 'Staff name is required.',
            'shop_id.required'  => 'Shop is required.',
            'pref_id.required'  => 'City is required.'
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

