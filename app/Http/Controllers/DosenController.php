<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DosenController extends Controller
{
    public function index()
    {
        return Inertia::render('(dosen)/dashboard-dosen/page');
    }
}
