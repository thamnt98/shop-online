<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Producer\ProducerResources;
use App\Http\Resources\Producer\ProducersResources;
use App\Producer;
use App\Http\Requests\ProducerRequest;

class ProducerController extends Controller
{
    protected $producer;

    /**
     * __constructor
     *
     * @param Producer $producer
     */
    public function __construct(Producer $producer)
    {
        $this->producer = $producer;
    }

    /**
     * Display a listing of the producer's resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = $this->producer->getAll($request->per_page);
        return ProducersResources::collection($result);
    }

    /**
     * Store a newly created resource of producer 
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProducerRequest $request)
    {
        $result = $this->producer->addProducer($request);
        if ($result) {
            return new ProducerResources($result);
        }
        return response()->json(['message' => 'error'], 400);
    }

    /**
     * Show producer by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->producer->getProducerById($id);
        if ($result) {
            return new ProducerResources($result);
        }
        return response()->json(['message' => 'error'], 400);
    }

    /**
     * Update producer by id 
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProducerRequest $request, $id)
    {
        $result = $this->producer->updateProducer($id, $request);
        if ($result) {
            $result = $this->producer->getProducerById($id);
            return new ProducerResources($result);
        }
        return response()->json(['message' => 'error'], 400);
    }

    /**
     * Soft delete  producer by id 
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->producer->deleteProducer($id);
        if (!$result) {
            return response()->json(['message' => 'error'], 400);
        }
    }

    /**
     * Get Max Producer code
     *
     * @return void
     */
    public function getMaxProducerCode()
    {
        $result = $this->producer->getMaxProducerCode();
        return response()->json(['maxCode' => $result]);
    }
}

