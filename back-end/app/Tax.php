<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $table = 'config';

    protected $fillable = ['name', 'value', 'created_date', 'updated_date'];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Get tax
     *
     * @param  null  
     * @return  Tax
     */
    public function getTaxes(){
        return Tax::where('name', 'tax')->orWhere('name', 'member_tax')->get();
    }

    /**
     * Update tax
     *
     * @param  App\Http\Requests\TaxRequest  
     * @return  null
     */
    public function updaeTaxes($request){
        Tax::where('name', 'tax')
            ->update([
                'value' => $request->tax_value,
                'updated_date' => now()
            ]);

        Tax::where('name', 'member_tax')
            ->update([
                'value' => $request->member_value,
                'updated_date' => now()
            ]);
    }
}

