<?php
// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show($id)
    {
        // Retrieve the user by ID
        $user = User::find($id);

        // Check if user exists
        if (!$user) {
            abort(404, 'User not found');
        }

        // Pass the user to the view
        return Inertia::render('User/Show', [
            'user' => $user
        ]);
        // return view('home', compact('user'));
    }
}