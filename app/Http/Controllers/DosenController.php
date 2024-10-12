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
        $programStudi = \App\Models\ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = \App\Models\Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        return Inertia::render('(dosen)/dashboard-dosen/page', ['dosen' => $dosen]);
    }
}
