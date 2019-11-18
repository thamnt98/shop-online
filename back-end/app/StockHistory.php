<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Stock;

class StockHistory extends Model
{
    protected $table = 'stock_history';
    protected $fillable = [
        'product_id', 'shop_id', 'stock_id', 'set_date', 'preset_number', 'set_number'
    ];
    public $primaryKey = 'id';

    public $timestamps = false;

    /**
     * Relationship between Stock and StockHistory
     *
     * @return App\Stock
     */
    public function stock()
    {
        return $this->belongsTo('App\Stock', 'stock_id', 'id');
    }

    /**
     * Get history by product_id
     *
     * @param  int  $product_id
     * @return App\StockHistory
     */
    public function getHistoryByProductId($product_id)
    {
        $stock_history = StockHistory::where('product_id', $product_id)->get();

        if (!$stock_history->count()) {
            return false;
        }

        return $stock_history;
    }

    /**
     * Add new stock history
     *
     * @param  Stock $stock
     * @param  int   $preset_number
     * @return void
     */
    public function addStockHistory(Stock $stock, int $preset_number)
    {
        $stock_history = new StockHistory;
        $stock_history->product_id = $stock->product_id;
        $stock_history->stock_id = $stock->id;
        $stock_history->shop_id = $stock->shop_id;
        $stock_history->set_date = now();
        $stock_history->preset_number = $preset_number;
        $stock_history->set_number = $stock->stock_number;
        $stock_history->save();
    }
}

