<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;

class PagesController extends Controller
{

    public function init() {
        Excel::import(new UsersImport, 'users.xlsx');
        return "Uploaded";
    }

    public function index(Request $request): Response
    {

        $query = $request->search;
        if($query) {
            $models = User::where('validated', false)
                ->where(function($q) use($query) {
                    $q->where('name', 'LIKE', '%' . $query . '%')
                        ->orWhere('email', 'LIKE', '%' . $query . '%')
                        ->orWhere('phone', 'LIKE', '%' . $query . '%');
                })->latest()->paginate(10);
        }
        else {
            $models = User::where('validated', false)->latest()->paginate(10);
        }

        return Inertia::render('Welcome', [
           'models' => $models
        ]);
    }

    public function validated(Request $request): Response
    {
        $users = User::where('validated', true)->latest()->paginate(10);
        return Inertia::render('Validated', [
           'models' => $users
        ]);
    }

    public function checkIn($id)
    {
        $user = User::findOrFail($id);
        $user->validated = true;
        $user->save();

        //
        return redirect()->back();
    }
}
