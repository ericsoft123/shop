<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return view('welcome');
	return view('home');
});

Auth::routes();

//////////////////////SIGN UP AND SIGN IN CONTROLLER POST METHOD ////
Route::post('/postsignup', 'RegisterController@postsignup')->name('postsignup');

Route::post('/postsignin', 'RegisterController@postsignin')->name('postsignin');


//////////////////////////////////////////////////////
//////////////////////SIGN UP AND SIGN IN CONTROLLER GET METHOD ////
Route::get('/getsignin','RegisterController@getsignin')->name('getsignin');
Route::get('/getsignup', 'RegisterController@getsignup')->name('getsignup');

//////////////////////////////////////////////////////

/////////////////////////////////CLIENT /////////////////

Route::post('/signup', 'RegisterController@signup')->name('signup');
Route::post('/sign', 'RegisterController@sign')->name('sign');
 

//Route::get('/loginuser', 'RegisterController@loginuser')->name('loginuser')->middleware('auth');
Route::get('/loginuser', 'RegisterController@loginuser')->name('loginuser');


//////////////////////////////PRODUCT CONTROLLER POST  METHOD//////////////////////////

Route::post('/create', 'ProductController@create')->name('create');
Route::post('/delete', 'ProductController@delete')->name('delete');
Route::post('/update', 'ProductController@update')->name('update');
Route::post('/set_discount', 'ProductController@set_discount')->name('set_discount');//DISCOUNT
Route::post('/set_greater', 'ProductController@set_greater')->name('set_greater');//HIGHER VALUES DISCOUNT
Route::post('/set_greaterall', 'ProductController@set_greaterall')->name('set_greaterall');//HIGHER VALUES DISCOUNT

Route::post('/test', 'ProductController@test')->name('test');
Route::post('/set_discountall', 'ProductController@set_discountall')->name('set_discountall');
Route::post('/purchase', 'ProductController@purchase')->name('purchase');

Route::post('/validationform', 'ProductController@validationform')->name('validationform');

Route::post('/ajaxImageUpload', 'ProductController@ajaxImageUpload')->name('ajaxImageUpload');
Route::post('/purchasedata', 'ProductController@purchasedata')->name('purchasedata');




//////////////////////////////////////////////////////////////////////////////
Route::post('/test', 'ProductController@test')->name('test');
//////////////////////////////PRODUCT CONTROLLER GET METHOD//////////////////////////

Route::get('/sum', 'ProductController@sum')->name('sum');
Route::get('/gettable', 'ProductController@gettable')->name('gettable');

Route::get('/customer', 'ProductController@customer')->name('customer');

//Route::get('/get_product', 'ProductController@get_product')->name('get_product')->middleware('auth');
Route::get('/get_product', 'ProductController@get_product')->name('get_product');
Route::get('/getbuyertable', 'ProductController@getbuyertable')->name('getbuyertable');
Route::get('/get_discount', 'ProductController@get_discount')->name('get_discount');


Route::get('/get_discounttable', 'ProductController@get_discounttable')->name('get_discounttable');

Route::get('/get_purchases', 'ProductController@get_purchases')->name('get_purchases');


//////////////////////////////////////////////////////////////////////////////


//////










