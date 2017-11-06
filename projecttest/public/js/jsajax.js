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
	$('#submitform').click(function(ev){
		$.ajax({
			url:"./ajaxImageUpload",
			type:"post",
			data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
contentType: false,       // The content type used when sending data to the server.
cache: false,             // To unable request pages to be cached
processData:false,
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
				
				success:function(data)
				{
			
				if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	alert(data.success);
					   
					  // $('#message').hide();
					  
					  
	                }
				else{
	                	printErrorMsg(data.error);
	                }
				////////////////////////////
			}
		});
		e.preventDefault();
	});
	function printErrorMsg (msg) {
			$(".print-error-msg").find("ul").html('');
			$(".print-error-msg").css('display','block');
			$.each( msg, function( key, value ) {
				$(".print-error-msg").find("ul").append('<li>'+value+'</li>');
			});
		}
	});
$(document).ready(function(){
		"use strict";
		$('#send').click(function(ev){
			//var product_name=$('#product_name').val();
			//var quantity=$('#quantity').val();
			//var price=$('#price').val();
			var formdata=new FormData($("#formadd_data")[0]);
			$.ajax({
				url:"./create",
				method:"post",
				//data:$("#formadd_data").serialize(),
				data:formdata,
				contentType: false,
    	    processData:false,
				success:function(data)
				{
					
			if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	//alert(data.success);
					   
					 alert('product has been saved');
				gettable();
			getsum();
					
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
//$(document).ready(function () {
//	"use strict";
//	$("#formadd_data").on('submit',(function(e) {
//		e.preventDefault();
//		$.ajax({
//        	url: "./create",
//			type: "POST",
//			data:  new FormData(this),
//			beforeSend: function(){$("#body-overlay").show();},
//			contentType: false,
//    	    processData:false,
//			success: function(data)
//		    {
//			$("#targetLayer").html(data);
//			$("#targetLayer").css('opacity','1');
//			setInterval(function() {$("#body-overlay").hide(); },500);
//			},
//		  	error: function() 
//	    	{
//	    	} 	        
//	   });
//	}));
//});
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
	alert("Imagine i.e:you want to set any product_name discount Price>120 to 0.50% you can choose Advanced option.");
	$('#send').hide();
	$('#update').hide();
$('#iddata').show();
	$('#id').val(id);
	$('#product_name').val(product_name);
	//$('#price').val(price);
	$('#price').val("");
	$('#price').attr("placeholder","Discount From Price");
	$('#price_hide').show();
	//$('#quantity').attr("placeholder","Discount From Quantity");
	$('#quantity').hide();
	//$('#quantity_hide').show();
	$('#percentage_hide').show();
	$('#advanced').show();
	
		$('#set_discount').show();
	$('#set_discountall').show();
	$('#imagefile_hide').hide();
	
	
	
}

$(document).ready(function(){
	"use strict";
	$('#advanced').click(function(){
		$('#send').hide();
	$('#update').hide();
$('#iddata').show();
	//var id=$('#id').val();
	$('#product_name').val();
		$('#price').val("");

		$('#price').attr("placeholder"," Greater Values Discount:");
		$('#quantity').hide();
	$('#price_hide').hide();
	$('#percentage_hide').show();
	$('#advanced').hide();
		$('#set_greater').show();
	$('#set_greaterall').show();
		$('#set_discount').hide();
		$('#set_discountall').hide();
		$('#imagefile_hide').hide();
		return false;
	});
});

$(document).ready(function(){
	"use strict";
	$('#set_greater').click(function(ev){
		$.ajax({
		url:"./set_greater",
		type:"Post",
		data:$("#formadd_data").serialize(),
		success:function(data)
			{
			if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	alert(data.success);
					   
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
$(document).ready(function(){
	"use strict";
	$('#set_greaterall').click(function(ev){
		$.ajax({
		url:"./set_greaterall",
		type:"Post",
		data:$("#formadd_data").serialize(),
		success:function(data)
			{
			if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	alert(data.success);
					   
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
        <tfoot>
                                   
                                   
        `;
				n++;
			}
		product_data+=` <tr>
                                        <th colspan="5" class="text-right">Total</th>
                                        <th>$<span id="totalall"></span></th>
                                    </tr>
                                </tfoot>
								</table>`;
			$('#tabledata').html(product_data);
				
		}
		
	});
}
$(document).ready(function(){
	"use strict";
	$('#set_discountall').click(function(ev){
		$.ajax({
			url:"./set_discountall",
			type:"post",
			data:$('#formadd_data').serialize(),
			success:function(data){
		if($.isEmptyObject(data.error)){
					    $('.print-error-msg').hide();
	                	alert(data.success);
					   
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
function get_purchasedata()
{

	$.ajax({
		url:"./get_purchases",
		type:"get",
		success:function(data)
		{
						var get_purchasedata=data.getdata;
					//$('#tabledata').html();
						var get_purchasetable=`<table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Customer Email</th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                 <th>Discount</th>
                <th>Total After Discount</th>
                <th>Date Submitted</th>
            </tr>
        </thead>`;
		for(var i=0;i<get_purchasedata.length;i++)
			{
				get_purchasetable+=` 
<tbody>
            <tr>
                <th scope="row"></th>
                <td>${get_purchasedata[i].customer_email}</td>
                <td>${get_purchasedata[i].product_id}</td>
                <td>${get_purchasedata[i].product_name}</td>
                <td>${get_purchasedata[i].product_quantity}</td>
                <td>${get_purchasedata[i].product_price}</td>
                <td>${get_purchasedata[i].total}</td>
                <td>${get_purchasedata[i].discount}</td>
                <td>${get_purchasedata[i].total_afterdiscount}</td>
                <td>${get_purchasedata[i].created_at}</td>
            </tr>
           
        </tbody>
                                   
                                   
        `;
			
			}
		get_purchasetable+=`</table>
<div ><a href="#" onclick="return hidepurchasetable()">Hide This table</a></div>
`;
			$('#get_purchasetable').html(get_purchasetable);
				
		}
	});
}
function get_discountdata()
{
	$.ajax({
		url:"./get_discounttable",
		type:"get",
		success:function(data)
		{
						var get_discountdata=data.getdata;
					//$('#tabledata').html();
						var get_discounttable=`<table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>product_name</th>
                <th>From_price</th>
                <th>To_price</th>
                <th>Percentage_discount</th>
                <th>Apply Discount</th>
                <th>Higher Discount</th>
                <th>Date Submitted</th>
            </tr>
        </thead>`;
		for(var i=0;i<get_discountdata.length;i++)
			{
				get_discounttable+=` 
<tbody>
            <tr>
                <th scope="row">${get_discountdata[i].product_id}</th>
                <td>${get_discountdata[i].product_name}</td>
                <td>${get_discountdata[i].from_price}</td>
                <td>${get_discountdata[i].to_price}</td>
                <td>${get_discountdata[i].percentage_discount}</td>
                <td>${get_discountdata[i].apply}</td>
                <td>${get_discountdata[i].greater_discount}</td>
                <td>${get_discountdata[i].created_at}</td>
            </tr>
           
        </tbody>
                                   
                                   
        `;
			
			}
		get_discounttable+=`</table>
<div id="discounttable"><a href="#" onclick="return hidediscounttable()">Hide This table</a></div>
`;
			$('#get_discounttable').html(get_discounttable);
				
		}
	});
}
function hidediscounttable()
{
	"use strict";
	$("#get_discounttable").hide();
	return false;
}
function hidepurchasetable(){
	"use strict";
	$('#get_purchasetable').hide();
	return false;
}
function show_discounttable()
{
	get_discounttable();
	"use strict";
	$("#get_discounttable").show();
	return false;
}
function show_purchasetable(){
	"use strict";
	$('#get_purchasetable').show();
	return false;
}
$(document).ready(function(){
		"use strict";
	$('#update').hide();
	$('#iddata').hide();
	$('#set_discount').hide();
	$('#price_hide').hide();
	$('#quantity_hide').hide();
	$('#percentage_hide').hide();
	$('#advanced').hide();
	$('#set_greater').hide();
	$('#set_discountall').hide();
	$('#set_greaterall').hide();
	gettable();
	getsum();
	get_discountdata();
	hidediscounttable();
	//get_discounttable();
	get_purchasedata();
	hidepurchasetable();
	
});
