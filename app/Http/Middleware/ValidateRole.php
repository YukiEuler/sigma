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
        if (!$user){
            return redirect()->route('login');
        } elseif ($role === 'Kaprodi' || $role === 'Dekan'){
            if ($user->role !== 'Dosen'){
                return redirect("/");
            }
            $dosen = Dosen::where('user_id', $user->id)->first();
            if ($role === 'Kaprodi' && $dosen->kaprodi === '0'){
                return redirect("/");
            }
            if ($role === 'Dekan' && $dosen->dekan === '0'){
                return redirect("/");
            }
        }
        elseif ($user->role !== $role) {
            return redirect("/");
        }
        
        return $next($request);
    }
}
