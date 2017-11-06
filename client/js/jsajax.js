// JavaScript Document
//send data in database code
$.ajaxSetup({
   headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
   }
});

///////////////////
$(document).ready(function(){
	"use strict";
	$('#logout').click(function(ev){
		 localStorage.removeItem('id_token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		 localStorage.removeItem('product_id');
			localStorage.removeItem('product_name');
			localStorage.removeItem('product_price');
			localStorage.removeItem('quantity');
			localStorage.removeItem('discount');
			localStorage.removeItem('total');
			localStorage.removeItem('total_afterdiscount');	
		$('#homepage').show();
		//$('#register_page').show();
		ev.preventDefault();
	});
});
$(document).ready(function(){
	"use strict";
	$('#submitform').click(function(ev){
		$.ajax({
			url:"http://localhost:8000/validationfpuporm",
			type:"post",
			data:$('#validate').serialize(),
			success:function(data){
				///////////////////
				
				
				   if($.isEmptyObject(data.error)){
	                	alert(data.success);
	                }
				else{
	                	printErrorMsg(data.error);
	                }
				////////////////////////////
			}
		});
		ev.preventDefault();
	});
	function printErrorMsg (msg) {
			$(".print-error-msg").find("ul").html('');
			$(".print-error-msg").css('display','block');
			$.each( msg, function( key, value ) {
				$(".print-error-msg").find("ul").append('<li>'+value+'</li>');
			});
		}
});



/////////////////////////
	$(document).ready(function(){
		"use strict";
		$('#update').click(function(e){
			var product_name=$('#product_name').val();
			var quantity=$('#quantity').val();
			var price=$('#price').val();
			var id=$('#id').val();
			$.ajax({
				url:"./update",
				method:"post",
				//data:$("#formadd_data").serialize(),
				data:{id:id,product_name:product_name,quantity:quantity,price:price},
				success:function()
				{
					alert('data has been saved');
			gettable();
			getsum();
				}
				
			});
			e.preventDefault();
		});
	});
$(document).ready(function(){
		"use strict";
		$('#set_discount').click(function(e){
			
			$.ajax({
				url:"./set_discount",
				method:"post",
				data:$("#formadd_data").serialize(),
				
				success:function()
				{
					alert('data has been Added to Discount Table');
			
				}
				
			});
			e.preventDefault();
		});
	});
$(document).ready(function(){
		"use strict";
		$('#send').click(function(e){
			var product_name=$('#product_name').val();
			var quantity=$('#quantity').val();
			var price=$('#price').val();
			$.ajax({
				url:"./create",
				method:"post",
				//data:$("#formadd_data").serialize(),
				data:{product_name:product_name,quantity:quantity,price:price},
				success:function()
				{
					alert('product has been saved');
				gettable();
			getsum();
					
				}
				
			});
			e.preventDefault();
		});
	});
function delete_funct(id)
{
	"use strict";
	$.ajax({
		url:"./delete",
		method:"post",
		data:{id:id},
		success:function(){
			gettable();
			getsum();
		}
		
	});
	return false;
}
function edit_funct(id,product_name,price,quantity)
{
	"use strict";
$('#update').show();
	$('#iddata').show();
	$('#send').hide();
	$('#id').val(id);
	$('#product_name').val(product_name);
	$('#price').val(price);
	$('#quantity').val(quantity);
}
///set discount
function set_discount(id,product_name){
	"use strict";
	$('#send').hide();
	$('#update').hide();
$('#iddata').show();
	$('#id').val(id);
	$('#product_name').val(product_name);
	//$('#price').val(price);
	$('#price').attr("placeholder","Discount From Price");
	$('#price_hide').show();
	$('#quantity').attr("placeholder","Discount From Quantity");
	$('#quantity_hide').show();
	$('#percentage_hide').show();
	
	
		$('#set_discount').show();
	
	
	
}


///
function getsum()
{
	"use strict";
	$.ajax({
		url:"./sum",
		method:"get",
		success:function(data){
			$('#totalall').text(data);
		}
	});
}
function purchasedata()
{
	$.ajax({
			url:"http://localhost:8000/purchasedata",
			method:"Post",
			data:$('#formbuy').serialize(),
			success:function(data){
			/////////////////////
				var total_discount=data.total_discount;
				var order_subtotal=data.order_subtotal;
				var full_totalafterdiscount=data.full_totalafterdiscount;
				
				var getproductdata=data.purchase;
					//$('#tabledata').html();
						var product_data=`<table class="table table-bordered">
         <thead>
                                    <tr>
                                        <th colspan="2">Product</th>
                                        <th>Quantity</th>
                                        <th>Unit price</th>
                                        <th>Discount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>`;
		for(var i=0;i<getproductdata.length;i++)
			{
				product_data+=`  <tbody>
                                    <tr>
                                        <td>
                                            <!--<a href="#">
                                                <img src="img/detailsquare.jpg" alt="White Blouse Armani">
                                            </a>-->
                                        </td>
                                        <td><a href="#">${getproductdata[i].product_name}</a>
                                        </td>
                                        <td>${getproductdata[i].product_quantity}</td>
                                        <td>$${getproductdata[i].product_price}</td>
                                        <td>$${getproductdata[i].discount}</td>
                                        <td>$${getproductdata[i].total}</td>
                                    </tr>
                                    
                                </tbody>

        `;
				
			}
		product_data+=`
<tfoot>
                                    <tr>
                                        <th colspan="5" class="text-right">Full Total Order </th>
                                        <th>$${order_subtotal}</th>
                                    </tr>
                                    <tr>
                                        <th colspan="5" class="text-right">Full Total Discount Price</th>
                                        <th>$${total_discount}</th>
                                    </tr>
                                   
                                    <tr>
                                        <th colspan="5" class="text-right">Full Total After Discount</th>
                                        <th>$${full_totalafterdiscount}</th>
                                    </tr>
                                </tfoot>
                            </table>`;
			$('#productpurchase').html(product_data);
				
				
				///////////////////////////
		}
		});
	return false;
}
function gettable()
{
	"use strict";
		$.ajax({
		url:"./gettable",
		method:"get",
		
		success:function(data){
			console.log('deleted');
						var n=1;
					var getproductdata=data.getdata;
					//$('#tabledata').html();
						var product_data=`<table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                
                <th>product_name</th>
                
                <th>Quantity in stock</th>
                <th>price per Item</th>
                <th>Datetime submitted</th>
                
                <th>Total value number</th>
                
                <th>Action</th>
                
            </tr>
        </thead>`;
		for(var i=0;i<getproductdata.length;i++)
			{
				product_data+=` <tbody>
        <tr>
                <th scope="row">${n}</th>
                
                
                <td>${getproductdata[i].product_name}</td>
              
                <td>${getproductdata[i].quantity}</td>
                <td>${getproductdata[i].price}</td>
<td>${getproductdata[i].created_at}</td>
              
                <td>${getproductdata[i].total}</td>
                
                <td>
                <a class="btn btn-danger" href="#" id="views"

onclick="return delete_funct('${getproductdata[i].id}')">Delete</a>   <a class="btn btn-danger" href="#" id="views"

onclick="return edit_funct('${getproductdata[i].id}','${getproductdata[i].product_name}','${getproductdata[i].quantity}','${getproductdata[i].price}')">Edit</a>
<a class="btn btn-danger" href="#" id="views"

onclick="return set_discount('${getproductdata[i].id}','${getproductdata[i].product_name}','${getproductdata[i].quantity}','${getproductdata[i].price}')">setdiscount</a>
                </td>
                
            </tr>
        
        
       </tbody>
       
        `;
				n++;
			}
		product_data+='</table>';
			$('#tabledata').html(product_data);
				
		}
		
	});
}
//REGISTER IN DATABASE///
$(document).ready(function(){
	"use strict";
	$('#lognav').click(function(ev){
		
				//console.log(data.testi);
		 $('.print-error-msg').hide();
		
		$('#titlechange').text('Login Page');
		$('#register_page').show();
				$('#login').show();
				$('#confirm_hide').hide();
				$('#name_hide').hide();
		        $('#register').hide();
		
		ev.preventDefault();
	});
	
});
$(document).ready(function(){
	"use strict";
	$('#regnav').click(function(ev){
		
				//console.log(data.testi);
		 $('.print-error-msg').hide();
		$('#login').hide();
		$('#titlechange').text('Register Page');
				$('#register_page').show();
		        $('#confirm_hide').show();
				$('#name_hide').show();
		        $('#register').show();
		
				
		
		ev.preventDefault();
	});
	 
});
/// ////continue login
function loginuser(){
	"use strict";
	$.ajax({
		url:"http://localhost:8000/loginuser",
		type:"get",
		success:function(data){
			console.log(data.test);
		}
	});
}




///////////////
/////////////////////////////////////login
$(document).ready(function(){
	"use strict";
	$('#login').click(function(ev){
		///////////////////////////
	
		$.ajax({
			url:"http://localhost:8000/sign",
			type:"post",
			data:$('#formdata').serialize(),
			success:function(data){
				///////////////////
				
				
				   if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	//alert(data.success);
					   var success=data.success;
					   if(success==='success login')
						   
						{  
						//console.log(data.success);
						 
								
						///////////////////
							
							var product_id=localStorage.getItem('product_id');
							if(product_id)
								{
									mymodal();
				$('#customer_email').val(data.email);
				$('#product_id').val(localStorage.getItem('product_id'));
				$('#product_name').val(localStorage.getItem('product_name'));
				$('#product_price').val(localStorage.getItem('product_price'));
				$('#quantity').val(localStorage.getItem('quantity'));
			    $('#discount').val(localStorage.getItem('discount'));
				$('#total').val(localStorage.getItem('total'));
				$('#total_afterdiscount').val(localStorage.getItem('total_afterdiscount'));
									
									$('#homepage').hide();
									
									///************************************////////////
									$('#all_purchase').show();
									console.log(data.gotdone);
							$('#name_user').text(data.name);
							$('#customer_email').val(data.email);
							localStorage.setItem('id_token', data.gotdone);
							localStorage.setItem('email',data.email);
							localStorage.setItem('name',data.name);
						$('#register_page').hide();
						$('#lognav').hide();
						$('#regnav').hide();
						$('#name_user').show();
						$('#logout').show();
						$('#productdata').show();
	                    $('#tabledata').show();
									////////////***********************/////////////////////
				
				
								}
							
				        ////////////////////
							
							///////////////////////ELSE CASE
							//console.log(data.gotdone);
							//
							else{
								$('#homepage').hide();
								$('#all_purchase').show();
								$('#myModal').hide();
								$('#name_user').text(data.name);
							$('#customer_email').val(data.email);
							localStorage.setItem('id_token', data.gotdone);
							localStorage.setItem('email',data.email);
							localStorage.setItem('name',data.name);
						$('#register_page').hide();
						$('#lognav').hide();
						$('#regnav').hide();
						$('#name_user').show();
						$('#logout').show();
						$('#productdata').show();
	                    $('#tabledata').show();
							}
							
							
							//////////////////////
						
						}
					   else{
						  alert(data.success);
						   
						   $('#lognav').show();
						$('#regnav').show();
						  $('#productdata').hide();
						   $('#name_user').hide();
	                    $('#tabledata').hide(); 
					   }
						   
					  // $('#message').hide();
					  
					  
	                }
				else{
	                	printErrorMsg(data.error);
	                }
				////////////////////////////
			}
		});
		ev.preventDefault();
	});
	function printErrorMsg (msg) {
			$(".print-error-msg").find("ul").html('');
			$(".print-error-msg").css('display','block');
			$.each( msg, function( key, value ) {
				$(".print-error-msg").find("ul").append('<li>'+value+'</li>');
			});
		}
});
/////////////////////////////////////////

