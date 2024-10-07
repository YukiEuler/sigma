<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BagianAkademik extends Model
{
    protected $table = 'bagian_akademik';
    protected $primaryKey = 'nip';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['nip', 'nama', 'alamat', 'no_telp', 'user_id', 'id_fakultas'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class,'id_fakultas');
    }
}
