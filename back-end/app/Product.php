<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\StockHistory;
use App\MoveStockHistory;
use App\InStock;

class Product extends Model
{
    protected $table = 'product';

    protected $fillable = ['shop_id', 'is_enable', 'product_name', 'product_code', 'member_price',
     'stock_price', 'notax_price', 'tax_price', 'size_text', 'color_text', 'size_id', 'color_id',
      'supplier_id', 'maker_id', 'notes', 'status'];
  
    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';
    const TYPE_NORMAL = 'exact';

    /**
     * Check type of search
     *
     * @param [type] $type
     * @return boolean
     */
    public function isNormal($type)
    {
        return $type === Product::TYPE_NORMAL;
    }

    /**
     * Search  product  likely 
     *
     * @param $request
     * @return void
     */
    public function getProductLikely($request)
    {
        $product_code = $request['product_code'];
        $per_page = $request['per_page'];
        $product_name = $request["product_name"];
        $items[0] = $request['shop'];
        $items[1] = $request['supplier'];
        $items[2] = $request['maker'];

        foreach ($items as $key =>  $item) {
            if ($item) {
                $type[$key] = "=";
                $value[$key] = $item;
            } else {
                $type[$key] = "Like";
                $value[$key] = '%%';
            }
        }

        $result = Product::select(
            'product.*',
            'mst_size.size_name',
            'mst_color.color_name',
            'maker.maker_name',
            'shop.shop_name',
            'shop.color',
            'supplier.supplier_name',
            'stock.stock_number'
        )
            ->join('mst_size', 'product.size_id', '=', 'mst_size.id')
            ->join('mst_color', 'product.color_id', '=', 'mst_color.id')
            ->join('maker', 'product.maker_id', '=', 'maker.id')
            ->join('shop', 'product.shop_id', '=', 'shop.id')
            ->join('supplier', 'product.supplier_id', '=', 'supplier.id')
            ->join('stock', 'product.id', '=', 'stock.product_id')
            ->where('product.status', 1)
            ->where([
                ['product.product_code', 'Like', '%' . $product_code . '%'],
                ['shop.id', $type[0], $value[0]],
                ['supplier.id', $type[1], $value[1]],
                ['maker.id', $type[2], $value[2]],
                ['product.product_name', 'Like', '%' . $product_name . '%'],
            ])
            ->paginate($per_page);
        return ($result);
    }

    /**
     * Create new product
     *
     * @param  $request
     * @return void
     */
    public function createProduct($request)
    {
        return Product::create($request->all());
    }

    /**
     * Get product by id
     *
     * @param int $id
     * @return void
     */
    public function getProductById($id)
    {
        return Product::where('id', $id)->where('status', 1)->first();
    }

    /**
     * Search Product exactly
     *
     * @param [type] $request
     * @return void
     */
    public function getProductExactly($request)
    {
        $items[0] = $request['product_code'];
        $per_page = $request['per_page'];
        $items[1] = $request['product_name'];
        $items[2] = $request['shop'];
        $items[3] = $request['supplier'];
        $items[4] = $request['maker'];

        foreach ($items as $key =>  $item) {
            if ($item) {
                $type[$key] = "=";
                $value[$key] = $item;
            } else {
                $type[$key] = "Like";
                $value[$key] = '%%';
            }
        }

        $result = Product::select(
            'product.*',
            'mst_size.size_name',
            'mst_color.color_name',
            'maker.maker_name',
            'shop.shop_name',
            'supplier.supplier_name',
            'stock.stock_number'
        )
            ->join('mst_size', 'product.size_id', '=', 'mst_size.id')
            ->join('mst_color', 'product.color_id', '=', 'mst_color.id')
            ->join('maker', 'product.maker_id', '=', 'maker.id')
            ->join('shop', 'product.shop_id', '=', 'shop.id')
            ->join('supplier', 'product.supplier_id', '=', 'supplier.id')
            ->join('stock', 'product.id', '=', 'stock.product_id')
            ->where('product.status', 1)
            ->where([
                ['product.product_code', $type[0], $value[0]],
                ['shop.id', $type[2], $value[2]],
                ['supplier.id', $type[3], $value[3]],
                ['maker.id', $type[4], $value[4]],
                ['product.product_name', $type[1], $value[1]],
            ])
            ->paginate($per_page);
        return ($result);
    }

