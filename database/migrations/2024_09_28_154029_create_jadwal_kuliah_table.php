<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalKuliahTable extends Migration
{
    public function up()
    {
        Schema::create('jadwal_kuliah', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('id_kelas');
            $table->string('hari', 10);
            $table->string('id_ruang', 30);
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
            $table->foreign('id_ruang')->references('id_ruang')->on('ruangan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('jadwal_kuliah');
    }
}