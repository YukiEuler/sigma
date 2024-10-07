<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MenentukanRuangKuliahController extends Controller
{
    public function index(){
        // Retrieve the currently authenticated user
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Retrieve the bagian_akademik from the session
        $bagian_akademik = \App\Models\BagianAkademik::where('user_id', $user->id)->first();
        // Retrieve the id_fakultas of the authenticated user
        $id_fakultas = $bagian_akademik->id_fakultas;

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
        return Inertia::render('(bagian-akademik)/kelola-ruangan/page', ['ruangan' => $ruangan]);
    }

    public function editPage($id){
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Retrieve the room by id
        $ruangan = \App\Models\Ruangan::find($id);
        // Print the room details to the console

        // Check if the room exists
        if (!$ruangan) {
            return redirect()->route('ruangan.index')->with('error', 'Ruangan not found.');
        }

        // Retrieve the program studi associated with the room
        $programStudi = \App\Models\ProgramStudi::where('id_prodi', $ruangan->id_prodi)->first();
        $ruangan->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;

        // Retrieve the bagian_akademik from the session
        $bagianAkademik = \App\Models\BagianAkademik::where('user_id', $user->id)->first();

        // Get all program studi where id_fakultas matches the bagian_akademik's id_fakultas
        $programStudiList = \App\Models\ProgramStudi::where('id_fakultas', $bagianAkademik->id_fakultas)->get();

        // Pass the program studi list to the view
        return Inertia::render('(bagian-akademik)/kelola-ruangan/edit', [
            'ruangan' => $ruangan,
            'programStudiList' => $programStudiList
        ]);
    }

    public function update(Request $request)
    {
        $id_ruang = $request->input('id_ruang');
        $id_prodi = $request->input('id_prodi');

        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Retrieve the room by id
        $ruangan = \App\Models\Ruangan::find($id_ruang);

        // Check if the room exists
        if (!$ruangan) {
            return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Ruangan not found.');
        }

        // Retrieve the program studi associated with the room
        $programStudi = \App\Models\ProgramStudi::where('id_prodi', $id_prodi)->first();
        if ($programStudi->id_fakultas !== $ruangan->id_fakultas){
            return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Fakultas tidak sama.');
        }

        // Update the room's id_prodi
        $ruangan->id_prodi = $id_prodi;
        $ruangan->save();

        // Redirect back with success message
        return redirect()->back()->with('success', 'Ruangan updated successfully.');
    }
}
