<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Stock;

class InStock extends Model
{
    protected $table = 'in_stock';
    protected $fillable = [
        'product_id', 'shop_id', 'in_number'
    ];
    public $primaryKey = 'id';

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Add new in stock
     *
     * @param  Stock $stock
     * @param  int   $add_number
     * @return void
     */
    public function addInStock(Stock $stock, int $add_number)
    {
        $in_stock = new InStock();
        $in_stock->product_id = $stock->product_id;
        $in_stock->shop_id = $stock->shop_id;
        $in_stock->in_number = $add_number;
        $in_stock->in_date = now();
        $in_stock->save();
    }
}
