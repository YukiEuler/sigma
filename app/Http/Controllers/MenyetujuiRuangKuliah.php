<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenyetujuiRuangKuliah extends Controller
{
    public function index(){
        // Retrieve the currently authenticated user
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Dosen'){
            return redirect()->route('home');
        }

        // Retrieve the bagian_akademik from the session
        $dosen = \App\Models\Dosen::where('user_id', $user->id)->first();

        // Retrieve the id_fakultas of the authenticated user
        $id_fakultas = \App\Models\ProgramStudi::where('id_prodi', $dosen->id_prodi)->value('id_fakultas');

        // Get the rooms where id_fakultas matches the user's id_fakultas
        $ruangan = \App\Models\Ruangan::where('id_fakultas', $id_fakultas)->get();
    
        // Sort the rooms by 'nama_ruang'
        $ruangan = $ruangan->sortBy('nama_ruang');
        // Join ruangan with ProgramStudi where id_prodi matches
        $ruangan = $ruangan->map(callback: function ($room) {
            $programStudi = \App\Models\ProgramStudi::where('id_prodi', $room->id_prodi)->first();
            $room->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
            return $room;
        })->values()->all();
        // Return the view with the retrieved rooms
        return Inertia::render('(dekan)/setujui-ruang/page', ['ruangan' => $ruangan]);
    }

    public function update($id_ruang)
    {
        // Find the room by id_ruang
        $ruangan = \App\Models\Ruangan::find($id_ruang);

        // Check if the room exists
        if (!$ruangan) {
            return redirect()->back()->with('error', 'Ruangan tidak dapat ditemukan.');
        }

        // Update the 'disetujui' attribute to true
        $ruangan->disetujui = true;
        $ruangan->save();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Ruangan berhasil diupdate.');
    }
}
