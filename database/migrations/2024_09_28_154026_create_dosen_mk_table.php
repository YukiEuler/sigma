<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDosenMkTable extends Migration
{
    public function up()
    {
        Schema::create('dosen_mk', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nip', 30);
            $table->string('kode_mk', 30);
            $table->integer('tahun');
            $table->enum('semester', ['1', '2']);
            $table->foreign('nip')->references('nip')->on('dosen')->onDelete('cascade');
            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('dosen_mk');
    }
}
