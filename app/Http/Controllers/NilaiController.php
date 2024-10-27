<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NilaiController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $dosen = Dosen::where('user_id', $user->id)->get()->first();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        return Inertia::render('(dosen)/nilai/page', ['dosen' => $dosen]);
    }
}
