<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalKuliahTable extends Migration
{
    public function up()
    {
        Schema::create('jadwal_kuliah', function (Blueprint $table) {
            $table->id();
            $table->string('hari', 10);
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->string('id_ruang', 30);
            $table->unsignedBigInteger('id_kelas');

            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
            $table->foreign('id_ruang')->references('id_ruang')->on('ruangan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('jadwal_kuliah', function (Blueprint $table) {
            $table->dropForeign(['id_kelas']);
            $table->dropForeign(['id_ruang']);
        });
        Schema::dropIfExists('jadwal_kuliah');
    }
}