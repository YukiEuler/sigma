<?php
// app/Models/HistoryPembayaran.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryPembayaran extends Model
{
    use HasFactory;

    protected $table = 'history_pembayaran';

    protected $fillable = [
        'tahun_akademik',
        'golongan_ukt',
        'pembayaran',
        'tanggal_bayar',
        'keterangan',
        'nim',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'nim_mhs', 'nim');
    }
}