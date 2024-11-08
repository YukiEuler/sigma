<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KalenderAkademik extends Model
{
    use HasFactory;

    protected $table = 'kalender_akademik';

    protected $fillable = [
        'tanggal_mulai',
        'tanggal_selesai',
        'id_prodi',
        'id_fakultas',
        'tahun_akademik',
        'keterangan'
    ];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'id_fakultas');
    }
}
