<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDosenTable extends Migration
{
    public function up()
    {
        Schema::create('dosen', function (Blueprint $table) {
            $table->string('nip', 30)->primary();
            $table->string('nama', 100);
            $table->string('alamat', 200);
            $table->string('no_telp', 30);
            $table->string('id_prodi', 30);
            $table->boolean('dekan')->default(false);
            $table->boolean('kaprodi')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->foreign('id_prodi')->references('id_prodi')->on('program_studi')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('dosen');
    }
}