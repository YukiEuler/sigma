<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use \App\Models\Dosen;
use \App\Models\ProgramStudi;
use \App\Models\Fakultas;

class DosenController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        return Inertia::render('(dosen)/dashboard-dosen/page', ['dosen' => $dosen]);
    }
}
