<?php 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use Auth;
//use App\Http\Controllers\validate;
use Validator;
class ProductController extends Controller
{
	
	
	
	///////////////////////////////////////////////////////
    //
	public function create(Request $request){
		
		
	///////////////////////VALIDATE////////////////////////
	//////////////////
		

		
		
		
    	$validator = Validator::make($request->all(), [
            'product_name' => 'required|regex:/^[a-zA-ZA]+$/u|max:255',
           
			'quantity' => 'required|integer',
            'price' => 'required|integer',
			'imagefile'=>'required|image|mimes:jpeg,png,jpg,gif|max:600',
        ]);

        if ($validator->passes()) {
//VALIDATE DATA SUCCESSFULY THEN UPLOAD TO TABLE
			
			
	$product_name=$request->input('product_name');
		$quantity=$request->input('quantity');
		$price=$request->input('price');
		$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		$sipo = $request->file('imagefile');
		
		$target=public_path("images/").basename($_FILES["imagefile"]["name"]);
			$imagefile=$_FILES['imagefile']["name"];
	
	
	
	DB::insert("insert into products(product_name,quantity,price,total,photo,created_at,updated_at) values(?,?,?,?,?,?,?) ",array($product_name,$quantity,$price,$total,$imagefile,$today,$today));
	
		//////////////////////
		

		if(move_uploaded_file($_FILES["imagefile"]["tmp_name"],$target))
	{
		
		
		
	}
	else{
		echo"failed";
	}
			
		
	
			return response()->json(['success'=>'Added new records.']);
        }
		///VALIDATION FAILED AND SEND BACK ALL ERRORS

    	return response()->json(['error'=>$validator->errors()->all()]);
		
		
		////////////////////
		

		
		
		
		
		//$getdata=DB::select("select *from products");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function delete(Request $request){
		$id=$request->input('id');
		DB::delete("delete from products where id=:id",array('id'=>$id));
		DB::delete("delete from discounts where product_id='$id'");
		//$getdata=DB::select("select *from products");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function update(Request $request){
		$id=$request->input('id');
		$product_name=$request->input('product_name');
		$quantity=$request->input('quantity');
		$price=$request->input('price');
		$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		
		DB::table('products')
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
		
		
		//$getdata=DB::select("select *from products");
//		return response()->json(array('getdata'=>$getdata),200);
	}
	public function sum(){
		
		$gettotal=DB::select('select sum(total) as tot from products');
		foreach($gettotal as $total)
		{
			echo $total->tot;
		}
    
	}
	public function gettable(){
		$getdata=DB::select("select *from products");
		return response()->json(array('getdata'=>$getdata),200);
	}
	public function set_discount(Request $request){
		
				
	///////////////////////VALIDATE////////////////////////
	//////////////////
		

		
		
		
    	$validator = Validator::make($request->all(), [
            'product_name' => 'required|regex:/^[a-zA-ZA]+$/u|max:255',
           'id'=>'required|integer',
		
			
            'price' => 'required|integer',
			'to_price' => 'required|integer',
			'percentage'=> 'required|integer',
			
        ]);

        if ($validator->passes()) {
//VALIDATE DATA SUCCESSFULY THEN UPLOAD TO TABLE
			
	///////////////////
		
		$id=$request->input('id');
		$product_name=$request->input('product_name');
		//$quantity=$request->input('quantity');
		//$to_quantity=$request->input('to_quantity');
		$price=$request->input('price');
		$to_price=$request->input('to_price');
		$percentage=$request->input('percentage')/100;
		//$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		
		$check=DB::select("SELECT * FROM `discounts` WHERE product_name='$product_name' and ($price BETWEEN `from_price` and `to_price` or ($to_price BETWEEN `from_price` and `to_price`))");
		if(!$check){
			DB::table("discounts")
			->insert([
				'product_id'=>$id,
				'product_name'=>$product_name,
			//	'from_quantity'=>$quantity
			//	'to_quantity'=>$to_quantity,
				'from_price'=>$price,
				'to_price'=>$to_price,
				'percentage_discount'=>$percentage,
				'created_at'=>$today
			]);
			return response()->json(['success'=>' new records has been Added']);
		}
		$success="Sorry! We can not Add This Price Range in Our table ,Look like We have This Price Range In our Table";
			return response()->json(array('success'=>$success),200);
		
		////////////////////
			
		
	
			
        }
		///VALIDATION FAILED AND SEND BACK ALL ERRORS

    	return response()->json(['error'=>$validator->errors()->all()]);
		
		
		////////////////////
		
		
		
	
	}
	public function set_greater(Request $request)//This is A Method To set values Disccount
	{
				
	///////////////////////VALIDATE////////////////////////
	//////////////////
		

		
		
		
    	$validator = Validator::make($request->all(), [
           'product_name' => 'required|regex:/^[a-zA-ZA]+$/u|max:255',
           'id'=>'required|integer',
		
			
            'price' => 'required|integer',
			
			'percentage'=> 'required|integer',
        ]);

        if ($validator->passes()) {
//VALIDATE DATA SUCCESSFULY THEN UPLOAD TO TABLE
			

			$id=$request->input('id');
		//$id=1;
		$product_name=$request->input('product_name');
		//$quantity=$request->input('quantity');
		//$to_quantity=$request->input('to_quantity');
		$price=$request->input('price');
		
		$percentage=$request->input('percentage')/100;
		//$total=$quantity*$price;
		
		$today = date("Y-m-d H:i:s");
		$check=DB::select("select *from discounts where product_name='$product_name' and (from_price<$price and to_price<$price)");
		if($check){
			DB::table("discounts")
			->insert([
				'product_id'=>$id,
				'product_name'=>$product_name,
			//	'from_quantity'=>$quantity
			//	'to_quantity'=>$to_quantity,
				'from_price'=>$price,
				'to_price'=>$price,
				'percentage_discount'=>$percentage,
				'greater_discount'=>'greater',
				'created_at'=>$today
			]);
			return response()->json(['success'=>'Added new records.']);
		}
		$success="Sorry! We can not Add This Price Range in Our table ,Look like We have This Price Range In our Table";
			return response()->json(array('success'=>$success),200);
		
	
			
        }
		///VALIDATION FAILED AND SEND BACK ALL ERRORS

    	return response()->json(['error'=>$validator->errors()->all()]);
		
		
		////////////////////
		
		
		
	}
	public function set_greaterall(Request $request)//This is A Method To set values Disccount
	{
				
	///////////////////////VALIDATE////////////////////////
	//////////////////
		

		
		
		
    	$validator = Validator::make($request->all(), [
            'product_name' => 'required|regex:/^[a-zA-ZA]+$/u|max:255',
           'id'=>'required|integer',
		
			
            'price' => 'required|integer',
			
			'percentage'=> 'required|integer',
        ]);

        if ($validator->passes()) {
//VALIDATE DATA SUCCESSFULY THEN UPLOAD TO TABLE
			////////////////////
		
		$id=$request->input('id');
		//$id=1;
		$product_name=$request->input('product_name');
		//$quantity=$request->input('quantity');
		//$to_quantity=$request->input('to_quantity');
		$price=$request->input('price');
		
		$percentage=$request->input('percentage')/100;
		//$total=$quantity*$price;
		
		$today = date("Y-m-d H:i:s");
		$check=DB::select("select *from discounts where product_name='$product_name' and (from_price<$price and to_price<$price)");
		if($check){
			DB::table("discounts")
			->insert([
				'product_id'=>$id,
				'product_name'=>'all_product',
			//	'from_quantity'=>$quantity
			//	'to_quantity'=>$to_quantity,
				'from_price'=>$price,
				'to_price'=>$price,
				'percentage_discount'=>$percentage,
				'greater_discount'=>'greaterall',
				'created_at'=>$today
			]);
			DB::table("discounts")
				->where('product_name','<>','all_product')
				->update([
					'apply'=>'disable_discount'
				]);
			return response()->json(['success'=>'Added new records.']);
		}
		$success="Sorry! We can not Add This Price Range in Our table ,Look like We have This Price Range In our Table";
			return response()->json(array('success'=>$success),200);

			
		
	
			
        }
		///VALIDATION FAILED AND SEND BACK ALL ERRORS

    	return response()->json(['error'=>$validator->errors()->all()]);
		
		
		
	}
	public function set_discountall(Request $request){
		///////////////////////VALIDATE////////////////////////
	//////////////////
		

		
		
		
    	$validator = Validator::make($request->all(), [
             'product_name' => 'required|regex:/^[a-zA-ZA]+$/u|max:255',
           'id'=>'required|integer',
		
			
            'price' => 'required|integer',
			'to_price' => 'required|integer',
			'percentage'=> 'required|integer',
        ]);

        if ($validator->passes()) {
//VALIDATE DATA SUCCESSFULY THEN UPLOAD TO TABLE
			
$id=$request->input('id');
		$product_name="all_product";
		//$quantity=$request->input('quantity');
		//$to_quantity=$request->input('to_quantity');
		$price=$request->input('price');
		$to_price=$request->input('to_price');
		$percentage=$request->input('percentage')/100;
		//$total=$quantity*$price;
		$today = date("Y-m-d H:i:s");
		
		$check=DB::select("SELECT * FROM `discounts` WHERE product_name='$product_name' and ($price BETWEEN `from_price` and `to_price` or ($to_price BETWEEN `from_price` and `to_price`))");
		if(!$check){
			DB::table("discounts")
			->insert([
				'product_id'=>$id,
				'product_name'=>'all_product',
			//	'from_quantity'=>$quantity
			//	'to_quantity'=>$to_quantity,
				'from_price'=>$price,
				'to_price'=>$to_price,
				'percentage_discount'=>$percentage,
				'created_at'=>$today
			]);
			
			DB::table("discounts")
				->where('product_name','<>','all_product')
				->update([
					'apply'=>'disable_discount'
				]);
			return response()->json(['success'=>'Added new records.']);
		}
		$success="Sorry! We can not Add This Price Range in Our table ,Look like We have This Price Range In our Table";
			return response()->json(array('success'=>$success),200);
			
		
	
			
        }
		///VALIDATION FAILED AND SEND BACK ALL ERRORS

    	return response()->json(['error'=>$validator->errors()->all()]);
		
		
		////////////////////
		
		
		
		
		
		
	}
	public function test(Request $request)
	{
		
		
		//$name=$_POST['name'];
		$name=$request->input('name');
		//$name="sizo";
		//$name='keb';
		//var_dump($random_int(100,999));
		//echo rand(100,100000);
		DB::table("discounts")
			->insert([
				
				'product_name'=>$name,
			//	'from_quantity'=>$quantity
			//	'to_quantity'=>$to_quantity,
				
			]);
		//$testi="done";
		//return response()->json(array('testi'=>$testi),200);
	}
	public function customer(Request $request){
		//$from_price=$request->input("product_price");
		//$product_name=$request->input("product_name");
		$from_price=20;
		$to_price=110;
		$product_name="sugar";
		$test=DB::select("select *from discounts where product_name='$product_name' and from_price <='$from_price' and to_price>='$to_price' ");
		if(!$test)
		{
			echo "you can enter this Product in Database";
		}
		else{
			echo "you are not allowed to enter This Product";
		}
		
	}
	public function get_product(){
		$product=DB::select("select *from products");
		return response()->json(array('product'=>$product),200);
	}
	public function imageupload(){
		
	}
	public function getbuyertable(){
		//if (Auth::check()) {
    // The user is logged in...
			//$username = Auth::username();
			//$users=DB::select("select *from triangle_grands where child1_username='$username'");
				//$username = Auth::user()->username;
			
			//$buyer=DB::select("select *from buyers");
		$buyer=DB::select("select *from purchases ORDER BY id DESC LIMIT 1");
		
		
		    $buyersomedata=DB::table("purchases")->first();
		    
		    
			return response()->json(array('purchase'=>$purchase),200);
		//}
	}
	public function purchase(Request $request){
		$product_id=$request->input("product_id");
		$product_name=$request->input("product_name");
		$product_price=$request->input("product_price");
		$product_quantity=$request->input("quantity");
		$discount=$request->input("discount");
		$total=$request->input("total");
		$total_afterdiscount=$request->input("total_afterdiscount");
		$customer_email=$request->input("customer_email");
		$today = date("Y-m-d H:i:s");
	DB::table("purchases")
		->insert([
			'customer_email'=>$customer_email,
			'product_id'=>$product_id,
			'product_name'=>$product_name,
			'product_price'=>$product_price,
			'product_quantity'=>$product_quantity,
			'discount'=>$discount,
			'total'=>$total,
			'total_afterdiscount'=>$total_afterdiscount,
			'created_at'=>$today
		]);
		$purchase=DB::select("select *from purchases where customer_email='$customer_email' ORDER BY id DESC LIMIT 1 ");
		
		
		    //$buyersomedata=DB::table("buyers")->first();
		    
		    
			return response()->json(array('purchase'=>$purchase),200);
	}
	public function get_discount(Request $request){
		$product_name=$request->input('product_name');
		//$price=$request->input('product_price');
		//$total=$_GET['total'];
		//$total=$request->input('product_price');
		$total=$request->input('total');
		//$total=50;
		$all_product=DB::select("select *from discounts where product_name='all_product' and apply='ok' and greater_discount='none' and ($total BETWEEN `from_price` and `to_price`)");
		$get_singleproduct=DB::select("select *from discounts where product_name='$product_name' and apply='ok' and greater_discount='none' and ($total BETWEEN `from_price` and `to_price`)");
		$greatest=DB::select("select*from discounts where product_name='$product_name' and apply='ok' and greater_discount='greater' and ($total  NOT BETWEEN `from_price` and `to_price`)");
		$greatestall=DB::select("select*from discounts where product_name='all_product' and apply='ok' and greater_discount='greaterall' and ($total  NOT BETWEEN `from_price` and `to_price`)");
		
		
		/////////////
		//$greatest=DB::select("select *from discounts where product_name='$product_name' and apply='ok' and greater_discount='none' and ($total BETWEEN `from_price` and `to_price`)");
		
		
		if($all_product)
		{
			$product=1;
			return response()->json(array('product'=>$product,'all_product'=>$all_product),200);
		}
		else if($get_singleproduct){
			$product=2;
			return response()->json(array('product'=>$product,'get_singleproduct'=>$get_singleproduct),200);
		}
		else if($greatest)
		{
			$product=3;
			return response()->json(array('product'=>$product,'greatest'=>$greatest),200);
		}
		else if($greatestall)
		{
			$product=4;
			return response()->json(array('product'=>$product,'greatestall'=>$greatestall),200);
		}
			
		else{
			$product=5;
			return response()->json(array('product'=>$product),200);
		}
		
		
	}
	public function validationform(Request $request){
		$title=$request->input('title');

		
		
		
    	$validator = Validator::make($request->all(), [
            'title' => 'required',
            //'last_name' => 'required',
            //'email' => 'required|email',
            //'address' => 'required',
        ]);

        if ($validator->passes()) {

			return response()->json(['success'=>'Added new records.']);
        }

    	return response()->json(['error'=>$validator->errors()->all()]);
    }
		
