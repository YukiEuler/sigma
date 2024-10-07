<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelasTable extends Migration
{
    public function up()
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('kode_mk', 30);
            $table->char('kode_kelas', 1);
            $table->integer('tahun');
            $table->enum('semester', ['1', '2']);
            $table->integer('kuota');
            $table->string('id_ruang', 30);
            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->foreign('id_ruang')->references('id_ruang')->on('ruangan')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kelas');
    }
}
