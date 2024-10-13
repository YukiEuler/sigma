<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BagianAkademik;
use App\Models\Fakultas;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BagianAkademikController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->get()->first();
        $fakultas = Fakultas::where('id_fakultas', $bagian_akademik->id_fakultas)->first();
        $bagian_akademik->nama_fakultas = $fakultas->nama_fakultas;
        error_log($bagian_akademik);
        return Inertia::render('(bagian-akademik)/dashboard-bagian-akademik/page', ['bagian_akademik' => $bagian_akademik]);
    }
}
