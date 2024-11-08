<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kalender_akademik', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_mulai')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->string('id_prodi', 30)->nullable();
            $table->string('id_fakultas', 30)->nullable();
            $table->string('tahun_akademik');
            $table->text('keterangan')->nullable();
            $table->timestamps();

            $table->foreign('id_prodi')->references('id_prodi')->on('program_studi')->onDelete('cascade');
            $table->foreign('id_fakultas')->references('id_fakultas')->on('fakultas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('kalender_akademik', function (Blueprint $table) {
            $table->dropForeign(['id_prodi']);
            $table->dropForeign(['id_fakultas']);
        });
        Schema::dropIfExists('kalender_akademik');
    }
};
