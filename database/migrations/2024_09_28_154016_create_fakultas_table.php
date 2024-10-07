<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFakultasTable extends Migration
{
    public function up()
    {
        Schema::create('fakultas', function (Blueprint $table) {
            $table->string('id_fakultas', 30)->primary();
            $table->string('nama_fakultas', 100);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fakultas');
    }
}
