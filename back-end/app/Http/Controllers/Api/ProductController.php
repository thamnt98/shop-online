<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Product;
use App\Stock;
use App\Http\Resources\Product\ProductResource;

class ProductController extends Controller
{
    protected $product;
    protected $stock;

    /**
     * ProductController constructor.
     *
     * @param Product $product
     */
    public function __construct(Product $product, Stock $stock)
    {
        $this->product = $product;
        $this->stock = $stock;
    }

    /**
     * Display a listing of the product resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type = $request->type;
        if ($this->product->isNormal($type)) {
            $result = $this->product->getProductExactly($request->all());
        } else {
            $result = $this->product->getProductLikely($request->all());
        }

        return ProductResource::collection($result);
    }

    /**
     * Store a newly product created resource in storage.
     *
     * @param  \Illuminate\Http\ProductCreateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {
        $result = $this->product->createProduct($request);

        if ($result) {
            $product = new ProductResource($result);
            $stock = $this->stock->createStock($product);
            if ($stock) {
                return response()->json(['message' => 'Created success'], 201);
            }
        }

        return response()->json(['message' => 'Created not success'], 400);
    }

    /**
     * Display the specified product resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->product->getProductById($id);
        if ($result) {
            return new ProductResource($result);
        }

        return response()->json(['message' => 'Not found'], 400);
    }

    /**
     * Update product
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, $id)
    {
        $getProduct = $this->product->getProductById($id);

        if ($getProduct) {
            $product = $this->product->updateProduct($request, $id);
            $stock = $this->stock->updateStock($request, $id);
            if ($product && $stock) {
                return new ProductResource($getProduct);
            }
            return response()->json(['message' => 'Update not success'], 400);
        }
        return response()->json([], 204);
    }

    /**
     * Remove product by id
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = $this->product->deleteProduct($id);
        $stock = $this->stock->deleteStock($id);

        if ($product && $stock) {
            return response()->json(['message' => 'Deleted product success']);
        }

        return response()->json([], 204);
    }

    /**
     * Move Product to Store
     *
     * @param Request $request
     * @return void
     */
    public function moveProductToStore(Request $request)
    {
        $result = $this->product->moveProduct($request);
        if (!$result) {
            return response()->json(['message' => 'move store error'], 400);
        }
        return  response()->json(['message' => 'move store success'], 200);
    }

    /**
     * Move multi store 
     *
     * @param Request $requests
     * @return void
     */
    public function multiMoveProductToStore(Request $requests)
    {
        $count = 0;
        foreach ($requests->all() as $request) {
            $result = $this->product->moveProduct($request);
            if (!$result) {
                $count++;
            }
        }
        if ($count) {
            return response()->json(['message' => $count . " action not success"], 400);
        }
        return  response()->json(['message' => 'move multi  store success'], 200);
    }
}

