/* Student Name: Geoffrey Powell-Isom      */
/* Class:        CSD 122 JavaScript/JQuery */
/* Instructor:   Wendy Breiding            */
/* Assignment:   Final Project             */
/* File:         whiteboard.js             */
/* Description:  This file contains the JavaScript code for the Simple Office Whiteboard Application.*/


//This is the main $('document').ready() function
$('document').ready(function(){

	//boilerplate setup stuff
	var drawingStarted =                                 false; //track drawingStarted, which is true when a path is in-progress 
	var drawingNow     =                                 false; //track whether we're supposed to be drawingNow, but possibly the path hasn't been started
	var markerColor    =                               "black"; //keep track of the marker color
	var wb             =                      $('#whiteboard'); //make an easier way to refer to the whiteboard
	var wbElem         = document.getElementById("whiteboard"); //store the JS element for convenience
	var wbtx           =               wbElem.getContext("2d"); //get context
	wbtx.strokeStyle   =                           markerColor; //initialize stroke color
	wbtx.shadowColor   =                           markerColor; //initialize shadow color
	wbtx.shadowBlur    =                                     2; //initialize blur amount
	wbtx.shadowOffsetX =                                     0; //initialize shadow offset
	wbtx.shadowOffsetY =                                     0; //initialize shadow offset
	document.getElementById("markerColor").value        =                markerColor; //set color indicator text
	document.getElementById("markerColor").style.border = "5px solid " + markerColor; //set color indicator border

	//mousedown means the user wants to draw
	wb.mousedown(function(e){
		drawingNow = true;
	});

	//mouseup means we need to stop drawing
	wb.mouseup(function(e){
		drawingNow = false;
	});

	//mouseleave needs to stop the drawing, too
	wb.mouseleave(function(e){
		drawingNow = false;
	});

	//This is the main drawing code. We use the mouse coordinates for the drawing position.
	wb.mousemove(function(e){
		X = Math.round(e.pageX - $(this).offset().left); //get the X coordinate
		Y = Math.round(e.pageY - $(this).offset().top);  //get the Y coordinate
		document.getElementById("x-coordinate").value = X;
		document.getElementById("y-coordinate").value = Y;

		//We will not draw if it's not time to draw.
		if(drawingNow){
			//initialize the path, if it's time to draw but the drawing (aka path) hasn't been started yet
			if(!drawingStarted){
				wbtx.beginPath();
				wbtx.moveTo(X,Y);
				drawingStarted = true;  //Here we go, drawingStarted
			}
			wbtx.lineTo(X,Y);
			wbtx.stroke();
		}

		//close the path, when not drawing anymore
		if(!drawingNow && drawingStarted){
			wbtx.closePath();
			drawingStarted = false;
		}
	});

	//This is where we reset the canvas
	$('#totalReset').click(function(){
		wbtx.clearRect(0, 0, wbElem.width, wbElem.height);  //clear the canvas itself
		drawingStarted  =   false;     //stop drawingStarted
		drawingNow      =   false;     //turn off drawingNow
		markerColor     = 'black';     //reset the markerColor
		document.getElementById("markerColor").value = markerColor;
		document.getElementById("markerColor").style.border = "5px solid " + markerColor;
		wbtx.strokeStyle = markerColor;
		wbtx.shadowColor = markerColor;
		wbtx.shadowBlur  =           2;
	});

	//This is where we switch to the erase. It's not meant to be perfect. Erasers often aren't, and it sometimes has a nice effect.
	$('#eraser').click(function(){
		drawingStarted  =   false;     //stop drawingStarted
		drawingNow      =   false;     //turn off drawingNow
		markerColor     = 'white';     //reset the markerColor
		document.getElementById("markerColor").value = markerColor;
		document.getElementById("markerColor").style.border = "5px solid " + markerColor;
		wbtx.strokeStyle = markerColor;
		wbtx.shadowColor = markerColor;
		wbtx.shadowBlur  =          10;
	});

	//adjust marker color when the color indicator text field is updated; we can accept valid custom CSS colors
	$("#markerColor").change(function(){
		markerColor = document.getElementById("markerColor").value;
		document.getElementById("markerColor").style.border = "5px solid " + markerColor;
		wbtx.strokeStyle = markerColor;
		wbtx.shadowColor = markerColor;
		wbtx.shadowBlur  =           2;

		//The following 2 lines are a cheesy way of sanitizing invalid colors. They get rejected in the background, so this just repulls it and updates the foreground.
		markerColor = document.getElementById("markerColor").style.borderColor;
		document.getElementById("markerColor").value = markerColor;
	});

	//adjust marker color when the user clicks one of the preset color buttons
	$('.colorButton').click(function(){
		markerColor = $(this).val();  //The value from the colorButton is used for the color itself, so buttons can easily be aded.
		document.getElementById("markerColor").value = markerColor; //update the color indicator text field
		document.getElementById("markerColor").style.border = "5px solid " + markerColor; //update the color indicator border
		wbtx.strokeStyle = markerColor; //update the stroke
		wbtx.shadowColor = markerColor; //update the shadowColor
		wbtx.shadowBlur  =           2; 
	});

	$('.colorButton').each(function(){
		$(this).css('border', '5px solid ' + $(this).val());
	});
});

