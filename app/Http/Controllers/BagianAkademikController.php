<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BagianAkademik;
use App\Models\Fakultas;
use App\Models\ProgramStudi;
use App\Models\Ruangan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BagianAkademikController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->get()->first();
        $fakultas = Fakultas::where('id_fakultas', $bagian_akademik->id_fakultas)->first();
        $bagian_akademik->nama_fakultas = $fakultas->nama_fakultas;
        $id_fakultas = $bagian_akademik->id_fakultas;

        $ruangan = Ruangan::where('id_fakultas', $id_fakultas)->get();
        return Inertia::render('(bagian-akademik)/dashboard-bagian-akademik/page', ['ruangan' => $ruangan,'bagian_akademik' => $bagian_akademik]);
    }
}
