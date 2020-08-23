var selectedShape="custom";

function sayHi(){
    console.log("Hi");

}

//Slider and Text Box Functions
function updateLocationText(val)
{
    document.getElementById("loc-value").value=val;
}
function updateLocationSlider(val)
{
    document.getElementById("loc-slider").value=val;
}
function updateMomentsText(val)
{
    document.getElementById("mom-loc-value").value=val;
}
function updateMomentsSlider(val)
{
    document.getElementById("mom-loc-slider").value=val;
}
function updateSupportText(val)
{
    document.getElementById("sup-loc-value").value=val;
}
function updateSupportSlider(val)
{
    document.getElementById("sup-loc-slider").value=val;
}


//Support Functions
var sup_types=[];
var sup_locs=[];

function addSupport()
{
    var sup_type;

    if(document.getElementById("rb-fixed").checked==true)
    {
        sup_type="Fixed";
    }
    else if(document.getElementById("rb-pin").checked==true)
    {
        sup_type="Pin";
    }
    else
    {
        sup_type="Roller";
    }
    var loc=document.getElementById("sup-loc-value").value;

    var table=document.getElementById("supports-table");
    var row = table.insertRow(sup_types.length+1);
    var cell_sup = row.insertCell(0);
    var cell_loc = row.insertCell(1);

    cell_sup.innerHTML = sup_type;
    cell_loc.innerHTML = loc;

    //Adding supports to the two arrays
    sup_types.push(sup_type);
    sup_locs.push(loc);

    //Clearing Supports Form
    document.getElementById("sup-loc-value").value="";

}


//Point Load Functions
var pl_forces=[];
var pl_locs=[];

var force0;
var loc0;

function addForce()
{
    var mag=document.getElementById("tb-pl-mag").value;
    var force=0;
    if(document.getElementById("pl-up").checked==false)
    {
        force=-mag;
    }
    else
    {
        force=mag;
    }
    var loc=document.getElementById("loc-value").value;

    var table=document.getElementById("point-loads-table");
    var row = table.insertRow(pl_forces.length+1);
    var cell_force = row.insertCell(0);
    var cell_loc = row.insertCell(1);

    cell_force.innerHTML = force;
    cell_loc.innerHTML = loc;

    //Adding forces to the two arrays
    pl_forces.push(force);
    pl_locs.push(loc);

    force0=force;
    loc0=loc;

    //Clearing Point Loads Form
    document.getElementById("tb-pl-mag").value="";
    document.getElementById("loc-value").value="";
    
}

//Moments Functions

var mom_moments=[];
var mom_locs=[];

function addMoment()
{
    var mag=document.getElementById("tb-mom-mag").value;
    var moment=0;
    if(document.getElementById("mom-cw").checked==false)
    {
        moment=mag;
    }
    else
    {
        moment=-mag;
    }
    var loc=document.getElementById("mom-loc-value").value;

    var table=document.getElementById("moments-table");
    var row = table.insertRow(mom_moments.length+1);
    var cell_mom = row.insertCell(0);
    var cell_loc = row.insertCell(1);

    cell_mom.innerHTML = moment;
    cell_loc.innerHTML = loc;

    //Adding forces to the two arrays
    mom_moments.push(moment);
    mom_locs.push(loc);

    //Clearing Form
    document.getElementById("tb-pl-mag").value="";
    document.getElementById("loc-value").value="";
    
}

//DistributedLoads Functions

var dl_loads=[];
var dl_orders=[];
var dl_starts=[];
var dl_stops=[];