/////////////////////////////////////REGISTER
$(document).ready(function(){
	"use strict";
	$('#register').click(function(ev){
		$.ajax({
			url:"http://localhost:8000/signup",
			type:"post",
			data:$('#formdata').serialize(),
			success:function(data){
				///////////////////
				
				
				   if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	alert(data.success);
					   
					  // $('#message').hide();
					  
					   $('#lognav').click();
	                }
				else{
	                	printErrorMsg(data.error);
	                }
				////////////////////////////
			}
		});
		ev.preventDefault();
	});
	function printErrorMsg (msg) {
			$(".print-error-msg").find("ul").html('');
			$(".print-error-msg").css('display','block');
			$.each( msg, function( key, value ) {
				$(".print-error-msg").find("ul").append('<li>'+value+'</li>');
			});
		}
});
/////////////////////////////////////////

/////////////////////////////////////REGISTER
$(document).ready(function(){
	"use strict";
	$('#register').click(function(ev){
		$.ajax({
			url:"http://localhost:8000/signup",
			type:"post",
			data:$('#formdata').serialize(),
			success:function(data){
				///////////////////
				
				
			}
		});
		ev.preventDefault();
	});
	
});
/////////////////////////////////////////

function get_product(){
	"use strict";
	$.ajax({
	url:"http://localhost:8000/get_product",
	method:"get",
	success:function(data){
		///////////////////
		
		console.log(data.product);
		
		var getproductdata=data.product;
		
		var product_data=`<div class="row">`
		for(var i=0;i<getproductdata.length;i++)
			{
				product_data+=` <div class="col-sm-6 col-md-4">
<div class="thumbnail">
            <img src="http://localhost:8000/images/${getproductdata[i].photo}" alt="...">
            <div class="caption">
                <h3>${getproductdata[i].product_name}</h3>
                <p>$<span>${getproductdata[i].price}</span></p>
                <p> 
<a class="btn btn-danger" href="#" 

onclick="return buy('${getproductdata[i].id}','${getproductdata[i].product_name}','${getproductdata[i].price}')">buy</a>
                </p>
            </div>
        </div>
</div>
`;
			}
					product_data+='</div>';
		$('#productdata').html(product_data);
		//////////////////////
		
	}
	});
}
function buy(id,product_name,price){
	"use strict";
	$('#myModal').show();
	$('#product_id').val(id);
	$('#product_name').val(product_name);
	$('#product_price').val(price);
	
}
function mymodal()
{
	"use strict";
	$('#myModal').show();
}
//function quantity(){
//	"use strict";
//	$('#quantity').keydown(function(){
//	var quantity=$('#quantity').val();
//	var product_price=$('#product_price').val();
//	var total=quantity*product_price;
//	$('#total').val(total);
//	
//	});
//	$('#quantity').keyup(function(){
//		var quantity=$('#quantity').val();
//	var product_price=$('#product_price').val();
//	var total=quantity*product_price;
//	$('#total').val(total);
//		
//	});
//}
$(document).ready(function(){
	"use strict";
	$('#closemodal').click(function(){
		var product_id=localStorage.getItem('product_id');
		if(product_id)
			{
			 localStorage.removeItem('product_id');
			localStorage.removeItem('product_name');
			localStorage.removeItem('product_price');
			localStorage.removeItem('quantity');
			localStorage.removeItem('discount');
			localStorage.removeItem('total');
			localStorage.removeItem('total_afterdiscount');	
				$('#myModal').hide();
			}
		
		$('#myModal').hide();
		
	});
});

