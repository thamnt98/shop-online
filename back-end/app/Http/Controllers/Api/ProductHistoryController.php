<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductHistory\ProductHistoryResource;
use App\Product;

class ProductHistoryController extends Controller
{
    protected $product;

    /**
     * ProductHistoryController constructor.
     *
     * @param Product $product
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Search product history
     *
     * @param Request $request
     * @return void
     */
    public function searchProductHistory(Request $request)
    {
        $result = $this->product->searchProductHistory($request);
        return ProductHistoryResource::collection($result);
    }
}

