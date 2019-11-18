<?php

namespace App\Http\Requests;

use App\MstRental;
use App\Rules\CheckUniqueRental;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\JsonResponse;

class RentalRequest extends FormRequest
{
    protected $rentalModel;

    public function __construct(MstRental $rentalModel)
    {
        $this->rental = $rentalModel;
    }

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
            'shop_id' => 'required|numeric',
            'rental_name' => ['required', new CheckUniqueRental($this->shop_id, $this->route('rental'), $this->rental)],
            'rental_description' => 'required',
            'fee' => 'required|numeric',
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

