$(document).ready(function(){
    // zoom
    var currentMousePos = { x: -1, y: -1 };

$('.main-img')
    .mouseover(function(){
        if($(this).find('.zoom').length == 0){
            $(this).append('<div class="zoom">'+ $(this).html() +'</div>');
        }

        $('.zoom').show();

        var resize = 150;
        var origH  = 640;
        var origW  = 937;
        var mouseX = event.x;
        var mouseY = event.y;
        var newH   = origH * (resize / 100);
        var newW   = origW * (resize / 100);

        $('.zoom img').width(newH + 'px');
        $('.zoom img').height(newW + 'px');
    })
    .mouseout(function(){
        $('.zoom').hide();
    })
    .mousemove(function(event) {
        var Xpos = event.offsetX;
        var Ypos = event.offsetY;
    
        $('.zoom img').css('top', '-' +Ypos+ 'px');
        $('.zoom img').css('left', '-' +Xpos+ 'px');
    });
    // 

    //foto change
    $('.img .thumbs li').click(function(){
        $('.img .thumbs li').removeClass('ativo');
        $(this).addClass('ativo');

        var thumbSrc = $(this).find('img').attr('src');
        $('.main-img > img').attr('src',thumbSrc);
        $('.main-img > .zoom').remove();
    });
    //


    //frete
    
    // 
});