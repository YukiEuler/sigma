<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Models\Mahasiswa;
use App\Models\Dosen;
use App\Models\BagianAkademik;
class LoginController extends Controller
{
    public function login()
    {
        if (Auth::check()) {
            return redirect('/');
        }else{
            return inertia('Login');
        }
    }

    public function actionlogin(Request $request)
    {
        $data = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (Auth::Attempt($data)) {
            return redirect('/');
        }else{
            $mahasiswa = Mahasiswa::join('users', 'mahasiswa.user_id', 'users.id')->where('nim', $request->input('email'))->first();
            if ($mahasiswa){
                $data = [
                    'email' => $mahasiswa->email,
                    'password' => $request->input('password'),
                ];
                if (Auth::Attempt($data)) {
                    return redirect('/');
                }
            }
            $dosen = Dosen::join('users', 'dosen.user_id', 'users.id')->where('nip', $request->input('email'))->first();
            if ($dosen) {
                $data = [
                    'email' => $dosen->email,
                    'password' => $request->input('password'),
                ];
                if (Auth::Attempt($data)) {
                    return redirect('/');
                }
            }

            $bagianAkademik = BagianAkademik::join('users', 'bagian_akademik.user_id', 'users.id')->where('nip', $request->input('email'))->first();
            if ($bagianAkademik) {
                $data = [
                    'email' => $bagianAkademik->email,
                    'password' => $request->input('password'),
                ];
                if (Auth::Attempt($data)) {
                    return redirect('/');
                }
            }
            Session::flash('error', 'Email atau Password Salah');
            return back()->withErrors("Email atau Password Salah")->withInput();
        }
    }

    public function actionlogout()
    {
        Auth::logout();
        return redirect('/');
    }
}