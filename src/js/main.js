//var $ = require("jquery");

$(document).ready(function(){
    function myMenu() {
        var trigger = $('.toggled'),
            menu = $('.menu_toggle');

        trigger.click(function () {
            $(this).next(menu).slideToggle();
        });

        $(window).resize(function(){
            if ($(window).width() >= 768){
                menu.removeAttr('style');
            }
        });
    }
    myMenu();
});
