<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMataKuliahTable extends Migration
{
    public function up()
    {
        Schema::create('mata_kuliah', function (Blueprint $table) {
            $table->string('kode_mk', 30)->primary();
            $table->string('nama', 100);
            $table->integer('sks');
            $table->enum('semester', ['1', '2','3','4','5','6','7','8']);
            $table->enum('jenis', ['Wajib', 'Pilihan']);
            $table->string('id_prodi', 30);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('mata_kuliah');
        Schema::table('mata_kuliah', function (Blueprint $table) {
            $table->dropForeign(['id_prodi']);
        });
    }
}
