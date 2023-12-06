<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Models\Category;
use Illuminate\Http\Request;

class ManageController extends Controller
{
    //
    public function get_categories()
    {
        try {
            $datas = Category::orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => true,
                'returnObj' => $datas,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'returnObj' => null,
                "message" => $th->getMessage()
            ]);
        }
    }
    public function post_category()
    {

    }

    public function get_cities()
    {
        try {
            $datas = City::orderBy('created_at', 'desc')->get();
            return response()->json([
                'status' => true,
                'returnObj' => $datas,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'returnObj' => null,
                "message" => $th->getMessage()
            ]);
        }
    }
    public function post_city()
    {

    }
}
