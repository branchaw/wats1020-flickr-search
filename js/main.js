// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
   
  // Create a function called `searchImages()` to take user's search terms and send to Flickr for response.
  
      // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.
  
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
            newListItem.appendTo('#images');
            if ( i === 15 ) {
            return false;
           }
      });
    });
  };


    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.
  
  
  $('button.search').on('click', function(event){
      event.preventDefault();
      var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
      console.log(searchTextInput);
      searchImages(searchTextInput.value);
  });
  

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



});
