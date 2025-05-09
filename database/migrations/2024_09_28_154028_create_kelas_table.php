<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKelasTable extends Migration
{
    public function up()
    {
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->char('kode_kelas', 1);
            $table->string('kode_mk', 30);
            // $table->integer('tahun');
            // $table->enum('semester', ['1', '2', '3', '4', '5', '6', '7', '8']);
            $table->string('tahun_akademik');
            $table->integer('kuota');
            $table->enum('status', ['belum', 'diajukan', 'disetujui'])->default('belum');

            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('kelas', function (Blueprint $table) {
            $table->dropForeign(['kode_mk']);
        });
        Schema::dropIfExists('kelas');
    }
}
