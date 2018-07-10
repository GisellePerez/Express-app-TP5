var fav= [];

$('.icon').on('click', function(){
    let breed = $(this).data('id');
    console.log(breed);
    let fav = $(this)
    console.log(fav);
    fav.toggleClass('faved')

    $.ajax ({
        url:'/fav',
        type: 'post',
        data: {
            info: JSON.stringify({'marked':breed})
        },

        success: function() {
            if (fav.hasClass('faved')) {
                console.log(breed);
            }else{
                console.log('error');
            }
        },

        error: function(){
            console.log('Please try with another doggie');
        }
    })
})