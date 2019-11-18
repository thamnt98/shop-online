<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ShopResources;
use Illuminate\Http\Response;
use App\Http\Requests\ShopRequest;
use App\Shop;
use App\Http\Resources\Shop\DropdownShopResource;
use App\Http\Resources\Service\ShopNameResources;

class ShopController extends Controller
{
    protected $shop;
    public function __construct(Shop $shop) {
        $this->shop = $shop;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = $this->shop->getIndex($request->per_page);
        return ShopResources::collection($result);
        return response()->json("Not found", Response::HTTP_NOT_FOUND);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ShopRequest $request)
    {

        $result = $this->shop->addShop($request);
        if (!$result) {
            return response()->json("Not found", Response::HTTP_NOT_FOUND);
        }
        return new ShopResources($result);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->shop->getShow($id);
        return new ShopResources($result);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function update(ShopRequest $request, $id)
    {
        $result = $this->shop->updateShop($id, $request);
        if (!$result) {
            return response()->json("Not found", Response::HTTP_NOT_FOUND);
        }
        return new ShopResources($result);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = $this->shop->deleteShop($id);
        if (!$result) {
            return response()->json("Not found", Response::HTTP_NOT_FOUND);
        }
        return response()->json("Deleted success");
    }

    /**
     * Get shop drop down
     *
     * @param  int
     * @return \Illuminate\Http\Response
     */
    public function getShopDropDown()
    {
        $result = $this->shop->getShopDropDown();
        return DropdownShopResource::collection($result);
    }

    public function getListShop()
    {
        $result = $this->shop->getAllShop();
        return ShopNameResources::collection($result);
    }
}

