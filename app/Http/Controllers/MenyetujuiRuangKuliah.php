<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\ProgramStudi;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MenyetujuiRuangKuliah extends Controller
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

        $id_fakultas = ProgramStudi::where('id_prodi', $dosen->id_prodi)->value('id_fakultas');

        // Get the rooms where id_fakultas matches the user's id_fakultas
        $ruangan = Ruangan::where('id_fakultas', $id_fakultas)->where('diajukan', 1)->get();
    
        // Sort the rooms by 'nama_ruang'
        $ruangan = $ruangan->sortBy('nama_ruang');
        // Join ruangan with ProgramStudi where id_prodi matches
        $ruangan = $ruangan->map(callback: function ($room) {
            $programStudi = ProgramStudi::where('id_prodi', $room->id_prodi)->first();
            $room->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
            return $room;
        })->values()->all();

        return Inertia::render('(dekan)/setujui-ruang/page', 
        [
            'ruangan' => $ruangan,
            'dosen' => $dosen]);
    }

    public function update($id_ruang)
    {
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        // Find the room by id_ruang
        $ruangan = Ruangan::find($id_ruang);

        // Check if the room exists
        if (!$ruangan) {
            return redirect()->back()->with('error', 'Ruangan tidak dapat ditemukan.');
        }

        if ($ruangan->disetujui == 1) {
            return redirect()->back()->with('error', 'Ruangan sudah disetujui.');
        }
        
        try{
            // Update the 'disetujui' attribute to true
            $ruangan->disetujui = 1;
            $ruangan->save();

            return back()->with('success', 'Ruangan berhasil disetujui.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat menyetujui ruangan.');
        }
    }
    public function setujuiMultipleRuang(Request $request)
    {
        $user = Auth::user();

        // Check if user is authenticated and has proper role
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        // Validate the request
        $request->validate([
            'room_ids' => 'required|array',
            'room_ids.*' => 'required|exists:ruangan,id_ruang'
        ]);

        try {
            // Begin transaction
            DB::beginTransaction();

            // Get all rooms that match the IDs, are already proposed (diajukan = 1),
            // and not yet approved (disetujui = 0)
            $rooms = Ruangan::whereIn('id_ruang', $request->room_ids)
                          ->where('diajukan', 1)
                          ->where('disetujui', 0)
                          ->get();

            // Update all matching rooms
            foreach ($rooms as $room) {
                $room->disetujui = 1;
                $room->save();
            }

            // Commit transaction
            DB::commit();

            return back()->with('success', 'Ruangan berhasil disetujui.');

        } catch (\Exception $e) {
            // Rollback in case of error
            DB::rollBack();
            
            return back()->with('error', 'Terjadi kesalahan saat menyetujui ruangan.');
        }
    }
}
