<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $table = 'mst_size';

    protected $fillable = [
        'size_name',
        'size_description',
        'status',
    ];

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Get size all
     *
     * @param $request
     * @return void
     */
    public function getSize($per_page)
    {
        return Size::where('status', 1)->orderBy('size_name', 'asc')->paginate($per_page);
    }

    /**
     * Create size
     *
     * @param $request
     * @return boolean
     */
    public function createSize($request)
    {
        return Size::create($request->all());
    }

    /**
     * Show size by id
     *
     * @param $id
     * @return void
     */
    public function getSizeById($id)
    {
        return Size::where('status', 1)
            ->where('id', $id)
            ->first();
    }

    /**
     * Update size
     *
     * @param  $request $id
     * @return boolean
     */
    public function updateSize($request, $id)
    {
        
        return Size::where('status', 1)->where('id', $id)->update($request->all());
    }

    /**
     * Delete size by id
     *
     * @param $id
     * @return boolean
     */
    public function deleteSize($id)
    {
        $size = Size::find($id);
        if ($size->status == 0) {
            return;
        };

        $size->update(['status' => 0]);
        return $size;
    }
}

