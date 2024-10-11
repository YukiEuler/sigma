<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $dosen = \App\Models\Dosen::where('user_id', $user->id)->get()->first();
        return Inertia::render('(dosen)/dashboard-dosen/page', ['dosen' => $dosen]);
    }
}
