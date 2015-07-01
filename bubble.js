window.onload = function() {
	var w=window.innerWidth,h=window.innerHeight;
	//alert(w+","+h);
	var i=w/2,j=h/2,r=50,mr=150,sx,sy,textsize;
	var paper = new Raphael(document.getElementById('canvas_container'), w,h);
	//var mydata = JSON.parse(data);
	var texte,k,num=90,xc,yc,e=0,mx,my,xci,yci,nume=180,linecolor,linewidth;
	var arr = new Array();
	Raphael.fn.line = function(startX, startY, endX, endY){
    return this.path('M' + startX + ' ' + startY + ' L' + endX + ' ' + endY);

};

var testJSON = {
    "name":"total",
    "value":"200",
    "children":
    
   {
  
        "name":"a-b-c",
        "value":"80",
        "children":[
            {
"name":"a",
        "value":"79"                
            },
            {
            "name":"b",
        "value":"78"
            },
            {
            "name":"c",
        "value":"77"
            }
            ]
    },
    
    "children1":
    {
        "name":"d-e-f",
        "value":"90",
        "children":[
            {
"name":"d",
        "value":"89"                
            },
            {
            "name":"e",
        "value":"88",
            },
            {
            "name":"f",
        "value":"87"
            }
            ]
    },
     "children2":
    {
        "name":"g-h-i",
        "value":"100",
        "children":[
            {
"name":"g",
        "value":"99"                
            },
            {
            "name":"h",
        "value":"98"
            },
            {
            "name":"i",
        "value":"97"
            },
             {
            "name":"j",
        "value":"96"
            }
            ]
    },
     "children3":
    {
        "name":"l-m-n",
        "value":"110",
        "children":[
            {
"name":"l",
        "value":"109"                
            },
            {
            "name":"m",
        "value":"108"
            },
            {
            "name":"n",
        "value":"107"
            }
            ]
    },
    "children4":
    {
        "name":"o-p-q",
        "value":"120",
        "children":[
            {
"name":"o",
        "value":"119"                
            },
            {
            "name":"p",
        "value":"118"
            },
            {
            "name":"q",
        "value":"117"
            }
            ]
    },
    "children5":
    {
        "name":"r-s-t",
        "value":"140",
        "children":[
            {
"name":"r",
        "value":"139"                
            },
            {
            "name":"s",
        "value":"138"
            },
            {
            "name":"t",
        "value":"137"
            }
            ]
    },
    "children6":
    {
        "name":"u-v-w",
        "value":"150",
        "children":[
            {
"name":"u",
        "value":"149"                
            },
            {
            "name":"v",
        "value":"148"
            },
            {
            "name":"w",
        "value":"147"
            }
            ]
    }

}


var p=0,color;
function bubble(arg,ar,l)
{

	if(e==0)
	{
		xc=i;
		yc=j;
		sx=i;
		sy=j;
		r=50;
		color="grey";
        textsize=14;

	}
else if(ar==1)/*chiled*/
{
    textsize=10;
	if(p==0)
	{
		num=90;
		
	}
	
	if(isNaN(arg))
	{
	mr=100;
	sx=xc;
	sy=yc;
	//console.log("arrrr"+xc+","+yc+","+num);
xci=xc+mr*Math.cos((num/180)*(Math.PI));
//console.log("kkkx"+xc);
yci=yc+mr*Math.sin((num/180)*(Math.PI));
//console.log("kkky"+yc);
//console.log("arrrr"+xci+","+yci+","+num);	
num=num+25;
color="yellow";
linecolor="blue";
linewidth="3";
r=20;
p++;
//alert(p);
}
}
	else {/*parent*/
        textsize=12;
		if(isNaN(arg))
		{
//console.log("normal"+xc+","+yc+","+nume);
sx=i;
sy=j;
mr=300;

		xc=i+mr*Math.cos((nume/180)*(Math.PI));

yc=j+200*Math.sin((nume/180)*(Math.PI));
r=30;
color="green";
linecolor="red";
linewidth="5";
//console.log("normal"+xc+","+yc+","+nume);
nume=nume+45;
}
}
if(ar==1)/*chiled-cordinates*/
{
mx=xci;my=yci;	
}
else/*parent-cordinates*/
{
	mx=xc;my=yc;
}
	if(!isNaN(arg))/*draw circle with value*/
	{

var circle = paper.circle(mx,my,r);
circle.attr({fill: color}).toBack();
//console.log("mx"+mx+"my"+my);
paper.line(sx,sy,mx,my).attr({"stroke":linecolor,"stroke-width":linewidth}).toBack();
var texty= paper.text(mx,my,arg).attr({ "font-size": textsize, "font-family": "Arial, Helvetica, sans-serif" });
//console.log(arg);
e=e+1;
}

else/*label in circle*/
{
//console.log("mx"+mx+"my"+my);
	var texty= paper.text(mx-10,my-10,arg).attr({ "font-size": textsize, "font-family": "Arial, Helvetica, sans-serif" }).toFront();
	//console.log(arg);
}
}

var ar=0,l=0,li=0;
function scan(obj)
{
    console.log(obj);
	if(obj instanceof Array)
        	{
        		
        		l=obj.length;
        		//console.log(l);

        	}

    var k;
    if (obj instanceof Object) {
        console.log("objecttttt"+obj);
    	if(li<l)
    	{
    		ar=1;
    		//console.log(ar);
    	}
    	else
    	{
    		ar=0;
    		li=0;
    	}
        for (k in obj){
        	            
        	            if (obj.hasOwnProperty(k)){
            	scan(obj[k]);  
            }                
}        
li++;
    } else {
        
     //alert(obj); 
     // console.log("nonObject"+obj); 	
        		
bubble(obj,ar,l);
}

        	}
    
  

scan(testJSON);
}

