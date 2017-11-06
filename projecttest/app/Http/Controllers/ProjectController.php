<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;


class ProjectController extends Controller
{
    //
	public function create(Request $request){
		
		$product_name=$request->input('product_name');
		$quantity=$request->input('quantity');
		$price=$request->input('price');
		$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		
		
		
		
		
		
		
		DB::insert("insert into projecttables(product_name,quantity,price,total,created_at,updated_at) values(?,?,?,?,?,?) ",array($product_name,$quantity,$price,$total,$today,$today));
		//$getdata=DB::select("select *from projecttables");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function delete(Request $request){
		$id=$request->input('id');
		DB::delete("delete from projecttables where id=:id",array('id'=>$id));
		//$getdata=DB::select("select *from projecttables");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function update(Request $request){
		$id=$request->input('id');
		$product_name=$request->input('product_name');
		$quantity=$request->input('quantity');
		$price=$request->input('price');
		$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		
		DB::table('projecttables')
           ->where('id',$id)
         ->update(
		 [
			
			
			'product_name'=>$product_name,
			 'quantity'=>$quantity,
			 'price'=>$price,
			 'total'=>$total,
			 'created_at'=>$today,
		
		]
		 
		 );
		
		
		//$getdata=DB::select("select *from projecttables");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function sum(){
		
		$gettotal=DB::select('select sum(total) as tot from projecttables');
		foreach($gettotal as $total)
		{
			echo $total->tot;
		}
    
	}
	public function gettable(){
		$getdata=DB::select("select *from projecttables");
		return response()->json(array('getdata'=>$getdata),200);
	}
}
