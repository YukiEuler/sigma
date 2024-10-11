<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MataKuliah extends Model
{
    protected $table = 'mata_kuliah';
    protected $primaryKey = 'kodemk';
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

    public function irs()
    {
        return $this->hasMany(Irs::class, 'kode_mk');
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }
}
