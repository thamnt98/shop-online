<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = 'mst_color';
    protected $fillable = [
        'color_name', 'rgb', 'created_date', 'updated_date', 'status'
    ];
    public $primaryKey = 'id';

    const CREATED_AT = 'created_date';
    const UPDATED_AT = 'updated_date';

    /**
     * Get a listing of the color.
     *
     * @return App\Color::paginate
     */
    public function getAll($per_page = 1)
    {
        return Color::where('status', 1)->orderBy('color_name', 'asc')->paginate($per_page);
    }

    /**
     * Find the specified color.
     *
     * @param  int  $id
     * @return App\Color
     */
    public function getShow($id)
    {
        $color =  Color::find($id);

        if ($color && $color->status != 0) {
            return $color;
        }
    }

    /**
     * Update the specified color.
     *
     * @param  int  $id
     * @return App\Color
     */
    public function getUpdate($request, $id)
    {
        $color =  Color::find($id);

        if ($color && $color->status != 0) {
            $color->update($request->all());
            return $color;
        }
    }

    /**
     * Add the specified color.
     *
     * @param  int  $id
     * @return App\Color
     */
    public function getStore($request)
    {
        $color = Color::create($request->all());

        return $color;
    }

    /**
     * Remove the specified color from storage.
     *
     * @param  int  $id
     * @return boolean
     */
    public function getDelete($id)
    {
        $color =  Color::find($id);

        if ($color && $color->status == 1) {
            $color->status = 0;
            $color->save();
            return true;
        }

        return false;
    }
}

