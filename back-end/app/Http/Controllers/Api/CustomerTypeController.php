<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service;
use App\CustomerType;
use App\Http\Resources\Service\CustomerTypeResources;

class CustomerTypeController extends Controller
{
    protected $customerType;
    /**
     * __construct
     *
     * @param  mixed $customer
     *
     * @return void
     */
    public function __construct(CustomerType $customerType) {
        $this->customerType = $customerType;
    }

    /**
     *
     * Return list resources of customer_type
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $result = $this->customerType->getAllCustomerType();
        return response(CustomerTypeResources::collection($result))->setStatusCode(200);
    }
}

