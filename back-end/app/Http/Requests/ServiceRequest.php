<?php

namespace App\Http\Requests;

use App\Rules\CheckUniqueService;
use Illuminate\Foundation\Http\FormRequest;
use App\Service;

class ServiceRequest extends FormRequest
{
    protected $service;

    /**
     * __constructor
     *
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
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
     * Get the validation rules that apply to the request of service.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'service_name' => [
                'required',
                new checkUniqueService($this->shop_id, $this->route('service'), $this->service),
            ],
            'fee' => 'required',
            'child_count' => 'required',
            'customer_type_id' => 'required',
            'shop_id' => 'required'
        ];
    }
}

