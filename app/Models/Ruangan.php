<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    protected $table = 'ruangan';
    protected $primaryKey = 'id_ruang';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id_ruang', 'nama_ruang', 'kuota', 'id_fakultas', 'id_prodi', 'disetujui'];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'id_fakultas');
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }
}
