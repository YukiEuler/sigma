<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    protected $table = 'mata_kuliah';
    protected $primaryKey = 'kode_mk';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['kode_mk', 'nama', 'sks', 'semester', 'jenis', 'id_prodi'];

    public function dosen()
    {
        return $this->belongsToMany(Dosen::class, 'dosen_mk', 'kode_mk', 'nip');
    }

    public function khs()
    {
        return $this->hasMany(Khs::class, 'kode_mk');
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }

    public function dosenMk()
    {
        return $this->hasMany(DosenMk::class, 'kode_mk', 'kode_mk');
    }
}
