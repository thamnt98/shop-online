<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SizeRequest;
use App\Http\Resources\SizeResource;
use App\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    protected $size;

    /**
     * SizeController constructor.
     *
     * @param Size $size
     */
    public function __construct(Size $size)
    {
        $this->size = $size;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Json
     */
    public function index(Request $request)
    {
        $per_page = $request->per_page;

        $sizes = $this->size->getSize($per_page);
        return SizeResource::collection($sizes);
    }

    /**
     * Create new size
     *
     * @param  SizeRequest $request
     * @return Json
     */
    public function store(SizeRequest $request)
    {
        $result = $this->size->createSize($request);

        if ($result) {
            return new SizeResource($result);
        }

        return response()->json(['message' => 'Created not success'], 400);
    }

    /**
     * Display the specified size.
     *
     * @param  int  $id
     * @return Json
     */
    public function show($id)
    {
        $result = $this->size->getSizeById($id);
        if ($result) {
            return new SizeResource($result);
        }

        return response()->json(['message' => 'Not found'], 400);
    }

    /**
     * Update Size
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(SizeRequest $request, $id)
    {
        $result = $this->size->updateSize($request, $id);

        if ($result) {
            $size = $this->size->getSizeById($id);
            return new SizeResource($size);
        }

        return response()->json(['message' => 'Update not success'], 400);
    }

    /**
     * Remove size by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->size->deleteSize($id);

        if ($result) {
            return response()->json(['message' => 'Deleted success']);
        }

        return response()->json(['message' => 'This size is not exist'], 204);
    }
}

