<?php

namespace App\Http\Controllers\Api;

use App\ZipCode;
use App\Http\Controllers\Controller;

class ZipCodeController extends Controller
{
    protected $zipCode;

    /**
     * __constructor
     *
     * @param ZipCode $zipCode
     */
    public function __construct(ZipCode $zipCode)
    {
        $this->zipCode = $zipCode;
    }

    /**
     * Display the specified resource of zip code.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->zipCode->getZipCodeById($id);
        return response()->json($result);
    }
}

