<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDosenMkTable extends Migration
{
    public function up()
    {
        Schema::create('dosen_mk', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 30);
            $table->string('kode_mk', 30);
            $table->integer('tahun');
            $table->enum('semester', ['1', '2', '3', '4', '5', '6', '7', '8']);
            
            $table->foreign('nip')->references('nip')->on('dosen')->onDelete('cascade');
            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('dosen_mk', function (Blueprint $table) {
            $table->dropForeign(['nip']);
            $table->dropForeign(['kode_mk']);
        });
        Schema::dropIfExists('dosen_mk');
    }
}
