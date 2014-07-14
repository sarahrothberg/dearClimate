
var numberOfPosters = 68;

/* ----------------- INITIAL STUFF -----------------*/
$(function(){
    setTimeout(function(){
        modal.open({modalContent: "Dear Climate is a collection of agitprop posters <br> and meditative audio experiences that help you<br> meet, befriend, and become climate change. <br> Please distribute freely."});
    })
    switchBackground();
    // $(".headerNav").click(menuclicked);
     $(document).on("click touchStart", ".headerNav", menuclicked);
    // $("#dearClimate").click(homeclicked);
    $(document).on("click touchStart", "#dearClimate", homeclicked);
    if (window.location.hash !== ""){
        goToPage(window.location.hash.substr(2))   
    } else {
        goToPage("homepage");
    }

});


/* ----------------- BACKGROUND RANDOMIZATION -----------------*/
//to add a new background, add the filename to the array "allBackgrounds"
var allBackgrounds = ["bg_rain1.jpg", "garbage-04.jpg",  "bg_3.jpg", "clouds-07.jpg","bg_rain2.jpg","glaciers-01.jpg"];


var randBackgroundIndex = Math.floor(Math.random() * allBackgrounds.length);

function switchBackground(){
    randBackgroundIndex++;
    randBackgroundIndex = randBackgroundIndex % allBackgrounds.length;
    var backgroundName = "./img/backgrounds/"+allBackgrounds[randBackgroundIndex];
    $("body").css({
        "backgroundImage" : "url("+backgroundName+")"
    });
}

// function switchBackground(){
// 	var randBackgroundIndex = Math.floor(Math.random() * allBackgrounds.length);
// 	var backgroundName = "./img/backgrounds/"+allBackgrounds[randBackgroundIndex];
// 	$("body").css({
// 		"backgroundImage" : "url("+backgroundName+")"
// 	});
// }


/* ----------------- NAVIGATION -----------------*/
function menuclicked(){
    var menuItem = $(this).attr("id");
    $("#contentContainer").fadeTo(1000,0,function(){
        goToPage(menuItem);
    });
    switchBackground();
}

function homeclicked(){
    $("#contentContainer").fadeTo(1000,0,function(){
        goToPage("homepage");
    });    
    switchBackground();
}

function goToPage(menuItem){  
    $.get(menuItem+".html", function(content){
        $("#contentContainer").html(content);
        $("#contentContainer").fadeTo(1000,1);
        
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
    setPoster("0.jpg");
}

function browsePosters(){
    $(".thumbs").click(function(e){
        var thumb = $(this).find("img");
        $(".selectedThumb").removeClass("selectedThumb");
        $(this).addClass("selectedThumb");
        var src = $(thumb).attr("src");
        console.log(src);
        // src = "../thumb/this_image_name.jpg"
        src = src.substring(13);
        setPoster(src);

    });
console.log("browsePosters")
}

function setPoster(name){
    $("#posterjpg").attr("src", "./img/jpgs/"+name);
    $(".downloadPDFbutton").attr("href", "./img/pdfs/"+name.replace("jpg", "pdf"));
    console.log(name);   
}



/* ----------------- WRITE ON EFFECT -----------------*/

function writeOn(){
     // $(".dearClimateLetter").typed({
     //    strings: ["\n\nDear Climate, \n\nWe really blew it. ^1000 We're sorry. ^1000 We had other ideas and forgot \nabout finitude."],
     //    typeSpeed: 100
     //  });

    $("#dearClimateLetter").typed({
        strings: [$("#letterText").text()],
        typeSpeed: 100
    });
}

