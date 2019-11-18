<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stock';
    protected $fillable = [
        'product_id', 'shop_id', 'stock_number', 'available_number', 'created_date', 'updated_date'];
    public $primaryKey = 'id';


    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Relationship between Stock and StockHistory
     *
     * @return App\StockHistory
     */
    public function stockHistory()
    {
        return $this->hasMany('App\StockHistory', 'stock_id', 'id');
    }

    /**
     * Set stock.stock_number and add stock_history
     *
     * @param  App\Http\Requests\StockRequest $request
     * @param  int  $product_id
     * @param  int  $set_number
     * @return App\Stock
     */
    public function setStock($request)
    {
        $product_id = $request->product_id;

        $stock = Stock::where('product_id', $product_id)->first();

        if (!$stock) {
            return false;
        }

        $preset_number = $stock->stock_number;

        $stock->stock_number = $request->set_number;
        $stock->available_number = $stock->stock_number;
        $stock->save();

        $stock_history =  new StockHistory;
        $stock_history->addStockHistory($stock, $preset_number);

        return $stock;
    }

    /**
     * Plus stock.stock_number
     *
     * @param  App\Http\Requests\StockRequest $request
     * @param  int  $product_id
     * @param  int  $add_number
     * @return App\Stock
     */
    public function plusStock($request)
    {
        $product_id = $request['product_id'];
        $add_number = $request['add_number'];

        $stock = Stock::where('product_id', $product_id)->first();

        if (!$stock) {
            return false;
        }

        $stock->stock_number += $add_number;
        $stock->available_number = $stock->stock_number;
        $stock->save();

        $in_stock = new InStock;
        $in_stock->addInStock($stock, $add_number);

        return $stock;
    }

    /**
     * Create stock when created product
     *
     * @param [array] $product
     * @return void
     */
    public function createStock($product)
    {
        return Stock::create([
            'product_id' => $product->id,
            'shop_id' => $product->shop_id,
        ]);
    }

    /**
     * Update stock
     *
     * @param [array] $request
     * @return void
     */
    public function updateStock($request, $id)
    {
        return Stock::where('product_id', $id)->update(['shop_id' => $request->shop_id]);
    }

    /**
     * Remove stock
     *
     * @param [int] $id
     * @return void
     */
    public function deleteStock($product_id)
    {
        $stock = Stock::where('product_id', $product_id)->first();
        if ($stock) {
            $stock->delete();
            return true;
        }
        return $stock;
    }

    /**
     * Plus multi stock.stock_number
     *
     * @param  App\Http\Requests\Request $request
     * @param  int  $product_id
     * @param  int  $add_number
     * @return App\Stock
     */
    public function plusMultiStock($request)
    {
        foreach($request->all() as $value){
            $result=$this->plusStock($value);

            if(!$result){
                return false;
            };
        }

        return true;
    }
}

