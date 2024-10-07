<?php
// app/Models/DosenMk.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DosenMk extends Model
{
    use HasFactory;

    protected $table = 'dosen_mk';

    protected $fillable = [
        'nip',
        'kode_mk',
        'tahun',
        'semester',
    ];

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'nip', 'nip');
    }

    public function mataKuliah()
    {
        return $this->belongsTo(MataKuliah::class, 'kode_mk', 'kode_mk');
    }
}