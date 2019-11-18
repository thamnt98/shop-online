<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\StockHistory;
use App\Http\Resources\StockHistoryResource;

class StockHistoryController extends Controller
{
    protected $stock_history;

    /**
     * StockHistoryController constructor.
     *
     * @param StockHistory $stock_history
     */
    public function __construct(StockHistory $stock_history)
    {
        $this->stock_history = $stock_history;
    }

    /**
     * Display a listing of the resource.
     *
     * @param $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $result = $this->stock_history->getHistoryByProductId($request->product_id);

        if (!$result) {
            return response(null, 400);
        }

        return StockHistoryResource::collection($result);
    }
}

