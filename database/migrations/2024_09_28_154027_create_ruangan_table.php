<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRuanganTable extends Migration
{
    public function up()
    {
        Schema::create('ruangan', function (Blueprint $table) {
            $table->string('id_ruang', 30)->primary();
            $table->string('nama_ruang', 100);
            $table->integer('kuota');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ruangan');
    }
}
