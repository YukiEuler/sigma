<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    // Jika nama tabel berbeda dari default (plural lowercase dari nama model)
    protected $table = 'mahasiswa';

    // Kolom yang boleh diisi
    protected $fillable = [
        'user_id',
        'nim', 
        'nama', 
        'alamat', 
        'no_telp', 
        'angkatan', 
        'jalur_masuk', 
        'status', 
        'sks_kumulatif', 
        'ipk', 
        'id_prodi',
        'nip_dosen_wali'
    ];
    public $timestamps = false;

    // Tipe data khusus
    protected $casts = [
        'angkatan' => 'integer',
        'sks_kumulatif' => 'integer',
        'ipk' => 'float',
    ];
    
    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'nip_dosen_wali', 'nip');
    }
    
    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function historyPembayaran()
    {
        return $this->hasMany(HistoryPembayaran::class, 'nim_mhs');
    }

    public function irs()
    {
        return $this->hasMany(Irs::class, 'nim_mhs');
    }

    public function khs()
    {
        return $this->hasMany(Khs::class, 'nim_mhs');
    }
}
