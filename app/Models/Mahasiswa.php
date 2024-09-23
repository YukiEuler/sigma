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
        'email', 
        'angkatan', 
        'jalur_masuk', 
        'status', 
        'sks_kumulatif', 
        'ipk', 
        'id_prodi'
    ];
    public $timestamps = false;

    // Tipe data khusus
    protected $casts = [
        'angkatan' => 'integer',
        'sks_kumulatif' => 'integer',
        'ipk' => 'float',
    ];
    
    // Relasi ke model Prodi
    // public function prodi()
    // {
    //     return $this->belongsTo(Prodi::class, 'id_prodi');
    // }
}
