<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenyetujuiJadwalController extends Controller
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

        return Inertia::render('(dekan)/setujui-jadwal/page', 
        [
            'dosen' => $dosen]);
    }
}
