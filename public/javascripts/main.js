//data

$('.icon').on('click', function(){
  var name= $(this).data('name');
  var id = $(this).data('id')
  var img = $(this).data('img')
  var icon= $(this);
  $(this).toggleClass('faved');

  $.ajax({
    url: '/favs',
    type: 'post',
    data: {info: JSON.stringify({'liked':img})},

    
    success: function(){
      if(icon.hasClass('faved')){
        console.log(name);
        console.log(id);
        console.log(img)
      }else{
        console.log('error');
      }
    },

    error: function(response){
      console.log('Select dog, please')
    }
  })
})
