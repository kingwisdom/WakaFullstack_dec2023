<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManageController;
use App\Http\Controllers\PlaceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//category
Route::controller(ManageController::class)->group(function () {
    Route::get('category', 'get_categories');
    Route::post('category', 'post_category');
    Route::get('city', 'get_cities');
    Route::post('city', 'post_city');
});

Route::controller(PlaceController::class)->group(function () {
    Route::get('places', 'index');
    Route::get('place/cityplace/{cityId}', 'get_by_city');
    Route::get('place/categoryplace/{categoryId}', 'get_by_category');
    Route::get('place/placeInCat', 'group_by_category');
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
