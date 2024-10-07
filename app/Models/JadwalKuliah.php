<?php
// app/Models/JadwalKuliah.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalKuliah extends Model
{
    use HasFactory;

    protected $table = 'jadwal_kuliah';

    protected $fillable = [
        'id_kelas',
        'hari',
        'id_ruang',
        'waktu_mulai',
        'waktu_selesai',
    ];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'id_kelas', 'id');
    }

    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class, 'id_ruang', 'id_ruang');
    }
}