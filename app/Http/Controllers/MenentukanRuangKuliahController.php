<?php

namespace App\Http\Controllers;

use App\Models\BagianAkademik;
use App\Models\Dosen;
use App\Models\Fakultas;
use App\Models\ProgramStudi;
use App\Models\Ruangan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();
        // Retrieve the id_fakultas of the authenticated user
        $fakultas = Fakultas::where('id_fakultas', $bagian_akademik->id_fakultas)->first();
        $bagian_akademik->nama_fakultas = $fakultas->nama_fakultas;
        $id_fakultas = $bagian_akademik->id_fakultas;

        // Get the rooms where id_fakultas matches the user's id_fakultas
        $ruangan = Ruangan::where('id_fakultas', $id_fakultas)->get();
    
        // Sort the rooms by 'nama_ruang'
        $ruangan = $ruangan->sortBy('nama_ruang');
        // Join ruangan with ProgramStudi where id_prodi matches
        $ruangan = $ruangan->map(callback: function ($room) {
            $programStudi = ProgramStudi::where('id_prodi', $room->id_prodi)->first();
            $room->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
            $room->jenjang = $programStudi ? $programStudi->jenjang : null;
            $fakultas = $programStudi ? Fakultas::where('id_fakultas', $programStudi->id_fakultas)->first() : null;
            $room->nama_fakultas = $fakultas ? $fakultas->nama_fakultas : null;
            return $room;
        })->values()->all();

        $programStudiList = ProgramStudi::where('id_fakultas', $bagian_akademik->id_fakultas)->get();
        // Return the view with the retrieved rooms
        return Inertia::render('(bagian-akademik)/kelola-ruangan/page', ['ruangan' => $ruangan, 'programStudiList' => $programStudiList,'bagian_akademik' => $bagian_akademik]);
    }

    public function editPage($id){
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Retrieve the bagian_akademik from the session
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();
        // Retrieve the id_fakultas of the authenticated user
        $fakultas = Fakultas::where('id_fakultas', $bagian_akademik->id_fakultas)->first();
        $bagian_akademik->nama_fakultas = $fakultas->nama_fakultas;

        // Retrieve the room by id
        $ruangan = Ruangan::find($id);
        // Print the room details to the console

        // Check if the room exists
        if (!$ruangan) {
            return redirect()->route('ruangan.index')->with('error', 'Ruangan not found.');
        }

        // Retrieve the program studi associated with the room
        $programStudi = ProgramStudi::where('id_prodi', $ruangan->id_prodi)->first();
        $ruangan->nama_prodi = $programStudi ? $programStudi->nama_prodi : null;
        $ruangan->nama_fakultas = $fakultas->nama_fakultas;

        // Get all program studi where id_fakultas matches the bagian_akademik's id_fakultas
        $programStudiList = ProgramStudi::where('id_fakultas', $bagian_akademik->id_fakultas)->get();

        // Pass the program studi list to the view
        return Inertia::render('(bagian-akademik)/kelola-ruangan/edit', [
            'ruangan' => $ruangan,
            'programStudiList' => $programStudiList,
            'bagian_akademik' => $bagian_akademik
        ]);
    }

    public function update(Request $request)
    {
        $user = Auth::user();
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }
        
        try{
            $id_ruang = $request->input('id_ruang');
            $id_prodi = $request->input('id_prodi');
            $nama_ruang = $request->input('nama_ruang');
            $kuota = $request->input('kuota');
            // Validate input
            if (!$nama_ruang || !$kuota) {
                // return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Nama ruang dan kuota harus diisi.');
                return response()->json([
                    'error' => 'Nama ruang dan kuota harus diisi.'
                ], 422);
            }

            // Retrieve the room by id
            $ruangan = Ruangan::where('id_ruang', $id_ruang)->first();

            // Check if the room exists
            if (!$ruangan) {
                // return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Ruangan not found.');
                return response()->json([
                    'error' => 'Ruangan tidak ditemukan.'
                ], 404);
            }

            // Retrieve the program studi and check if it exists
            $programStudi = ProgramStudi::where('id_prodi', $id_prodi)->first();
            if (!$programStudi) {
                // return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Program Studi not found.');
                return response()->json([
                    'error' => 'Program Studi tidak ditemukan.'
                ], 404);
            }

            // Now we can safely check fakultas
            if ($programStudi->id_fakultas !== $ruangan->id_fakultas){
                // return redirect()->route('bagianAkademik.aturRuang')->with('error', 'Fakultas tidak sama.');
                return response()->json([
                    'error' => 'Fakultas tidak sama.'
                ], 422);
            }

            if ($ruangan->nama_ruang !== $nama_ruang) {
                $exists = Ruangan::where('nama_ruang', $nama_ruang)
                    ->where('id_fakultas', $ruangan->id_fakultas)
                    ->exists();
            
                if ($exists) {
                    return response()->json([
                        'error' => 'Nama ruang sudah ada di fakultas yang sama.'
                    ], 422);
                }
            }

            // Update the room's details
            $ruangan->id_prodi = $id_prodi;
            $ruangan->nama_ruang = $nama_ruang;
            $ruangan->kuota = $kuota;
            $ruangan->save();

        // Redirect back with success message
        // return redirect()->back()->with('success', 'Ruangan updated successfully.');
        return response()->json([
            'success' => true
        ]);

        } catch (\Exception $e) {
            // return redirect()->back()->with('error', 'Terjadi kesalahan saat mengupdate ruangan.');
            return response()->json([
                'error' => 'Terjadi kesalahan saat mengupdate ruangan.'
            ], 500);
        }
    }

    public function ajukanRuang($id)
    {
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        } elseif ($user->role !== 'Bagian Akademik'){
            return response()->json(['error' => 'Forbidden'], 403);
        }

        // Retrieve the room by id
        $ruangan = Ruangan::where('id_ruang', $id)->first();

        // Check if the room exists
        if (!$ruangan) {
            return response()->json(['error' => 'Ruangan tidak ditemukan.'], 404);
        }

        // Check if room is already submitted
        if ($ruangan->diajukan == 1) {
            return response()->json(['error' => 'Ruangan sudah diajukan sebelumnya.'], 422);
        }

        try {
            // Update the room's submission status
            $ruangan->diajukan = 1;
            $ruangan->save();

            return response()->json([
                'success' => true,
                'message' => 'Ruangan berhasil diajukan untuk persetujuan.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan saat mengajukan ruangan.'
            ], 500);
        }
    }

    public function ajukanMultipleRuang(Request $request)
    {
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Validate the request
        $request->validate([
            'room_ids' => 'required|array',
            'room_ids.*' => 'required|integer|exists:ruangan,id_ruang'
        ]);

        // Get bagian_akademik data to check fakultas
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();
        
        try {
            // Start database transaction
            DB::beginTransaction();

            // Get all rooms that match the IDs and belong to the user's fakultas
            $rooms = Ruangan::whereIn('id_ruang', $request->room_ids)->where('id_fakultas', $bagian_akademik->id_fakultas)->get();

            // Validate that all rooms exist and belong to the correct fakultas
            if ($rooms->count() !== count($request->room_ids)) {
                return back()->with('error', 'Beberapa ruangan tidak ditemukan atau tidak termasuk dalam fakultas');
            }

            // Check if any rooms are already submitted or approved
            $invalidRooms = $rooms->filter(function ($room) {
                return $room->diajukan == 1 || $room->disetujui == 1;
            });

            if ($invalidRooms->count() > 0) {
                return back()->with('error', 'Beberapa ruangan sudah diajukan atau disetujui');
            }

            // Update all rooms
            foreach ($rooms as $room) {
                $room->diajukan = 1;
                $room->save();
            }

            // Commit transaction
            DB::commit();

            return back()->with('success', 'Ruangan berhasil diajukan untuk persetujuan.');
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();

            return back()->with('error', 'Terjadi kesalahan saat mengajukan ruangan.');
        }
    }

    public function batalkanRuang($id)
    {
        $user = Auth::user();

        // Check if user is authenticated
        if (!$user) {
            return redirect()->route('login');
        } elseif ($user->role !== 'Bagian Akademik'){
            return redirect()->route('home');
        }

        // Retrieve the room by id
        $ruangan = Ruangan::find($id);

        // Check if the room exists
        if (!$ruangan) {
            return back()->with('error', 'Ruangan tidak ditemukan.');
        }

        // Check if room can be cancelled (diajukan = 1 and disetujui = 0)
        if ($ruangan->diajukan == 0 || $ruangan->disetujui == 1) {
            return back()->with('error', 'Ruangan tidak dapat dibatalkan.');
        }

        try {
            // Update the room's submission status
            $ruangan->diajukan = 0;
            $ruangan->save();

            return back()->with('success', 'Pengajuan ruangan berhasil dibatalkan.');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan saat membatalkan pengajuan ruangan.');
        }
    }

    public function tambahRuang(Request $request)
    {
        $user = Auth::user();
        $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();

        try {
            $validated = $request->validate([
                'nama_ruang' => 'required|string|max:100',
                'kuota' => 'required|integer|min:1',
                'id_prodi' => 'required|integer|exists:program_studi,id_prodi'
            ], [
                'nama_ruang.required' => 'Nama ruangan wajib diisi!',
                'nama_ruang.max' => 'Nama ruangan maksimal 100 karakter!',
                'kuota.required' => 'Kuota wajib diisi!',
                'kuota.min' => 'Kuota minimal 1!',
                'id_prodi.required' => 'Program studi wajib diisi!',
                'id_prodi.exists' => 'Program studi tidak ditemukan!'
            ]);

            $exists = Ruangan::where('nama_ruang', $validated['nama_ruang'])
                        ->where('id_fakultas', $bagian_akademik->id_fakultas)
                        ->exists();

            if ($exists) {
                return response()->json([
                    'error' => 'Ruangan dengan nama yang sama sudah ada dalam fakultas.'
                ], 422);
            }

            $ruangan = Ruangan::create([
                'nama_ruang' => $validated['nama_ruang'],
                'kuota' => $validated['kuota'],
                'id_fakultas' => $bagian_akademik->id_fakultas,
                'id_prodi' => $validated['id_prodi'],
                'diajukan' => 0,
                'disetujui' => 0
            ]);

            if (!$ruangan) {
                return response()->json([
                    'error' => 'Gagal menambahkan ruangan.'
                ], 422);
            }

            return response()->json([
                'success' => true
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan saat menambahkan ruangan.'
            ], 422);
        }
    }

    // public function batalkanMultipleRuang(Request $request)
    // {
    //     // Validate the request
    //     $request->validate([
    //         'room_ids' => 'required|array',
    //         'room_ids.*' => 'required|integer|exists:ruangan,id_ruang'
    //     ]);

    //     $user = Auth::user();

    //     // Check if user is authenticated
    //     if (!$user) {
    //         return response()->json([
    //             'message' => 'Unauthorized'
    //         ], 401);
    //     } 
        
    //     if ($user->role !== 'Bagian Akademik') {
    //         return response()->json([
    //             'message' => 'Forbidden'
    //         ], 403);
    //     }

    //     // Get bagian_akademik data to check fakultas
    //     $bagian_akademik = BagianAkademik::where('user_id', $user->id)->first();
        
    //     try {
    //         // Start database transaction
    //         DB::beginTransaction();

    //         // Get all rooms that match the IDs and belong to the user's fakultas
    //         $rooms = Ruangan::whereIn('id_ruang', $request->room_ids)
    //                       ->where('id_fakultas', $bagian_akademik->id_fakultas)
    //                       ->get();

    //         // Validate that all rooms exist and belong to the correct fakultas
    //         if ($rooms->count() !== count($request->room_ids)) {
    //             throw new \Exception('Some rooms were not found or do not belong to your fakultas');
    //         }

    //         // Check if any rooms are already approved
    //         $invalidRooms = $rooms->filter(function ($room) {
    //             return $room->disetujui == 1;
    //         });

    //         if ($invalidRooms->count() > 0) {
    //             throw new \Exception('Some rooms are already approved and cannot be cancelled');
    //         }

    //         // Update all rooms
    //         foreach ($rooms as $room) {
    //             $room->diajukan = 0;
    //             $room->save();
    //         }

    //         // Commit transaction
    //         DB::commit();

    //         return response()->json([
    //             'message' => 'Room submissions cancelled successfully',
    //             'updated_count' => $rooms->count()
    //         ]);

    //     } catch (\Exception $e) {
    //         // Rollback transaction on error
    //         DB::rollBack();

    //         return response()->json([
    //             'message' => 'Failed to cancel room submissions: ' . $e->getMessage()
    //         ], 500);
    //     }
    // }
}
