<?php

use App\Http\Controllers\MahasiswaController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\BagianAkademikController;
use App\Http\Controllers\DekanController;
use App\Http\Controllers\MenentukanRuangKuliahController;
use App\Http\Controllers\MenyetujuiRuangKuliah;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KaprodiController;
use App\Http\Controllers\NilaiController;
use App\Http\Controllers\PerwalianController;
use App\Http\Controllers\AkademikMhsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');

Route::get('/login', [LoginController::class, 'login'])->name('login');
Route::post('actionlogin', [LoginController::class, 'actionlogin'])->name('actionlogin');

// Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('auth');
Route::get('actionlogout', [LoginController::class, 'actionlogout'])->name('actionlogout')->middleware('auth');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login');
})->name('logout');

Route::get('register', [RegisterController::class, 'register'])->name('register');
Route::post('register/action', [RegisterController::class, 'actionregister'])->name('actionregister');

Route::get('bagian-akademik/dashboard', [BagianAkademikController::class, 'index'])->name('bagianAkademik.dashboard')->middleware(['auth', 'validateRole:Bagian Akademik']);
Route::get('bagian-akademik/atur-ruang', [MenentukanRuangKuliahController::class, 'index'])->name('bagianAkademik.aturRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);
Route::get('bagian-akademik/atur-ruang/edit/{id}', [MenentukanRuangKuliahController::class, 'editPage'])->name('bagianAkademik.editRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);
Route::post('bagian-akademik/atur-ruang/update', [MenentukanRuangKuliahController::class, 'update'])->name('bagianAkademik.updateRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);

Route::get('mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/akademik', [AkademikMhsController::class, 'index'])->name('mahasiswa.akademik')->middleware(['auth', 'validateRole:Mahasiswa']);


Route::get('dekan/dashboard', [DekanController::class, 'index'])->name('dekan.dashboard')->middleware(['auth', 'validateRole:Dekan']);
Route::get('dekan/setujui-ruang', [MenyetujuiRuangKuliah::class, 'index'])->name('dekan.setujuiRuang')->middleware(['auth', 'validateRole:Dekan']);
Route::get('dekan/setujui-ruang/{id}', [MenyetujuiRuangKuliah::class, 'update'])->name('dekan.updateStatusRuang')->middleware(['auth', 'validateRole:Dekan']);

Route::get('dosen/dashboard', [DosenController::class, 'index'])->name('dosen.dashboard')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/nilai', [NilaiController::class, 'index'])->name('dosen.nilai')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/perwalian', [PerwalianController::class, 'index'])->name('dosen.perwalian')->middleware(['auth', 'validateRole:Dosen']);

Route::get('kaprodi/dashboard', [KaprodiController::class, 'index'])->name('kaprodi.dashboard')->middleware(['auth', 'validateRole:Kaprodi']);