$(document).ready(function(){
	"use strict";
	$('#purchase').click(function(ev){
		var customer_email=$('#customer_email').val();
		if(customer_email==='')
			{
				var product_id=$('#product_id').val();
				var product_name=$('#product_name').val();
				var product_price=$('#product_price').val();
				var quantity=$('#quantity').val();
			    var discount=$('#discount').val();
				var total=$('#total').val();
				var total_afterdiscount=$('#total_afterdiscount').val();
				
				localStorage.setItem('product_id',product_id);
				localStorage.setItem('product_name',product_name);
				localStorage.setItem('product_price',product_price);
				localStorage.setItem('quantity',quantity);
				localStorage.setItem('discount',discount);
				localStorage.setItem('total',total);
				localStorage.setItem('total_afterdiscount',total_afterdiscount);
				 $('.print-error-msg').hide();
			$('#myModal').hide();
		$('#titlechange').text('You Must Login to buy This Product');
		$('#register_page').show();
				$('#login').show();
				$('#confirm_hide').hide();
				$('#name_hide').hide();
		        $('#register').hide();
				$('#productdata').hide();
			}
		$.ajax({
			url:"http://localhost:8000/purchase",
			method:"POST",
			data:$('#formbuy').serialize(),
			success:function(data){
			/////////////////////
				
				var getproductdata=data.purchase;
					//$('#tabledata').html();
						var product_data=`<table class="table table-bordered">
         <thead>
                                    <tr>
                                        <th colspan="2">Product</th>
                                        <th>Quantity</th>
                                        <th>Unit price</th>
                                        <th>Discount</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>`;
		for(var i=0;i<getproductdata.length;i++)
			{
				product_data+=`  <tbody>
                                    <tr>
                                        <td>
                                            <!--<a href="#">
                                                <img src="img/detailsquare.jpg" alt="White Blouse Armani">
                                            </a>-->
                                        </td>
                                        <td><a href="#">${getproductdata[i].product_name}</a>
                                        </td>
                                        <td>${getproductdata[i].product_quantity}</td>
                                        <td>$${getproductdata[i].product_price}</td>
                                        <td>$${getproductdata[i].discount}</td>
                                        <td>$${getproductdata[i].total}</td>
                                    </tr>
                                    
                                </tbody>
<tfoot>
                                    <tr>
                                        <th colspan="5" class="text-right">Order subtotal</th>
                                        <th>$${getproductdata[i].total}</th>
                                    </tr>
                                    <tr>
                                        <th colspan="5" class="text-right">Discount Price</th>
                                        <th>$${getproductdata[i].discount}</th>
                                    </tr>
                                   
                                    <tr>
                                        <th colspan="5" class="text-right">Total After Discount</th>
                                        <th>$${getproductdata[i].total_afterdiscount}</th>
                                    </tr>
                                </tfoot>
        `;
				
			}
		product_data+=`
                            </table>`;
			$('#tabledata').html(product_data);
				
				
				///////////////////////////
		}
		});
		ev.preventDefault();
	});
	
	
	
});


