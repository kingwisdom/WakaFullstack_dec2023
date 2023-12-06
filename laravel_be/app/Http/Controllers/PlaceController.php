<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;
use DB;

class PlaceController extends Controller
{
    //
    public function index()
    {
        try {
            $datas = Place::orderBy('created_at', 'desc')->get();
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
    public function get_by_city($cityId)
    {
        try {
            $datas = Place::where('cityId', $cityId)->get();
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
    public function get_by_category($categoryId)
    {
        try {
            $datas = Place::where('categoryId', $categoryId)->get();
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
    public function group_by_category()
    {
        try {

            $placeCat = DB::table('categories')
                ->join('places', 'categories.id', '=', 'places.categoryId')
                ->select('categories.name as categoryName', 'places.id as placeId')
                ->get();

            $grouping = collect($placeCat)->groupBy('categoryName');

            $resModel = collect([]);
            foreach ($grouping as $categoryName => $places) {
                $resModel->push(['categoryName' => $categoryName, 'count' => count($places)]);
            }

            return response()->json([
                'status' => true,
                'response' => 'Successful',
                'returnObj' => $resModel->toArray(),
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'returnObj' => null,
                "message" => $th->getMessage()
            ]);
        }
    }
}