		///////////////////////////////////
		
		
	
	public function ajaxImageUpload(Request $request)
	{
		if(is_array($_FILES)) {
if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
$sourcePath = $_FILES['userImage']['tmp_name'];
$targetPath = "images/".$_FILES['userImage']['name'];
if(move_uploaded_file($sourcePath,$targetPath)) {

}
}
}
		
	}
	public function get_discounttable(){
		$getdata=DB::select("select *from discounts");
		return response()->json(array('getdata'=>$getdata),200);
	}
	
	public function get_purchases(){
		$getdata=DB::select("select *from purchases");
		return response()->json(array('getdata'=>$getdata),200);
	}
	public function purchasedata(Request $request){
		$customer_email=$request->input("customer_email");
		$purchase=DB::select("select *from purchases where customer_email='$customer_email' ORDER BY id DESC ");
		$total_discount=DB::table("purchases")
			->where("customer_email",$customer_email)
			->sum("discount");
		$order_subtotal=DB::table("purchases")
			->where("customer_email",$customer_email)
			->sum("total");
		$full_totalafterdiscount=DB::table("purchases")
			->where("customer_email",$customer_email)
			->sum("total_afterdiscount");
		//$purchase=DB::select("select *from purchases  ORDER BY id DESC LIMIT 1 ");
		return response()->json(array('purchase'=>$purchase,"total_discount"=>$total_discount,"order_subtotal"=>$order_subtotal,"full_totalafterdiscount"=>$full_totalafterdiscount),200);
	}
}
