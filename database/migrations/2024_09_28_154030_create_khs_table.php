<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKhsTable extends Migration
{
    public function up()
    {
        Schema::create('khs', function (Blueprint $table) {
            $table->id();
            $table->string('nim', 30);
            $table->string('kode_mk', 30);
            $table->integer('tahun');
            $table->enum('semester', ['1', '2', '3', '4', '5', '6', '7', '8']);
            $table->enum('status', ['Baru', 'Perbaikan', 'Ulang']);
            $table->enum('nilai_huruf', ['A', 'B', 'C', 'D', 'E']);
            $table->integer('bobot');

            $table->foreign('nim')->references('nim')->on('mahasiswa')->onDelete('cascade');
            $table->foreign('kode_mk')->references('kode_mk')->on('mata_kuliah')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('khs', function (Blueprint $table) {
            $table->dropForeign(['nim']);
            $table->dropForeign(['kode_mk']);
        });
        Schema::dropIfExists('khs');
    }
}
