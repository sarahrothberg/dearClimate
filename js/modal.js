//below is the modal stuff

var modal = (function(){
    var 
    method = {},
    $modalOverlay,
    $modal,
    $modalContent,
    $modalClose;

    // Center the modal in the viewport
    method.center = function () {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top:top + $(window).scrollTop(), 
            left:left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function (settings) {
        $modalContent.empty().append(settings.modalContent);

        $modal.css({
            width: settings.width || 'auto', 
            height: settings.height || 'auto', 
            opacity: 1,
            transform: "scale(1)"
        })

        $modalOverlay.css({
            opacity:0.8
        })

        method.center();
        // $modal.show();
        // $modalOverlay.show();
    };

    // Close the modal
    method.modalClose = function () {
        $modal.hide();
        $modalOverlay.hide();
        $modalContent.empty();
        $(window).unbind('resize.modal');

    };

    // Append the HTML
    $modalOverlay = $('<div id="modalOverlay"></div>');
    $modal = $('<div id="modal"></div>');
    $modalContent = $('<div id="modalContent"></div>');
    $modalClose = $('<a id="modalClose" href="#"><center>ENTER</center></a>');

    // $modal.hide();
    // $modalOverlay.hide();
    $modal.append($modalContent, $modalClose);

    $(document).ready(function(){
        $('body').append($modalOverlay, $modal);
    });

    $modalClose.click(function(e){
        e.preventDefault();
        method.modalClose();
        slideshow();
    });
    return method;
}());