
var numberOfPosters = 68;

/* ----------------- INITIAL STUFF -----------------*/
$(function(){
    setTimeout(function(){
        modal.open({modalContent: "Dear Climate is a collection of agitprop posters <br> and meditative audio experiences that help you<br> meet, befriend, and become climate change. <br> Please distribute freely."});
    })
    switchBackground();
    // $(".headerNav").click(menuclicked);
     $(document).on("click", ".headerNav", menuclicked);
    // $("#dearClimate").click(homeclicked);
    $(document).on("click", "#dearClimate", homeclicked);
    if (window.location.hash !== ""){
        goToPage(window.location.hash.substr(2))   
    } else {
        goToPage("homepage");
    }

});


/* ----------------- BACKGROUND RANDOMIZATION -----------------*/
//to add a new background, add the filename to the array "allBackgrounds"
var allBackgrounds = ["bg_rain1.jpg", "bg_rain2.jpg"];

function switchBackground(){
	var randBackgroundIndex = Math.floor(Math.random() * allBackgrounds.length);
	var backgroundName = "./img/backgrounds/"+allBackgrounds[randBackgroundIndex];
	$("#mainContainer").css({
		"background" : "url("+backgroundName+")"
	});
	console.log(backgroundName);
}


/* ----------------- NAVIGATION -----------------*/
function menuclicked(){
    var menuItem = $(this).attr("id");
    goToPage(menuItem);
}

function homeclicked(){
    goToPage("homepage");
}

function goToPage(menuItem){  
    console.log("1")
    $.get(menuItem+".html", function(content){
        console.log("2")
        $("#contentContainer").html(content)
    });
    $(".isSelected").removeClass("isSelected");
    window.location.hash = "/"+menuItem;
    $(".headerNav#"+menuItem).addClass("isSelected");
}

/* ----------------- HOME SLIDESHOW -----------------*/

//these functions are called in modal.js, when the modal is closed and when homeclicked() is called

var slideshowIndex = Math.floor(Math.random()*numberOfPosters);
var nextImage, oldImage;
var slideshowInterval;

function addFirstPoster(){
    oldImage = $("<img>").attr("src", "./img/jpgs/"+slideshowIndex+".jpg").appendTo("#slideshowPoster");
    oldImage.fadeTo(500, 1);
}

function slideshow(){
    if (!slideshowInterval){
        slideshowInterval = setInterval(function(){
            slideshowIndex++;
            slideshowIndex = slideshowIndex % numberOfPosters;
            if (oldImage){
                oldImage.fadeTo(500, 0, function(){
                    oldImage.remove();
                });
            }
            var nextImage = $("<img>").attr("src", "./img/jpgs/"+slideshowIndex+".jpg").appendTo("#slideshowPoster");
            nextImage.fadeTo(500, 1, function(){
                oldImage = nextImage;
            });
          /*$('.fadein :first-child').fadeOut()
             .next('img').fadeIn()
             .end().appendTo('.fadein');}, */
        }, 5000);
    }
}



/* ----------------- HOME MUTE CONTROL -----------------*/

 $(document).on("click", "#mute", function(e){
    var audio = $(this).find("audio")[0];
    e.preventDefault();
    if(audio){
        if (audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
    }
});

/* ----------------- POSTERS PAGE CAROUSEL -----------------*/

//makes a div for each image
//makes an img for each image
//puts the img in the div
function makeAllThePosters(){
    for(var i = 0; i < numberOfPosters; i++){
        var parent = $("<div>").addClass("thumbs").appendTo("#thumbContainer");
        $("<img>").attr("src", "./img/thumbs/" + i + ".jpg").appendTo(parent);
    }
    browsePosters();
}

function browsePosters(){
    $(".thumbs").click(function(e){
        var thumb = $(this).find("img");
        var src = $(thumb).attr("src");
        console.log(src);
        // src = "../thumb/this_image_name.jpg"
        src = src.substring(13);
        //src = "this_image_name.jpg"
        $("#posterjpg").attr("src", "./img/jpgs/"+src);
        // $("#posterjpg").attr("width", "300px");
        $("#downloadPDFbutton").attr("href", "./img/pdfs/"+src.replace("jpg", "pdf"));
        console.log(src);
    });
console.log("browsePosters")
}






/* ----------------- OLD CAROUSEL METHOD -----------------*/
 // function browsePosters(){
    //  wrap all thumbs in a <div> for the 3x3 grid
    // $div = null;
    // $('#thumbs').children().each(function(i) {
    //     if ( i % 9 == 0) {
    //         $div = $( '<div />' );
    //         $div.appendTo( '#thumbs' );
    //     }
    //     $(this).appendTo( $div );
    //     $(this).addClass( 'itm'+i );
    //     $(this).click(function() {
    //         $('#images').trigger( 'slideTo', [i, 0, true] );
    //     });
    // });
    // $('#thumbs img.itm0').addClass( 'selected' );
 
    // //  the big-image carousel
    // $('#images').carouFredSel({
    //     direction: 'up',
    //     circular: false,
    //     infinite: false,
    //     width: 350,
    //     height: 350,
    //     items: 1,
    //     auto: false,
    //     prev: '#prev .images',
    //     next: '#next .images',
    //     scroll: {
    //         fx: 'directscroll',
    //         onBefore: function() {
    //             var pos = $(this).triggerHandler( 'currentPosition' );
    //             $('#thumbs img').removeClass( 'selected' );
    //             $('#thumbs img.itm'+pos).addClass( 'selected' );
                
    //             var page = Math.floor( pos / 9 );
    //             $('#thumbs').trigger( 'slideToPage', page );
    //         }
    //     }
    // });
 
    //  the thumbnail-carousel
    // $('#thumbs').carouFredSel({
    //     direction: 'up',
    //     circular: false,
    //     infinite: false,
    //     width: 350,
    //     height: 350,
    //     items: 1,
    //     align: false,
    //     auto: false,
    //     prev: '#prev .thumbs',
    //     next: '#next .thumbs'
    // });