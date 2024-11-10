<?php

use App\Http\Controllers\AturJadwalController;
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
use App\Http\Controllers\DataMahasiswaController;
use App\Http\Controllers\DataMKController;
use App\Http\Controllers\BiayaController;
use App\Http\Controllers\MenyetujuiJadwalController;
use App\Http\Controllers\RegistrasiController;
use App\Http\Controllers\RekapIRSController;

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
Route::post('bagian-akademik/atur-ruang/ajukan/{id}', [MenentukanRuangKuliahController::class, 'ajukanRuang'])->name('bagianAkademik.ajukanRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);
Route::post('bagian-akademik/atur-ruang/ajukan-multiple', [MenentukanRuangKuliahController::class, 'ajukanMultipleRuang'])->name('bagianAkademik.ajukanMultipleRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);
ROute::post('bagian-akademik/atur-ruang/batalkan/{id}', [MenentukanRuangKuliahController::class, 'batalkanRuang'])->name('bagianAkademik.batalkanRuang')->middleware(['auth', 'validateRole:Bagian Akademik']);

Route::get('mahasiswa/dashboard', [MahasiswaController::class, 'index'])->name('mahasiswa.dashboard')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/akademik', [AkademikMhsController::class, 'index'])->name('mahasiswa.akademik')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/registrasi', [RegistrasiController::class, 'index'])->name('mahasiswa.registrasi')->middleware(['auth', 'validateRole:Mahasiswa']);
Route::get('mahasiswa/biaya', [BiayaController::class, 'index'])->name('mahasiswa.biaya')->middleware(['auth', 'validateRole:Mahasiswa']);

Route::get('dekan/dashboard', [DekanController::class, 'index'])->name('dekan.dashboard')->middleware(['auth', 'validateRole:Dekan']);
Route::get('dekan/setujui-ruang', [MenyetujuiRuangKuliah::class, 'index'])->name('dekan.setujuiRuang')->middleware(['auth', 'validateRole:Dekan']);
Route::post('dekan/setujui-ruang/{id}', [MenyetujuiRuangKuliah::class, 'update'])->name('dekan.updateStatusRuang')->middleware(['auth', 'validateRole:Dekan']);
Route::post('dekan/setujui-ruang/setujui-multiple', [MenyetujuiRuangKuliah::class, 'setujuiMultipleRuang'])->name('dekan.setujuiMultipleRuang')->middleware(['auth', 'validateRole:Dekan']);
Route::get('dekan/setujui-jadwal', [MenyetujuiJadwalController::class, 'index'])->name('dekan.setujuiJadwal')->middleware(['auth', 'validateRole:Dekan']);

Route::get('dosen/dashboard', [DosenController::class, 'index'])->name('dosen.dashboard')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/rekap-irs', [RekapIRSController::class, 'index'])->name('dosen.rekapIRS')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/perwalian', [PerwalianController::class, 'index'])->name('dosen.perwalian')->middleware(['auth', 'validateRole:Dosen']);
Route::get('dosen/perwalian/detail/{id}', [PerwalianController::class, 'detail'])->name('dosen.detailmhs')->middleware(['auth', 'validateRole:Dosen']);

Route::get('kaprodi/dashboard', [KaprodiController::class, 'index'])->name('kaprodi.dashboard')->middleware(['auth', 'validateRole:Kaprodi']);
Route::get('kaprodi/data-mahasiswa', [DataMahasiswaController::class, 'index'])->name('kaprodi.dataMahasiswa')->middleware(['auth', 'validateRole:Kaprodi']);
Route::get('kaprodi/data-matakuliah', [DataMKController::class, 'index'])->name('kaprodi.dataMataKuliah')->middleware(['auth', 'validateRole:Kaprodi']);
Route::post('kaprodi/data-matakuliah', [DataMKController::class, 'store'])->name('mataKuliah.store');

// Route::get('kaprodi/atur-jadwal', [AturJadwalController::class, 'index'])->name('kaprodi.aturJadwal')->middleware(['auth', 'validateRole:Kaprodi']);
Route::get('kaprodi/atur-jadwal', [AturJadwalController::class, 'create'])->name('kaprodi.aturJadwal')->middleware(['auth', 'validateRole:Kaprodi']);

// Route POST untuk menyimpan data jadwal
Route::post('/kaprodi/atur-jadwal', [AturJadwalController::class, 'store'])->name('aturJadwal.store');


