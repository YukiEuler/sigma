<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoryPembayaranTable extends Migration
{
    public function up()
    {
        Schema::create('history_pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_akademik',6);
            $table->string('golongan_ukt', 10);
            $table->integer('pembayaran');
            $table->date('tanggal_bayar');
            $table->text('keterangan');
            $table->string('nim', 30);

            $table->foreign('nim')->references('nim')->on('mahasiswa')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::table('history_pembayaran', function (Blueprint $table) {
            $table->dropForeign(['nim']);
        });
        Schema::dropIfExists('history_pembayaran');
    }
}
