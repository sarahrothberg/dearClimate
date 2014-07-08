

$(function(){
    setTimeout(function(){
        modal.open({modalContent: "Dear Climate is a collection of agitprop posters <br> and meditative audio experiences that help you<br> meet, befriend, and become climate change. <br> Please distribute freely."});
    })
    switchBackground();
    $(".headerNav").click(menuclicked);
    $("#dearClimate").click(homeclicked);
    if (window.location.hash !== ""){
        goToPage(window.location.hash.substr(2))   
    } else {
        goToPage("homepage");
    }
});


//below randomizes backgrounds. 
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

// below is the slideshow stuff

function slideshow(){
    $('.fadein img:gt(0)').hide();
    setInterval(function(){
      $('.fadein :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.fadein');}, 
      5000);
}

//below is the navigation script
function menuclicked(){
    var menuItem = $(this).attr("id");
    goToPage(menuItem);
}

function homeclicked(){
    goToPage("homepage");
}

function goToPage(menuItem){  
    $.get(menuItem+".html", function(content){
        $("#contentContainer").html(content)
    });
    $(".isSelected").removeClass("isSelected");
    window.location.hash = "/"+menuItem;
    $(".headerNav#"+menuItem).addClass("isSelected");
}


// $('#mute').on("click", function (e)){
//     var audio = $('#homeAudio')[0];
//     audio.muted = !audio.muted;
//     e.preventDefault();
//     console.log("muted");
// });

