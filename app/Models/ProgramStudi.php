<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    protected $table = 'program_studi';
    protected $primaryKey = 'id_prodi';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id_prodi', 'nama_prodi', 'id_fakultas', 'jenjang'];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'id_fakultas');
    }

    public function dosen()
    {
        return $this->hasMany(Dosen::class, 'id_prodi');
    }

    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'id_prodi');
    }

    public function ruangan()
    {
        return $this->hasMany(Ruangan::class, 'id_prodi');
    }

    public function mataKuliah()
    {
        return $this->hasMany(MataKuliah::class, 'id_prodi');
    }
}
