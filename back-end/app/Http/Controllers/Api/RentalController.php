<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\RentalRequest;
use App\Http\Resources\Rental\RentalResource;
use App\MstRental;
use Illuminate\Http\Response;
use Exception;

class RentalController extends Controller
{
    public function __construct(MstRental $rentalModel)
    {
        $this->rental = $rentalModel;
    }

    /**
     * Get data for rental
     *
     * @param  Illuminate\Http\Request  
     * @return  App\Http\Resources\Rental\RentalResource collection
     */
    public function index(Request $request)
    {
        if (!$request->has('shop')) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        $perPage = $request->per_page;

        $result = $this->rental->getRentals($request->shop, $perPage);

        return RentalResource::collection($result);
    }

    /**
     * Get data for rental
     *
     * @param  id shop 
     * @return  App\Http\Resources\Rental\RentalResource;
     */
    public function show($id)
    {
        $result = $this->rental->getRental($id);

        if (!$result) {
            return response(null, Response::HTTP_BAD_REQUEST);
        }

        return new RentalResource($result);
    }

    /**
     * Get data for rental
     *
     * @param  App\Http\Requests\RentalRequest
     * @return  App\Http\Resources\Rental\RentalResource;
     */
    public function store(RentalRequest $request)
    {
        try {
            $result = $this->rental->createRental($request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return (new RentalResource($result))->response()->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * Get data for rental
     *
     * @param  App\Http\Requests\RentalRequest
     * @return  Illuminate\Http\Response
     */
    public function update(RentalRequest $request, $id)
    {
        $rental = $this->rental->getRental($id);

        if (!$rental) {
            return response(null, 400);
        }

        try {
            $this->rental->updateRental($id, $request);
        } catch (Exception $e) {
            return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return response(null, Response::HTTP_OK);
    }

    /**
     * Get data for rental
     *
     * @param  id shop
     * @return  Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $rental = $this->rental->getRental($id);

        if (!$rental) {
            return response(null, 400);
        }

        $this->rental->softDeleteRental($id);

        return response(null, Response::HTTP_OK);
    }
}