function addDistributedLoad()
{
    var type = document.getElementById("cb-dl-type").value;
    if(type=="const")
    {
        var w = document.getElementById("dl-const-mag").value;
        if(document.getElementById("dl-const-up").checked==false){
            w=w*-1;
        }
        var a = document.getElementById("dl-const-a").value;
        var b = document.getElementById("dl-const-b").value;

        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = w + "N/m constant";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";
        
        //Adding load to the arrays
        dl_loads.push(w);
        dl_orders.push(0);
        dl_starts.push(a);
        dl_stops.push(b);

        //Clearing Distributed Loads Form
        document.getElementById("dl-const-mag").value="";
        document.getElementById("dl-const-a").value="";
        document.getElementById("dl-const-b").value="";
    }

    else if(type=="ramp")
    {
        var w = document.getElementById("dl-ramp-w").value;
        var a = document.getElementById("dl-ramp-a").value;
        var b = document.getElementById("dl-ramp-b").value;

        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = w + "N/m constant";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";
        
        //Adding load to the arrays
        dl_loads.push(w);
        dl_orders.push(1);
        dl_starts.push(a);
        dl_stops.push(b);

        //Clearing Distributed Loads Form
        document.getElementById("dl-ramp-mag").value="";
        document.getElementById("dl-ramp-a").value="";
        document.getElementById("dl-ramp-b").value="";

    }

    else if(type=="trap" )
    {
        var w1 = document.getElementById("dl-trap-w1").value;
        if(document.getElementById("dl-trap-w1-up").checked==false){
            w1=w1*-1;
        }
        var w2 = document.getElementById("dl-trap-w2").value;
        if(document.getElementById("dl-trap-w2-up").checked==false){
            w2=w2*-1;
        }
        var a = document.getElementById("dl-trap-a").value;
        var b = document.getElementById("dl-trap-b").value;

        //Adding Constant Portion of Trapezoidal Load
        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = w1 + "N/m constant";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";

        dl_loads.push(w1);
        dl_orders.push(0);
        dl_starts.push(a);
        dl_stops.push(b);

        //Adding Ramp Portion of Trapezoidal Load
        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = (w2-w1) + "N/m ramp";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";

        dl_loads.push(w2-w1);
        dl_orders.push(1);
        dl_starts.push(a);
        dl_stops.push(b);

    }

    else if(type=="poly" )
    {
        var w1 = document.getElementById("dl-poly-w1").value;
        if(document.getElementById("dl-poly-w1-up").checked==false){
            w1=w1*-1;
        }
        var w2 = document.getElementById("dl-poly-w2").value;
        if(document.getElementById("dl-poly-w2-up").checked==false){
            w2=w2*-1;
        }
        var order = document.getElementById("dl-poly-order").value;
        var a = document.getElementById("dl-poly-a").value;
        var b = document.getElementById("dl-poly-b").value;

        //Adding Constant Portion of Trapezoidal Load
        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = w1 + "N/m constant";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";

        dl_loads.push(w1);
        dl_orders.push(0);
        dl_starts.push(a);
        dl_stops.push(b);

        //Adding Ramp Portion of Trapezoidal Load
        var table=document.getElementById("dl-table");
        var row = table.insertRow(dl_loads.length+1);
        var cell_load = row.insertCell(0);
        var cell_start = row.insertCell(1); 
        var cell_end = row.insertCell(2);

        var load = (w2-w1) + "N/m order" + order + " poly ramp";
        cell_load.innerHTML = load;
        cell_start.innerHTML = a+"m";
        cell_end.innerHTML = b+"m";

        dl_loads.push(w2);
        dl_orders.push(order);
        dl_starts.push(a);
        dl_stops.push(b);
    }

}

function calculateI()
{
        var I_calc;
        if(selectedShape=="custom")
        {
            I_calc = $("#I").val();
        }

        else if(selectedShape=="rectangle")
        {
            var h = $("#rect-h").val();
            var b = $("#rect-b").val();
            I_calc = (b*h*h*h)/12;
        }

        else if(selectedShape=="circle")
        {
            var r = $("#circ-d").val()/2
            I_calc = (3.14159265*r*r*r*r)/4;
        }

        else if(selectedShape="box")
        {
            var b = $("#box-b").val();
            var h = $("#box-h").val();
            var t1 = $("#box-t1").val();
            var t2 = $("#box-t2").val();
            var t3 = $("#box-t3").val();
            var t4 = $("#box-t4").val();

            var I_whole = (b*h*h*h)/12;
            var I1  = (b/2-t4)*(h/2-t1)*(h/2-t1)*(h/2-t1)/3;
            var I2 = (b/2-t3)*(h/2-t1)*(h/2-t1)*(h/2-t1)/3;
            var I3 = (b/2-t3)*(h/2-t2)*(h/2-t2)*(h/2-t2)/3;
            var I4 = (b/2-t4)*(h/2-t2)*(h/2-t2)*(h/2-t2)/3;

            I_calc = I_whole - I1-I2-I3-I4;

        }

        else if(selectedShape="pipe")
        {
            var R = $("#pipe-d").val()/2;
            var r = R-$("#pipe-t").val();
            var I1 = (3.14159265*R*R*R*R)/4;
            var I2 = (3.14159265*r*r*r*r)/4;
            I_calc = I1-I2;
        }

        else if(selectedShape="i")
        {
            var B = $("#i-B").val();
            var yb = $("#i-yb").val();
            var yt = $("#i-yt").val();
            var ht = $("#i-ht").val();
            var hb = $("#i-hb").val();
            var a = $("#i-a").val();
            var b = $("#i-b").val();
            var B1 = B-a;
            var b1 = b-a;

            I_calc = (1/3)*(B*Math.pow(yb,3) - B1*Math.pow(hb, 3) + b*Math.pow(yt,3) - b1*Math.pow(ht,3) );

        }

        return(I_calc);
        

}

