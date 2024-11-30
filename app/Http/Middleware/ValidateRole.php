<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Dosen;

class ValidateRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = Auth::user();

        // Jika pengguna tidak terautentikasi
        if (!$user) {
            return redirect()->route('login');
        }

        // Jika pengguna bukan Dosen, tetapi peran memerlukan validasi 'Kaprodi' atau 'Dekan'
        if (($role === 'Kaprodi' || $role === 'Dekan') && $user->role !== 'Dosen') {
            return redirect('/');
        }

        // Jika role 'Kaprodi' atau 'Dekan', validasi atribut dosen
        if ($user->role === 'Dosen') {
            $dosen = Dosen::where('user_id', $user->id)->first();

            // Jika data dosen tidak ditemukan
            if (!$dosen) {
                return redirect('/');
            }

            // Validasi Kaprodi
            if ($role === 'Kaprodi' && $dosen->kaprodi != 1) {
                return redirect('/');
            }

            // Validasi Dekan
            if ($role === 'Dekan' && $dosen->dekan != 1) {
                return redirect('/');
            }
        }

        // Jika role lain, validasi user role
        if ($role !== 'Kaprodi' && $role !== 'Dekan' && $user->role !== $role) {
            return redirect('/');
        }

        return $next($request);
    }
}