function quantity(){
	"use strict";
	$('#quantity').keydown(function(){
	var quantity=$('#quantity').val();
	var product_price=$('#product_price').val();
	var total=quantity*product_price;
	$('#total').val(total);
	
	
		
	var product_name=$('#product_name').val();
			
		
		$.ajax({
		url:"http://localhost:8000/get_discount",
		method:"get",
		//data:$('#formbuy').serialize(),
		data:{product_name:product_name,total:total},
		success:function(data){
			var product=data.product;
			if(product===1)
				{
					var greater=data.all_product[0].greater_discount;
					if(greater==='greater')
						{
							var percent=data.all_product[0].percentage_discount;
							$('#discount').val(percent*total);
							
							var discountpr1=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr1);
						}
					else if(greater==='none')
						{
							var percent2=data.all_product[0].percentage_discount;
							$('#discount').val(percent2*total);
							
							var discountpr2=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr2);
						}
				}
			else if(product===2)
				{
					var greater2=data.get_singleproduct[0].greater_discount;
					if(greater2==='greater')
						{
							var percent3=data.get_singleproduct[0].percentage_discount;
							$('#discount').val(percent3*total);
							var discountpr3=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr3);
						}
					else if(greater2==='none')
						{
							var percent4=data.get_singleproduct[0].percentage_discount;
							$('#discount').val(percent4*total);
							var discountpr4=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr4);
						}
					
				
				}
			 if(product===3)
				{
					
							var percent5=data.greatest[0].percentage_discount;
							$('#discount').val(percent5*total);
							
					var discountpr5=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr5);
				}
			if(product===4)
				{
				//	var greater3=data.greatest[0].greater_discount;
//					if(greater3==='greater')
//						{
							var percent6=data.greatestall[0].percentage_discount;
							$('#discount').val(percent6*total);
							
					var discountpr6=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr6);
				}
			if(product===5){
				$('#discount').val(0);
				$('#total_afterdiscount').val(total);
			}
		}
		
	});
		
		
		
		//////////////////////
	
	});
	$('#quantity').keyup(function(){
		var quantity=$('#quantity').val();
	var product_price=$('#product_price').val();
	var total=quantity*product_price;
	$('#total').val(total);
			//var discountpr=$('#discount').val();
	
		
		$.ajax({
		url:"http://localhost:8000/get_discount",
		method:"get",
		data:$('#formbuy').serialize(),
		success:function(data){
			var product=data.product;
		
			if(product===1)
				{
					var greater=data.all_product[0].greater_discount;
					if(greater==='greater')
						{
							var percent=data.all_product[0].percentage_discount;
							$('#discount').val(percent*total);
							var discountpr1=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr1);
							
						}
					else if(greater==='none')
						{
							var percent2=data.all_product[0].percentage_discount;
							$('#discount').val(percent2*total);
							
							var discountpr2=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr2);
						}
				}
			else if(product===2)
				{
					var greater2=data.get_singleproduct[0].greater_discount;
					if(greater2==='greater')
						{
							var percent3=data.get_singleproduct[0].percentage_discount;
							$('#discount').val(percent3*total);
							
							var discountpr3=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr3);
						}
					else if(greater2==='none')
						{
							var percent4=data.get_singleproduct[0].percentage_discount;
							$('#discount').val(percent4*total);
							var discountpr4=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr4);
						}
					
				
				}
			if(product===3)
				{
				//	var greater3=data.greatest[0].greater_discount;
//					if(greater3==='greater')
//						{
							var percent5=data.greatest[0].percentage_discount;
							$('#discount').val(percent5*total);
					       
							var discountpr5=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr5);
				}
			if(product===4)
				{
				
							var percent6=data.greatestall[0].percentage_discount;
							$('#discount').val(percent6*total);
				
					var discountpr6=$('#discount').val();
	$('#total_afterdiscount').val(total-discountpr6);
							
				}
			if(product===5){
				$('#discount').val(0);
				$('#total_afterdiscount').val(total);
			}
			
		}
		
	});
		
		
		
		//////////////////////
		
	});
}


