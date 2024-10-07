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
        'nim_mhs',
        'tahun_akademik',
        'golongan_ukt',
        'pembayaran',
        'tanggal_bayar',
        'keterangan',
    ];

    public function mahasiswa()
    {
        return $this->belongsTo(Mahasiswa::class, 'nim_mhs', 'nim');
    }
}