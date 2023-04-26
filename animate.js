$(document).ready(function() {
    // Ocultar el body al principio
    $("body").css("display", "none");

    // Mostrar el body con un efecto fadeout
    $("body").fadeIn(2000);

    // Esperar 2 segundos y hacer un efecto fadeout
    $("body").delay(2000).fadeOut(2000);

    $("img").animate({
        rotate: "+=360deg"
    }, 2000, "linear", function() {
        $(this).css("rotate", "0deg");
    });
});
