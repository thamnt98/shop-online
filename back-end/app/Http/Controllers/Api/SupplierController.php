<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierRequest;
use App\Http\Resources\Supplier\SupplierResource;
use App\Supplier;
use Illuminate\Http\Response;

class SupplierController extends Controller
{
    public function __construct(Supplier $supplierModel)
    {
        $this->supplier = $supplierModel;
    }

    /**
     * Get data for suppllers
     *
     * @param  Illuminate\Http\Request  
     * @return  App\Http\Resources\Supplier\SupplierResource collection
     */
    public function index(Request $request)
    {
        $perPage = $request->per_page;
        $result = $this->supplier->getSuppliers($perPage);

        return SupplierResource::collection($result);
    }

    /**
     * Get data for suppller
     *
     * @param  Illuminate\Http\Request  
     * @return  App\Http\Resources\Supplier\SupplierResource
     */
    public function show($id)
    {
        $result = $this->supplier->getSupplier($id);

        if (!$result) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        return new SupplierResource($result);
    }

    /**
     * Create suppller
     *
     * @param  $id of supplier
     * @return  App\Http\Resources\Supplier\SupplierResource
     */
    public function store(SupplierRequest $request)
    {
        try {
            $result = $this->supplier->createSupplier($request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return (new SupplierResource($result))->response()->setStatusCode(Response::HTTP_CREATED);
    }


    /**
     * Update supplier
     *
     * @param  App\Http\Requests\SupplierRequest, $id of supplier
     * @return  Illuminate\Http\Response
     */
    public function update(SupplierRequest $request, $id)
    {
        $rental = $this->supplier->getSupplier($id);

        if (!$rental) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        try {
            $this->supplier->updateSupplier($id, $request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response(null, Response::HTTP_OK);
    }

    /**
     * Delete supplier
     *
     * @param  id supplier
     * @return  Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $supplier = $this->supplier->getSupplier($id);

        if (!$supplier) {
            return response(null, 400);
        }

        $this->supplier->softDeleteSupplier($id);

        return response(null, Response::HTTP_OK);
    }
}