    /**
     * Move Product to Store
     *
     * @param [type] $request
     * @return void
     */
    public function moveProduct($request)
    {
        $oldStockNumber = DB::table('stock')->where('id', $request['id'])->get('stock_number')->toArray();

        if ($oldStockNumber[0]->stock_number > 0) {
            $checkProduct =  Product::where('shop_id', $request['new_shop_id'])->where('product_code', $request['product_code'])->get()->toArray();

            if ($checkProduct) {
                $newProductId = $checkProduct[0]['id'];
                $shop_from = $request['shop_id'];
            } else {
                $shop_from = $request['shop_id'];
                $request['shop_id'] = $request['new_shop_id'];
                $newProduct = Product::create($request->all())->toArray();
                $newProductId = $newProduct['id'];
                DB::table('stock')->insert([
                    'shop_id' => $request['shop_id'],
                    'product_id' => $newProduct['id'],
                ]);
            }

            $to_stock = DB::table('stock')->where('product_id', $newProductId)->get('stock_number')->toArray();
            $from_stock = DB::table('stock')->where('product_id', $request['id'])->get('stock_number')->toArray();
            $new = DB::table('stock')->where('product_id', $newProductId)->increment('stock_number', $request['quantity']);
            $old = DB::table('stock')->where('product_id', $request['id'])->decrement('stock_number', $request['quantity']);
            $stock_id = DB::table('stock')->where('product_id', $request['id'])->get('id')->toArray();
            DB::table('move_stock_history')->insert([
                'product_id' => $request['id'],
                'stock_id' => $stock_id[0]->id,
                'shop_from' => $shop_from,
                'shop_to' => $request['new_shop_id'],
                'from_stock_number' => $from_stock[0]->stock_number,
                'to_stock_number' => $to_stock[0]->stock_number,
                'move_number' => $request['quantity'],
                'move_date' => Carbon::now()
            ]);

            return array($new, $old);
        }
    }

    /** Update product
     *
     * @param $request
     * @param $id
     * @return void
     */
    public function updateProduct($request, $id)
    {
        return Product::where('id', $id)->update($request->all());
    }

    /**
     * Remove product by id
     *
     * @param [int] $id
     * @return void
     */
    public function deleteProduct($id)
    {
        $product = Product::where('id', $id)->where('status', 1)->first();
        if ($product) {
            return $product->update(['status' => 0]);
        }
        return $product;
    }

    /**
     * Search product history
     *
     * @param $request
     * @return void
     */
    public function searchProductHistory($request)
    {
        $date_start = $request->date_start;
        $date_end = $request->date_end;
        $product_id = $request->product_id;
        if ($request->shop_id) {
            $type = "=";
            $shop_id = $request->shop_id;
        } else {
            $type = "LIKE";
            $shop_id = "%" . $request->shop_id . "%";
        }
        $stock_history = $this->searchStockHistory($date_start, $date_end, $product_id, $type, $shop_id);
        $move_stock_history = $this->searchMoveStockHistory($date_start, $date_end, $product_id, $type, $shop_id);
        $in_stock = $this->searchInStock($date_start, $date_end, $product_id, $type, $shop_id);
        $stock_history_and_move = $stock_history->merge($move_stock_history);
        $merger_all_history = $stock_history_and_move->merge($in_stock);
        return $merger_all_history;
    }

    /**
     * Search stock history
     *
     * @param $request
     * @return void
     */
    public function searchStockHistory($date_start, $date_end, $product_id, $type, $shop_id)
    {

        $search_stock_history = StockHistory::select(
            'stock_history.set_date as date',
            'stock_history.id as id',
            'product.product_name',
            'product.product_code',
            'stock_history.set_number as number',
            DB::raw("'Stock history' as 'type'")
        )->Join('product', 'stock_history.product_id', '=', 'product.id')
            ->whereBetween('stock_history.set_date', array($date_start, $date_end))
            ->where('product.id', $product_id)
            ->where('product.shop_id', $type, $shop_id)
            ->get();
        return $search_stock_history;
    }

    /**
     * Search move stock history
     *
     * @param $request
     * @return void
     */
    public function searchMoveStockHistory($date_start, $date_end, $product_id, $type, $shop_id)
    {
        $search_move_stock_history = MoveStockHistory::select(
            'move_stock_history.move_date as date',
            'move_stock_history.id as id',
            'product.product_name',
            'product.product_code',
            'move_stock_history.move_number as number',
            DB::raw("'Move' as 'type'")
        )->Join('product', 'move_stock_history.product_id', '=', 'product.id')
            ->whereBetween('move_stock_history.move_date', array($date_start, $date_end))
            ->where('product.id', $product_id)
            ->where('product.shop_id', $type, $shop_id)
            ->get();
        return $search_move_stock_history;
    }

    /**
     * Search in stock
     *
     * @param $request
     * @return void
     */
    public function searchInStock($date_start, $date_end, $product_id, $type, $shop_id)
    {
        $search_in_stock = InStock::select(
            'in_stock.in_date as date',
            'in_stock.id as id',
            'product.product_name',
            'product.product_code',
            'in_stock.in_number as number',
            DB::raw("'In stock' as 'type'")
        )->Join('product', 'in_stock.product_id', '=', 'product.id')
            ->whereBetween('in_stock.in_date', array($date_start, $date_end))
            ->where('product.id', $product_id)
            ->where('product.shop_id', $type, $shop_id)
            ->get();
        return $search_in_stock;
    }
}

