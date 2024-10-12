<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMahasiswaTable extends Migration
{
    public function up()
    {
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->string('nim', 30)->primary();
            $table->string('nama', 100);
            $table->string('alamat', 200);
            $table->string('no_telp', 30);
            $table->integer('angkatan');
            $table->string('jalur_masuk', 50);
            $table->enum('status', ['Aktif', 'Lulus', 'DO', 'Cuti'])->default('Aktif');
            $table->integer('sks_kumulatif');
            $table->float('ipk', 3, 2);
            $table->string('id_prodi', 30);
            $table->string('nip_dosen_wali', 30);
            $table->unsignedBigInteger('user_id');

            $table->foreign('id_prodi')->references('id_prodi')->on('program_studi')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('nip_dosen_wali')->references('nip')->on('dosen')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('mahasiswa', function (Blueprint $table) {
            $table->dropForeign(['id_prodi']);
            $table->dropForeign(['nip_dosen_wali']);
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('mahasiswa');
    }
}
