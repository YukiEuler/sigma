<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $table = 'dosen';
    protected $primaryKey = 'nip';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['nip', 'nama', 'alamat', 'no_telp', 'email', 'id_prodi', 'dekan', 'kaprodi', 'user_id'];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'id_prodi');
    }

    public function mataKuliah()
    {
        return $this->belongsToMany(MataKuliah::class, 'dosen_mk', 'nip', 'kodemk');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}