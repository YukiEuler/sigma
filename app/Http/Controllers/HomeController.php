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
        }

        // Retrieve Mahasiswa with the same user_id
        $mahasiswa = \App\Models\Mahasiswa::where('user_id', $user->id)->first();

        // Pass the user to the Inertia view
        return Inertia::render('Home', [
            'user' => $user,
            'mahasiswa' => $mahasiswa,
        ]);
    }
}