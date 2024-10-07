<?php
// app/Http/Controllers/HomeController.php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Retrieve the currently authenticated user
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role === 'Mahasiswa'){
            return redirect()->route('mahasiswa.dashboard');
        } elseif ($user->role === 'Dosen'){
            return redirect()->route('dosen.dashboard');
        } elseif ($user->role === 'Bagian Akademik'){
            return redirect()->route('bagianAkademik.dashboard');
        }
    }
}