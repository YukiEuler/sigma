<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramStudiTable extends Migration
{
    public function up()
    {
        Schema::create('program_studi', function (Blueprint $table) {
            $table->string('id_prodi', 30)->primary();
            $table->string('nama_prodi', 100);
            $table->string('id_fakultas', 30);
            $table->string('jenjang', 10);
            
            $table->foreign('id_fakultas')->references('id_fakultas')->on('fakultas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('program_studi', function (Blueprint $table) {
            $table->dropForeign(['id_fakultas']);
        });
        Schema::dropIfExists('program_studi');
    }
}
