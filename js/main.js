// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
   
  // Create a function called `searchImages()` to take user's search terms and send to Flickr for response.
  
    var searchImages = function(tags) {
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      console.log(tags);
      $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
    $.getJSON(flickrAPI, {
      tags: tags,
      tagmode: "any",
      format: "json"
       }).done(function(data) {
          $("#images").empty();
          $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
          $.each(data.items, function(i, item) {
            var newListItem = $('<li>');
            var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
            var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
            var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
            var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);
            
            var newButton = $("<button class='btn btn-sm btn-primary'>enlarge</button>").attr({
            'data-title': item.title,
            'data-toggle': "modal",
            'data-target': "#infoModal",
            'data-imgsrc': item.media.m,
            'data-description': item.description,
            'type': "button"
            }).appendTo(newListItem);
            
            newListItem.appendTo('#images');
            if ( i === 15 ) {
            return false;
           }
      });
    });
  };

    // Attach an event to the search button (`button.search`) to execute search when clicked.
  
  $('button.search').on('click', function(event){
      event.preventDefault();
      var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
      console.log(searchTextInput);
      searchImages(searchTextInput.value);
  });
  
  // Modal button click enlarges view of image and details.
  
 $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    var title = button.data('title'); 
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');

    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });

});
