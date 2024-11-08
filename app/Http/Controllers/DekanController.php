<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use \App\Models\Dosen;
use \App\Models\ProgramStudi;
use \App\Models\Fakultas;
use App\Models\Ruangan;

class DekanController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        $dosen = Dosen::where('user_id', $user->id)->get()->first();
        $programStudi = ProgramStudi::where('id_prodi', $dosen->id_prodi)->first();
        $dosen->nama_prodi = $programStudi->nama_prodi;
        $fakultas = Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first();
        $dosen->nama_fakultas = $fakultas->nama_fakultas;
        // $id_fakultas = $dosen->id_fakultas;

        $id_fakultas = ProgramStudi::where('id_prodi', $dosen->id_prodi)->value('id_fakultas');

        // Get the rooms where id_fakultas matches the user's id_fakultas
        $ruangan = Ruangan::where('id_fakultas', $id_fakultas)->get();
    
        // Sort the rooms by 'nama_ruang'
        $ruangan = $ruangan->sortBy('nama_ruang');
        // Join ruangan with ProgramStudi where id_prodi matches
        $ruangan = $ruangan->map(callback: function ($room) {
            $programStudi = ProgramStudi::where('id_prodi', $room->id_prodi)->first();
            $room->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
            return $room;
        })->values()->all();

        return Inertia::render('(dekan)/dashboard-dekan/page', 
        [
            'ruangan' => $ruangan,
            'dosen' => $dosen]);
    }
}
