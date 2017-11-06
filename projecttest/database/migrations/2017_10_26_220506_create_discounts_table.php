<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiscountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discounts', function (Blueprint $table) {
            $table->increments('id');
			$table->string('product_id')->default("none");
			$table->string('product_name')->default("none");
			//$table->string('from_quantity')->default("none");
			//$table->string('to_quantity')->default("none");
			$table->string('from_price')->default("none");
			$table->string('to_price')->default("none");
			$table->string('percentage_discount')->default("none");
			$table->string('apply')->default("ok");
			$table->string('greater_discount')->default("none");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discounts');
    }
}
