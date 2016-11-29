
var noImage;
$(document).ready(function(){
    $(".submission").click(function(){
        $("#myCarousel").hide();
        $(".images").hide();
        
    });
});
function search() {
    var input = $('#Search_result').val();
    input != '' ?
    $.ajax({
        url: 'http://www.omdbapi.com/?s='+input,
        dataType: 'json',
        cache: false,
        success: function(data){
            if(data.Error){
                $('.error').each( function() {
               alert("Oops... Movie not found");
         });
            }

            $.each(data.Search, function(key, value){
                if(value.Poster == 'N/A') { noImage = "Image Not Found"; }
                var tabs = $('.result');
                data.Search.sort(function(obj1, obj2){
                    return obj2.Year-obj1.Year;
                });
                var resultTabs = {
                    dataSource: data.Search,
                    pageSize:6,
                    callback: function (response, pagination) {
                        var final = '';
                        $.each(response, function (index, value) {
                                 final += '<div class="well resulttab">' +
                                                    '<div class="row">' +
                                                        '<div class="col-md-6">' +
                                                            '<img class="thumbnail" src='+value.Poster+' alt="'+noImage+'"/>' +
                                                        '</div>' +
                                                        '<div class="col-md-6">' +
                                                            '<h4>'+value.Title+'</h4>' +
                                                            '<ul class="list-group">' +
                                                                '<li class="list-group-item">Year Released: '+value.Year+'</li>' +
                                                                '<li class="list-group-item">IMDB ID: '+value.imdbID+'</li>' +
                                                            '</ul>' +
                                                            '<a class="btn btn-primary" href=http://www.imdb.com/title/'+value.imdbID+'> IMDB Info</a>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>';
                        });
                        tabs.prev().html(final);
                    }
                };
                tabs.pagination(resultTabs);
            });
        }.bind(this),
        error: function(err){
            console.log(err);
        }.bind(this)
    }) : $('.error').html('<div class="alert alert-danger">' +
                                        'Please Enter A Movie Name We got Plenty of your Favourites to Watch' +
                                    '</div>');
}