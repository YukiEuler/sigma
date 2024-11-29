<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    protected $table = 'ruangan';
    protected $fillable = ['nama_ruang', 'kuota', 'id_fakultas', 'id_prodi', 'diajukan', 'disetujui'];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class, 'id_fakultas');
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }
}
