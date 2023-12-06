<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('imageUrl')->nullable();
            $table->string('name')->nullable();
            $table->string('categoryId');
            $table->string('cityId');
            $table->string('address')->nullable();
            $table->string('phoneNumber')->nullable();
            $table->string('searchedTimes')->nullable();
            $table->string('postedBy')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
