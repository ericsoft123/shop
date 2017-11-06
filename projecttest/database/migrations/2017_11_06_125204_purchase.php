<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Purchase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
		 Schema::create('purchases', function (Blueprint $table) {
		$table->increments('id');
			$table->string('customer_email')->default("none");
			$table->string('product_id')->default("none");
			$table->string('product_name')->default("none");
			$table->string('product_quantity')->default("none");
			$table->string('product_price')->default("none");
			$table->string('discount')->default("none");
			$table->string('total')->default("none");
			$table->string('total_afterdiscount')->default("none");
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
        //
		Schema::dropIfExists('purchases');
    }
}
