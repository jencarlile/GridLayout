
(function() {

    var gridUnits = 6.0;

    $("#searchBar").hide();

    function updateGridCSS() {
        var gw = $("#workspace").width() / gridUnits;
        var gh = $(".container").first().height() / gridUnits;

        function applyTransform(selector, transformString) {
            $(selector).each(function(){
                $(this).css('-webkit-transform', transformString);
            });
        }

        function setSize(selector, w, h) {
            $(selector).each(function(){
                $(this).width(w);
                $(this).height(h);
            });
        }

        for (var x = 0; x < gridUnits; x++) {
            for (var y = 0; y < gridUnits; y++) {
                var transStr = 'translate(' + x*gw + 'px,' + y*gh + 'px)';
                var positionSelector = '.at' + x + '_' + y;
                applyTransform(positionSelector, transStr);

                var sizeSelector = '.pane' + (x+1) + 'x' + (y+1);
                var width = Math.floor(gw * (x+1));
                var height = Math.floor(gh * (y+1));
                setSize(sizeSelector, width, height);
            }
        }
    }


    function toggleTopOffset(selector) {
        $(selector).each(function(){
            $(this).toggleClass('topOffset');
        });
    }


    // Register a keypress listener to show/hide the search bar.
    $(window).keypress(function(event) {
        if ((event.keyCode === 115) || (event.keyCode === 83)) { // key === 's' or 'S'

            $("#searchBar").slideToggle(400);//{duration:100, easing: "linear"}
            $(".container").each(function(){
                $(this).toggleClass('shrunken');
            });

            for (var x = 0; x < gridUnits; x++) {
                for (var y = 0; y < gridUnits; y++) {
                    var sizeSelector = '.pane' + (x+1) + 'x' + (y+1);
                    toggleTopOffset(sizeSelector);
                }
            }

            updateGridCSS();
        }
    });

    $(window).resize(updateGridCSS);


    updateGridCSS();

})();