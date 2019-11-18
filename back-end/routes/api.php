<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['namespace' => 'Api', 'prefix' => 'v1'], function () {
    Route::middleware('auth:api')->resource('services', 'ServiceController');

    Route::middleware('auth:api')->Resource('pref', 'PrefController');

    Route::middleware('auth:api')->Resource('shops', 'ShopController');

    Route::middleware('auth:api')->Resource('rentals', 'RentalController');

    Route::get('/shop/dropdown', 'ShopController@getShopDropDown');

    Route::prefix('admin')->group(function () {
        Route::post('login', ['uses' => 'AdminController@login', 'as' => 'admin.login']);
        Route::middleware('auth:api')->get('getUserById', ['uses' => 'AdminController@getUserById', 'as' => 'admin.getUserById']);
        Route::middleware('auth:api')->post('logout', ['uses' => 'AdminController@logout', 'as' => 'admin.logout']);
        Route::middleware('auth:api')->post('distinctLogout', ['uses' => 'AdminController@distinctLogout', 'as' => 'admin.distinctLogout']);
        Route::middleware('auth:api')->post('changePassword', ['uses' => 'AdminController@changePassword', 'as' => 'admin.changePassword']);
    });

    Route::middleware('auth:api')->Resource('sizes', 'SizeController');

    Route::prefix('taxs')->group(function () {
        Route::get('', 'TaxController@index');
        Route::post('update', 'TaxController@update');
    });

    Route::middleware('auth:api')->Resource('colors', 'ColorController');

    Route::middleware('auth:api')->get('shop/list', 'ShopController@getListShop');

    Route::middleware('auth:api')->Resource('customerTypes', 'CustomerTypeController');

    Route::middleware('auth:api')->get('service/list', 'ServiceController@listService');

    Route::middleware('auth:api')->Resource('suppliers', 'SupplierController');

    Route::middleware('auth:api')->Resource('producers', 'ProducerController');

    Route::middleware('auth:api')->Resource('zipcodes', 'ZipCodeController');

    Route::middleware('auth:api')->Resource('staffs', 'StaffController');
    Route::group(['prefix' => 'staffs'], function () {
        Route::middleware('auth:api')->post('changePassword', 'StaffController@changePassword');
        Route::middleware('auth:api')->get('zipcode/{code}', 'Staffcontroller@getZipcodeInfo');
    });

    Route::middleware('auth:api')->get('producer/maxcode', 'ProducerController@getMaxProducerCode');

    Route::middleware('auth:api')->patch('stocks/set', 'StockController@setStockNumber');
    Route::middleware('auth:api')->patch('stocks/plus', 'StockController@plusStockNumber');
    Route::middleware('auth:api')->patch('stocks/plus/multi', 'StockController@plusMultiStockNumber');

    Route::middleware('auth:api')->get('history', 'StockHistoryController@index');
    
    Route::middleware('auth:api')->get('/products/history', 'ProductHistoryController@ProductHistory');

    Route::middleware('auth:api')->Resource('products', 'ProductController');

    Route::middleware('auth:api')->post('products/move', 'ProductController@moveProductToStore');

    Route::middleware('auth:api')->post('product/history/search', 'ProductHistoryController@searchProductHistory');
    
    Route::middleware('auth:api')->post('products/multiMove', 'ProductController@multiMoveProductToStore');
});

