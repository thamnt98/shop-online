<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service;
use App\Shop;
use App\Http\Resources\Service\ServicesResources;
use App\Http\Resources\Service\ServiceResources;
use App\Http\Requests\ServiceRequest;
use  Illuminate\Support\Facades\Validator;
use App\Http\Requests\ServiceUpdateRequest;

class ServiceController extends Controller
{
    protected $service;

    /**
     * __construct
     *
     * @param  mixed $service
     *
     * @return void
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * Get list resource of service by shop
     *
     * @param  mixed $request
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), ['per_page' => 'numeric|min:1']);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $result = ($this->service->getServiceByShop($request->idShop, $request->per_page));
        return ServicesResources::collection($result);
    }

    /**
     * Store new resource of service
     *
     * @param  mixed $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(ServiceRequest $request)
    {
        $result = $this->service->addService($request);
        if ($result) {
            return response(new ServicesResources($result));
        }
        return response()->json(['message' => 'error'], 400);
    }

    /**
     *  Detail one resource of service by id
     * 
     * @param  mixed $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->service->getServiceById($id);
        if ($result) {
            return response(new ServiceResources($result));
        }
        return response()->json(['error' => 'Service not found'], 400);
    }

    /**
     * update one resource of service by id
     *
     * @param  mixed $id
     * @param  mixed $request
     *
     * @return \Illuminate\Http\Response
     */
    public function update($id, ServiceRequest $request)
    {
        $result = $this->service->updateService($id, $request);
        if ($result) {
            $result = $this->service->getServiceById($id);
            return response(new ServicesResources($result));
        }
        return response()->json(['message' => 'error'], 400);
    }

    /**
     * Soft delete one resource of service by id
     *
     * @param  mixed $id
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function destroy($id)
    {
        $result = $this->service->deleteService($id);
        if ($result) {
            return response()->json(['id' => $id, 'message' => 'succes'], 200);
        }
        return response()->json(['id' => $id, 'message' => 'error'], 400);
    }

    /**
     * get list of service 
     *
     * @return void
     */
    public function listService()
    {
        $result = $this->service->getAll();
        return ServicesResources::collection($result);
    }
}

