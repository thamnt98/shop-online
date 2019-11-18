<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResources;
use App\Color;
use App\Http\Requests\ColorRequest;

class ColorController extends Controller
{
    protected $color;

    /**
     * ColorController constructor.
     *
     * @param Color $color
     */
    public function __construct(Color $color)
    {
        $this->color = $color;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = $this->color->getAll($request->per_page);

        return ColorResources::collection($result);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ColorRequest $request)
    {
        $result = $this->color->getStore($request);

        if (!$result) {
            return response(null, 400);
        }

        return new ColorResources($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->color->getShow($id);

        if (!$result) {
            return response(null, 400);
        }

        return new ColorResources($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ColorRequest $request, $id)
    {
        $result = $this->color->getUpdate($request, $id);

        if (!$result) {
            return response(null, 400);
        }

        return new ColorResources($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->color->getDelete($id);

        if (!$result) {
            return response(null, 400);
        }

        return response(null, 200);
    }
}

