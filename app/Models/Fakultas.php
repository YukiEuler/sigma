<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\ProgramStudi;

class Fakultas extends Model
{
    protected $table = 'fakultas';
    protected $primaryKey = 'id_fakultas';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id_fakultas', 'nama_fakultas'];

    public function programStudi()
    {
        return $this->hasMany(ProgramStudi::class, 'id_fakultas');
    }
    public function bagianAkademik()
    {
        return $this->hasMany(BagianAkademik::class, 'id_fakultas');
    }
    public function ruangan()
    {
        return $this->hasMany(Ruangan::class, 'id_fakultas');
    }
}