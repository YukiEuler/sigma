<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AkademikMhsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $mahasiswa = Mahasiswa::where('user_id', $user->id)->get()->first();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Mahasiswa'){
            return redirect()->route('home');
        }

        return Inertia::render('(mahasiswa)/akademik/page', ['mahasiswa' => $mahasiswa]);
    }
}