/////////////////////////TOTAL TEST//////////////////////



function authuser()
{
	"use strict";
	var jwt = localStorage.getItem('email');
							if(jwt)
							
							{
								
					//////////////////////
							$('#homepage').hide();	
						var product_id=localStorage.getItem('product_id');
							if(product_id)
								{
									mymodal();
				$('#customer_email').val(localStorage.getItem('email'));
				$('#product_id').val(localStorage.getItem('product_id'));
				$('#product_name').val(localStorage.getItem('product_name'));
				$('#product_price').val(localStorage.getItem('product_price'));
				$('#quantity').val(localStorage.getItem('quantity'));
			    $('#discount').val(localStorage.getItem('discount'));
				$('#total').val(localStorage.getItem('total'));
				$('#total_afterdiscount').val(localStorage.getItem('total_afterdiscount'));
						//var getemail=localStorage.getItem('email');
						var getname=localStorage.getItem('name');
						$('#name_user').text(getname);
						//$('#customer_email').val(getemail);
						$('#register_page').hide();
						$('#lognav').hide();
						$('#regnav').hide();
						$('#name_user').show();
						$('#logout').show();
						$('#productdata').show();
	                    $('#tabledata').show();
								}
								
								
					///////////////////////
						
								}
	
		//////////////////////////
}

$(document).ready(function(){
		"use strict";
	$('#update').hide();
	$('#iddata').hide();
	$('#set_discount').hide();
	$('#price_hide').hide();
	$('#quantity_hide').hide();
	$('#percentage_hide').hide();
	$('#login').hide();
	$('#productid_hide').hide();
	$('#customername_hide').hide();
	gettable();
	getsum();
	get_product();
	//getbuyertable();
	quantity();
	//$('#productdata').hide();
	$('#tabledata').hide();
	$('#logout').hide();
	//get_discount();
loginuser();
	authuser();
	$('#all_purchase').hide();

});
