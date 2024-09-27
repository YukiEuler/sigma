<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BagianAkademikController extends Controller
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
        return Inertia::render('(bagian-akademik)/dashboard-bagian-akademik/page', [
            'user' => $user,
            'mahasiswa' => $mahasiswa,
        ]);
    }
}
