<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIrsTable extends Migration
{
    public function up()
    {
        Schema::create('irs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nim', 30);
            $table->unsignedBigInteger('id_kelas');
            $table->string('status', 30);
            $table->foreign('nim')->references('nim')->on('mahasiswa')->onDelete('cascade');
            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('irs');
    }
}
