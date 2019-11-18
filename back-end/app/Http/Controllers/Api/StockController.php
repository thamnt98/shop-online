<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StockRequest;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Stock;
use App\Http\Resources\StockResource;

class StockController extends Controller
{
    protected $stock;

    /**
     * StockController constructor.
     *
     * @param Stock $stock
     */
    public function __construct(Stock $stock)
    {
        $this->stock = $stock;
    }

    /**
     * Set a stock
     *
     * @param   App\Http\Requests\StockRequest $request
     * @param  int  $product_id
     * @param  int  $set_number
     * @return  App\Http\Resources\StockResource
     */
    public function setStockNumber(StockRequest $request)
    {
        $result = $this->stock->setStock($request);

        if (!$result) {
            return response(null, 400);
        }

        return new StockResource($result);
    }

    /**
     * Plus a stock_number
     *
     * @param  App\Http\Requests\StockRequest $request
     * @param  int  $product_id
     * @param  int  $add_number
     * @return  App\Http\Resources\StockResource
     */
    public function plusStockNumber(StockRequest $request)
    {
        $result = $this->stock->plusStock($request);

        if (!$result) {
            return response(null, 400);
        }

        return new StockResource($result);
    }

    /**
     * Plus multi stock
     *
     * @param  App\Http\Requests\Request $request
     * @param  int  $product_id
     * @param  int  $add_number
     * @return  response
     */
    public function plusMultiStockNumber(Request $request)
    {
        $result = $this->stock->plusMultiStock($request);

        if (!$result) {
            return response(null, 400);
        }

        return response(null, 200);
    }
}

