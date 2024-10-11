<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBagianAkademikTable extends Migration
{
    public function up()
    {
        Schema::create('bagian_akademik', function (Blueprint $table) {
            $table->string('nip', 30)->primary();
            $table->string('nama', 100);
            $table->string('alamat', 200);
            $table->string('no_telp', 30);
            $table->unsignedBigInteger('user_id');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('bagian_akademik');
        Schema::table('bagian_akademik', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
}
