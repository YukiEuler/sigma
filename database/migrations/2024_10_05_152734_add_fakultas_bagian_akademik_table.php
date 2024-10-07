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
        Schema::table('bagian_akademik', function (Blueprint $table) {
            $table->string('id_fakultas', 30);

            $table->foreign('id_fakultas')->references('id_fakultas')->on('fakultas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('bagian_akademik', function (Blueprint $table) {
            $table->dropForeign(['id_fakultas']);
            $table->dropColumn('id_fakultas');
        });
    }
};
