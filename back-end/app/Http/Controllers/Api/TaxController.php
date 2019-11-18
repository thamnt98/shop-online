<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\TaxRequest;
use App\Http\Resources\Tax\TaxResource;
use App\Tax;
use Illuminate\Http\Response;
use Exception;

class TaxController extends Controller
{
    public function __construct(Tax $taxModel)
    {
        $this->tax = $taxModel;
    }

    /**
     * Get data for tax
     *
     * @param  null  
     * @return  App\Http\Resources\Tax\TaxResource collection
     */
    public function index(){
        $result = $this->tax->getTaxes();
        return TaxResource::collection($result);
    }

    /**
     * Update tax
     *
     * @param  App\Http\Requests\TaxRequest  
     * @return  App\Http\Resources\Tax\TaxResource collection
     */
    public function update(TaxRequest $request){

        try{
            $this->tax->updaeTaxes($request);
        }catch(Exception $ex){
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

