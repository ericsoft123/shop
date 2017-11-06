<!doctype html>
<html>
<head>
<meta name="csrf-token" content="{{ csrf_token() }}" />
<title>Project Test</title>

<!--<script src="{{url('js/jquery.js')}}"></script>
<script src="{{url('js/bootstrap.min.js')}}"></script>-->
 
    
<link rel="stylesheet" href="{{URL('css/bootstrap.min.css')}}">

<!---->
<!-- Material Design Bootstrap -->
<link href="{{URL('css/mdb.min.css')}}" rel="stylesheet">
    <!-- Your custom styles (optional) -->
    <link href="{{URL('css/style.css')}}" rel="stylesheet">
   
    <link rel="stylesheet" href="{{URL('css/animate.css')}}">
    
    <link href="{{URL('font-awesome/css/font-awesome.css')}}" rel="stylesheet">
    <!--<link href="{{URL('css/datepicker3.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="c{{URL('ss/survey.css')}}">-->
    <!-- JQuery -->
    <script type="text/javascript" src="{{URL('js/jquery-3.1.1.min.js')}}"></script>
    <script type="text/javascript" src="{{URL('js/jquery.typedtext.js')}}"></script>
    <!-- Data picker -->
   <script src="{{URL('js/bootstrap-datepicker.js')}}"></script>
    <script src="{{URL('js/typeahead.min.js')}}"></script>
    
    <!-- Bootstrap tooltips -->
    <script type="text/javascript" src="{{URL('js/tether.min.js')}}"></script>
    <!-- Bootstrap core JavaScript -->
    <script type="text/javascript" src="{{URL('js/bootstrap.min.js')}}"></script>
    <!-- MDB core JavaScript -->
  <!--  <script type="text/javascript" src="{{URL('js/mdb.min.js')}}"></script>-->
     
<!---->
 <script src="{{ asset('js/app.js') }}"></script>
<!---->
<script src="{{url('js/jsajax.js')}}"></script>


</head>
 

<body>

<div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        {{ config('app.name', 'Laravel') }}
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>
  <div class="container test1"><!---div container start-->

    <!-- this is to center column in bootstrap using class="col-xs-1" align="center" -->
    	<!--<div class="col-xs-1 " align="center"><!--class col-xs-1" align="center" start-->
    	<div class="row">
    	
    	<div class="col-md-3">
    		
    	</div>
    	<div class="col-md-6 test animated bounceInRight" id="fullform"><!-- Start div that contain full form-->
   			<form class="form-horizontal" method="post" enctype="multipart/form-data" name="formadd_data" id="formadd_data" action="{{url('publish_news')}}">
    {{ csrf_field() }}
    			<div class="well">
    <div class="card-block">

        <!--Header-->
        <div class="text-center">
          
            <h3 class="demo"><i class="fa fa-pencil animated  bounce"></i><span id="demo-1"></span> </h3>
            <hr class="mt-2 mb-2">
        </div>

      <div class="md-form" id="iddata">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="id" name="id" placeholder="Product_name" required>
            <label for="form3" id="labelchange" ></label>
        </div>
        <div class="md-form">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="product_name" name="product_name" placeholder="Product_name" required>
            <label for="form3" id="labelchange" ></label>
        </div>
        <div class="md-form">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="quantity" name="quantity" placeholder="quantity" required>
            <label for="form3" id="labelchange" ></label>
        </div>
         <div class="md-form" id="quantity_hide">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="to_quantity" name="to_quantity" placeholder="Discount To Quantity" required>
            <label for="form3" id="labelchange" ></label>
        </div>
        <div class="md-form">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="price" name="price" placeholder="Price" required>
            <label for="form3" id="labelchange" ></label>
        </div>
        <div class="md-form" id="price_hide">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="to_price" name="to_price" placeholder="Discount To Price" required>
            <label for="form3" id="labelchange" ></label>
        </div>
       <div class="md-form" id="percentage_hide">
            <i class="fa fa-comment prefix"></i>
            <input type="text"  class="name tt-query" id="percentage" name="percentage" placeholder="Type discount percentage i.e=10" required>
            <label for="form3" id="labelchange" ></label>
        </div>
       
       
       
         
          

        <div class="text-center">
            <button class="btn btn-deep-orange"  id="send" name="send">Send</button>
            <button class="btn btn-deep-orange"  id="update" name="update">Update</button>
            <button class="btn btn-deep-orange"  id="set_discount" name="set_discount">Set discount</button>
        </div>

    </div>
</div>
    	</div>
    	</form>
		</div><!-- Start div that contain full form-->
    
<div class="container">

	
	
<!--<input type="submit" id="testi" value="submit"/>-->

<!--new table -->
<div class="table-responsive" id="tabledata" >
 
    
 <!-- table data that come from projectcontroller.php-->   
    
</div>
<!--new table -->
<div class="row">
<div class="col-md-7"></div>
	<div class="col-md-4">
		<span >Total Value numbers</span><p id="totalall"></p>
	</div>
</div>


</div>



</div>

</body>
</html>



