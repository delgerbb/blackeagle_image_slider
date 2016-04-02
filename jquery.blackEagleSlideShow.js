/*
 jQuery BalckEagle Slideshow Plugin
 date: 02/04/2016
 developer: Delgerbayar.D
 github: https://github.com/delgerbb/blackeagle_image_slider
 */

(function ($) {
    $.blackEagleSlideShow = function (selector, settings) {
        // settings
        var config = {
            'delay': 3000,
            'fadeSpeed': 500,
            'showCaption': true,
            'imageMaxWith': 'auto',
            'imageMaxHeight': 'auto',
            'showNavigation': true
        };
        if (settings) {
            $.extend(config, settings);
        }

        // variables
        var $thisObj = $(selector);
        var slideImages = $thisObj.children('img');
        var slideImagesCount = slideImages.length;
        var activeImgIndex = 0;
        var $leftButton = null;
        var $rightButton = null;
        var activeImgTitle = "";
        var $captionBox = null;

        $thisObj.init = function () {
            config.imageMaxWith = $thisObj.width() + "px";
            config.imageMaxHeight = $thisObj.height() + "px";
            $.each(slideImages, function (index, value) {
                slideImages.eq(index)
                        .addClass('img-responsive')
                        .css({'width': config.imageMaxWith, 'height': config.imageMaxHeight});
            });

            $leftButton = $("<span>")
                    .addClass("blackeagle-btn-show-left-image")
                    .css({"left": "0px", "top": "50%"})
                    .html("<span class='glyphicon glyphicon-chevron-left'></span>");

            $rightButton = $("<span>")
                    .addClass("blackeagle-btn-show-right-image")
                    .css({"right": "0px", "top": "50%"})
                    .html("<span class='glyphicon glyphicon-chevron-right'></span>");

            $thisObj.prepend($leftButton);
            $thisObj.prepend($rightButton);

            $captionBox = $("<div>").addClass("blackeagle-image-caption");
            $captionBox.attr("id", "blackeagleImageCaptionID");
            $thisObj.append($captionBox);

            // show first image
            slideImages.eq(activeImgIndex).show();
        };


        $thisObj.isEmpty = function (str) {
            return typeof str == 'string' && !str.trim() || typeof str == 'undefined' || str === null;
        };
        $thisObj.showImageCaption = function (captionText) {
            if (!$thisObj.isEmpty(captionText)) {
                $("#blackeagleImageCaptionID").css({"display": "inline"});
                $("#blackeagleImageCaptionID").html(captionText);
            } else {
                $("#blackeagleImageCaptionID").css({"display": "none"});
            }
        };

        $thisObj.moveSlideImages = function () {
            slideImages.eq(activeImgIndex).fadeOut(config.fadeSpeed);
            activeImgIndex = (activeImgIndex + 1 === slideImagesCount) ? 0 : activeImgIndex + 1;
            slideImages.eq(activeImgIndex).fadeIn(config.fadeSpeed);

            if (config.showCaption) {
                var activeImgTitle = slideImages.eq(activeImgIndex).attr('title');
                $thisObj.showImageCaption(activeImgTitle);
            }
            $("#imageCurrentIndex").html(activeImgIndex + " - " + activeImgTitle);
        };

        $thisObj.init();

        var mainThreadID = setInterval($thisObj.moveSlideImages, config.delay);

        $rightButton.on("click", function () {
            slideImages.eq(activeImgIndex).fadeOut(config.fadeSpeed);
            activeImgIndex = (activeImgIndex + 1 === slideImagesCount) ? 0 : activeImgIndex + 1;
            slideImages.eq(activeImgIndex).fadeIn(config.fadeSpeed);
            if (config.showCaption) {
                var activeImgTitle = slideImages.eq(activeImgIndex).attr('title');
                $thisObj.showImageCaption(activeImgTitle);
            }
        });
        $leftButton.on("click", function () {
            slideImages.eq(activeImgIndex).fadeOut(config.fadeSpeed);
            activeImgIndex = (activeImgIndex - 1 < 0) ? (slideImagesCount - 1) : activeImgIndex - 1;
            slideImages.eq(activeImgIndex).fadeIn(config.fadeSpeed);
            if (config.showCaption) {
                var activeImgTitle = slideImages.eq(activeImgIndex).attr('title');
                $thisObj.showImageCaption(activeImgTitle);
            }
        });


        return this;
    };
})(jQuery);