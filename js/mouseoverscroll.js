// Constants
var boxWidth = 250; /* width of the mouseover boxes left and right */
var brake = 80; /* the bigger this number, the slower the movement */
var t;
	
window.onload=function () {
	var div = $('.galleryWrapper');
	var wrapperWidth = div.width();
	
	var numberOfItems = $(".galleryItems").children().length;
	var itemWidth = $(".galleryItems").children(":first-child").outerWidth();
	var maxScrollLeft = (itemWidth*numberOfItems)-wrapperWidth+20;
	$(".galleryItems").css("width", (itemWidth*numberOfItems)+"px")
	
	div.mouseover(function(e) {
		if((div.scrollLeft()>=0) && (div.scrollLeft()<=maxScrollLeft)) {
			moveIt(e, wrapperWidth);
		}
	});
	
	div.mousemove(function(e) {
		if((div.scrollLeft()>=0) && (div.scrollLeft()<=maxScrollLeft)) {
			moveIt(e, wrapperWidth);
		}
	});
	
	div.mouseout(function() {
		clearInterval(t);
	});
}

function moveIt(e, wrapperWidth) {
	clearInterval(t);
	
	var relPos= e.pageX-$('.galleryWrapper').position().left;
	
	if (relPos>(wrapperWidth-boxWidth)) {
		var acceleration = (((relPos-(boxWidth+100))/brake)^2);
		t = setInterval(function() {goRight(acceleration)}, 13); 
	
	} else if(relPos<boxWidth) {
		var acceleration = (((wrapperWidth-relPos-(boxWidth+100))/brake)^2);
		t = setInterval(function() {goLeft(acceleration)}, 13); 
	}	
}

function goLeft(acceleration) {
	var div = $('.galleryWrapper');
	div.scrollLeft(div.scrollLeft()-acceleration);
}

function goRight(acceleration) {
	var div = $('.galleryWrapper');
	div.scrollLeft(div.scrollLeft()+acceleration);
}