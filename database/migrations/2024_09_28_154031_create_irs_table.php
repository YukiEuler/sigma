<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIrsTable extends Migration
{
    public function up()
    {
        Schema::create('irs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_kelas');
            $table->enum('semester', ['1', '2', '3', '4', '5', '6', '7', '8']);
            $table->integer('tahun');
            $table->enum('status', ['Baru', 'Perbaikan', 'Ulang']);
            $table->string('nim', 30);

            $table->foreign('nim')->references('nim')->on('mahasiswa')->onDelete('cascade');
            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('irs', function (Blueprint $table) {
            $table->dropForeign(['nim']);
            $table->dropForeign(['id_kelas']);
        });
        Schema::dropIfExists('irs');
    }
}
