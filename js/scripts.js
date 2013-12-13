$(window).load(function(){

	"use strict";

	// Button Heights and Widths
	
	$('.btn-wrapper').each(function(){
	
		var btnHeight = $(this).children('.btn').outerHeight();
		var btnWidth = $(this).children('.btn').outerWidth();
		
		$(this).css('height', btnHeight);
		$(this).css('width', btnWidth);
	
	});


});

$(document).ready(function(){

	"use strict";

	// Smooth Scrolling
	
	$('.scroll').smoothScroll({
        offset: -70,
        speed: 800
    });
    
    // Mobile Menu Toggle
    
    $('.open-menu').click(function(){
    
    	if($('#nav').hasClass('open-nav')){
    		$('#nav').removeClass('open-nav');
    	}else{
    		$('#nav').addClass('open-nav');
    	}
    
    });

	// Initialize Sliders

	$('#home-slider').flexslider({ controlNav: false });
	
	// Service Clicks
	
	$('.service').click(function(){
	
		//if($(this).hasClass('open-service')){
		//	$(this).removeClass('open-service');
		//}else{
		//	$(this).addClass('open-service');
		//}
	
	});
	
	// Open & Close Projects
	
	$('.work-overlay').click(function(){
	
		$('.project').removeClass('open-project');
	
		var projectID = '#' + $(this).parent().parent().attr('data-project-id');
		var slideShowID = projectID + '-slideshow';
		
		if(!$(this).parent().parent().hasClass('open-project')){
			$(projectID).addClass('open-project');
			$(slideShowID).flexslider({ controlNav: false });
			
		}
		
		
		
		$('html,body').animate({
		scrollTop: $(projectID).offset().top
		}, 800);
		
	
	});
	
	$('.close-project').click(function(){
	
		$(this).closest('.project').removeClass('open-project');
		
		$('html,body').animate({
		scrollTop: $('#work-nav').offset().top - 90
		}, 800);
	
	});
	
	// Map Toggle
	
	$('#map-toggle').click(function(){
	
		if($('#contact-holder').hasClass('contact-fade')){
			$('#contact-holder').removeClass('contact-fade');
		}else{
			$('#contact-holder').addClass('contact-fade');
		}
	
	});
	
	
	// Contact Form Code
	
	$('#contact-form .btn-wrapper').click(function(){
	
		var name = $('#form-name').val();
		var email = $('#form-email').val();
		var message = $('#form-message').val();
		var error = 0;
		
		if(name === '' || email === '' || message === ''){
			error = 1;
			$('#details-error').fadeIn(200);
		}else{
			$('#details-error').fadeOut(200);
		}
		
		if (!(/(.+)@(.+){2,}\.(.+){2,}/.test(email))) {
			$('#details-error').fadeIn(200);
			error = 1;
		}
		
		 var dataString = 'name=' + name + '&email=' + email + '&text=' + message;

            if (error === 0) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: dataString,
                    success: function () {
                        $('#details-error').fadeOut(1000);
                        $('#form-sent').fadeIn(1000);
                    }
                });
                return false;
            }
	
	});
	
	


});
addEvent(window, 'load', initForm);

var highlight_array = new Array();

function initForm(){
	initializeFocus();
	var activeForm = document.getElementsByTagName('form')[0];
	addEvent(activeForm, 'submit', disableSubmitButton);
	ifInstructs();
	showRangeCounters();
}

function disableSubmitButton() {
	document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
	var fields = getElementsByClassName(document, "*", "field");
	
	for(i = 0; i < fields.length; i++) {
		if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
			fields[i].onclick = function() {highlight(this, 4);};
			fields[i].onfocus = function() {highlight(this, 4);};
		}
		else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
			fields[i].onfocus = function(){highlight(this, 3);};
		}
		else {
			fields[i].onfocus = function(){highlight(this, 2); };
		}
	}
}

function highlight(el, depth){
	if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
	if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
	if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
	
	addClassName(fieldContainer, 'focused', true);
	var focusedFields = getElementsByClassName(document, "*", "focused");
	
	for(i = 0; i < focusedFields.length; i++) {
		if(focusedFields[i] != fieldContainer){
			removeClassName(focusedFields[i], 'focused');
		}
	}
}

function ifInstructs(){
	var container = document.getElementById('public');
	if(container){
		removeClassName(container,'noI');
		var instructs = getElementsByClassName(document,"*","instruct");
		if(instructs == ''){
			addClassName(container,'noI',true);
		}
		if(container.offsetWidth <= 450){
			addClassName(container,'altInstruct',true);
		}
	}
}

function showRangeCounters(){
	counters = getElementsByClassName(document, "em", "currently");
	for(i = 0; i < counters.length; i++) {
		counters[i].style.display = 'inline';
	}
}

function validateRange(ColumnId, RangeType) {
	if(document.getElementById('rangeUsedMsg'+ColumnId)) {
		var field = document.getElementById('Field'+ColumnId);
		var msg = document.getElementById('rangeUsedMsg'+ColumnId);

		switch(RangeType) {
			case 'character':
				msg.innerHTML = field.value.length;
				break;
				
			case 'word':
				var val = field.value;
				val = val.replace(/\n/g, " ");
				var words = val.split(" ");
				var used = 0;
				for(i =0; i < words.length; i++) {
					if(words[i].replace(/\s+$/,"") != "") used++;
				}
				msg.innerHTML = used;
				break;
				
			case 'digit':
				msg.innerHTML = field.value.length;
				break;
		}
	}
}

/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];		
		if(oRegExp.test(oElement.className)){
			arrReturnElements.push(oElement);
		}	
	}
	return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );	
  }
}