$(document).ready(function(){


$("#calculate").click(function(event)
    {
    $(window).scrollTop(0);
    $("#loading").show();
    $("#load").hide();
    $("#fail").hide();
    $("#results-header").hide();


    $.ajax({
        data: {
            ElaMod: $("#E").val(),
            SecMom: calculateI(),
            bLen : $("#beam-length").val(),
            supTypes: JSON.stringify(sup_types),
            supLocs: JSON.stringify(sup_locs),
            plForces : JSON.stringify(pl_forces),
            plLocs : JSON.stringify(pl_locs),
            momMoments:JSON.stringify(mom_moments),
            momLocs:JSON.stringify(mom_locs),
            dlLoads:JSON.stringify(dl_loads),
            dlOrders:JSON.stringify(dl_orders),
            dlStarts:JSON.stringify(dl_starts),
            dlStops:JSON.stringify(dl_stops)
            
        },
        type:'POST',
        url:'/process'            
    })
    .done(function(data)
    {
        if(data.status==1)
        {
            $(window).scrollTop(0);
            $("#loading").hide();
            $("#results-header").show();
            $("#load").show();
            $("#fail").hide();
        }
        else
        {
            $(window).scrollTop(0);
            $("#loading").hide();
            $("#results-header").show();
            $("#fail").show();
            $("#load").hide();
        }
      

    });
    event.preventDefault();
    
    });


$("#beam-length").change(function()
{
    $(".slider").attr('max', $("#beam-length").val());
});


$("#clear-point-load").click(function()
{
    $("#tb-pl-mag").val("");
    $("#loc-val").val("0");

});

$("#clear-sup").click(function()
{
    $("#sup-loc-value").val("0");


});

$("#clear-moment").click(function()
{
    $("#mom-loc-value").val("0");
    $("#tb-mom-mag").val("");

});

$("#clear-dl").click(function()
{
    $(".dl-weight").val("");
    $(".dl-loc").val("0");
});



$('[data-toggle="tooltip"]').tooltip({placement:'right'});   


$("#cb-cross-section-shape").change(function()
{
    selectedShape = $(this).children("option:selected").val();
    var visibleDiv = "#"+selectedShape;
    $(".shape").css('display','none');
    $(visibleDiv).css('display','inline')

});

$("#cb-dl-type").change(function()
{
    var selectedShape = $(this).children("option:selected").val();
    var visibleDiv = "#"+selectedShape;
    $(".dl-type").css('display','none');
    $(visibleDiv).css('display','inline')

});


$(".dropdown-menu li a").click(function(){
      
      $(".btn:first-child").text($(this).text());
       $(".btn:first-child").val($(this).text());
});

$( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );

/*var $regexlen=/^(\d*\.)?\d+$/;
var $regexlen = /^[1-9][\.\d e]*(,\d+)?$/;

$('#beam-length').on('keypress keydown keyup',function(){
             if (!$(this).val().match($regexlen)) {
              // there is a mismatch, hence show the error message
                 $('.emsg').removeClass('hidden');
                 $('.emsg').show();
             }
           else{
                // else, do not display message
                $('.emsg').addClass('hidden');
               }
         });
*/

});//document ready
