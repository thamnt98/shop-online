<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\PrefResources;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Pref;


class PrefController extends Controller
{
    protected $pref;

    /**
     * __constructor
     *
     * @param Pref $pref
     */
    public function __construct(Pref $pref)
    {
        $this->pref = $pref;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pref = new Pref();
        $result = $pref->getAllPref();
        return PrefResources::collection($result);
        return response()->json("Not found ", Response::HTTP_NOT_FOUND);
    }

    /**
     *  Get Pref by Id
     *
     * @param [type] $id
     * @return void
     */
    public function show($id)
    {
        $result = $this->pref->getPrefById($id);
        if ($result) {
            return new PrefResources($result);
        }
        return response()->json(['message' => 'error'], 400);
    }
}

