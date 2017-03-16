console.log("NOTE THIS SITE IS NOT FINISHED IT IS OPEN FOR TESTING AND IS UNDERGOING DEVELOPMENT");

$(document).on("pageinit", function() {
  $('div.ui-loader').remove();
  var newArray = [];
  var app = new Vue({
    el: '#app',
    data: {
      counter: 0,
      message: 'hello world',
      imgSrc: 'default',
      title: 'hello'
    }
  })
  var screenSize = imageSize($(window).width())
  /*this function should return necessary image sizing based on viewport size */
  function imageSize(windowSize) {
    if (windowSize < 750) {
      console.log("phone");
      console.log(windowSize);
      return "medium_large";
    } else if (windowSize > 750 && windowSize < 1024) {
      console.log("tablet");
      console.log(windowSize);
      return "medium_large";
    } else {
      console.log("desktop time")
      return "large";
    }
  }


  // TODO: do i need this function
  function initialize() {
    $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed", function(data) {
      var newdata = JSON.stringify(data)
      sessionStorage.setItem('data', newdata)
      console.log(JSON.parse(sessionStorage.data))
      render();
    })
  }

  // NOTE: this function checks for storage and whether or not its up to date. If it is initialize will not occur
  // TODO: cleanup
  // TODO: when data is old and the dom is updated always render the latest image
  function checkStorage() {
    if (sessionStorage.data) {
      console.log('Data persists');
      $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed", function(data) {
        if (JSON.stringify(data) == sessionStorage.data) {
          console.log(data);
          console.log(JSON.parse(sessionStorage.data));
          console.log('data is up to date');
          render();
        } else {
          console.log('Looks like you have old data lets update');
          initialize();
        }
      })
    } else {
      console.log('Looks like you have no data');
      initialize();
    }

  }

  function loader() {
    var hello = setTimeout(showGallery, 2000)
  }

  function showGallery() {
    $('.container').fadeIn(2000);
    $('.loaderContainer').remove();
  }

  // NOTE: This function renders appropriate assets based on glass size the idea is that we don't load full sized images when we're on our phones
  function render() {
    $('#about').hide();

    var data = JSON.parse(sessionStorage.data)
    console.log(data[app.counter]);
    localStorage.setItem('test', data)
    app.imgSrc = data[app.counter]._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url;
    app.title = data[app.counter].title.rendered;
    var newdata = JSON.stringify(data)
    app.message = data[app.counter].content.rendered;
  }
  loader();
  checkStorage();

  // TODO: update to use sessionStorage that way there is only one initial payload from wp api
  // TODO: restructure function to rely on sessionStorage array
  function browse(viewPort) {
    console.log(viewPort);
    if (viewPort == 'large') {
      $('#prev').click(function() {
        if (app.counter != 0) {
          app.counter--;
          render()
        } else {
          console.log('at the beginning');
        }
      })
      $('#next').click(function() {
        if (app.counter < JSON.parse(sessionStorage.data).length - 1) {
          app.counter = app.counter + 1;
          console.log(app.counter);
          render();
        } else {
          console.log("Woah there cowboy theres no more images");
        }
      })
    } 
      $('#gallery').on("swipeleft", function() {
        if (app.counter != 0) {
          app.counter--;
          console.log('swiped');
          render()
        } else {
          console.log('at the beginning');
        }
      })
      $('#gallery').on("swiperight", function() {
        if (app.counter < JSON.parse(sessionStorage.data).length - 1) {
          app.counter = app.counter + 1;
          console.log(app.counter);
          render();
        } else {
          console.log("Woah there cowboy theres no more images");
        }
      })


  }
  browse(screenSize)
  // NOTE: cleanup
  function navigation() {

    $('#aboutButton').click(function() {
      $('#gallery').fadeOut(2000);
      $('#movement').fadeOut(2000);
      setTimeout(() => {
        $('#about').show()
        app.message = "<p>Trenton Lawton is a San Francisco based Designer,developer,and visual artist.Lo-fi fam salvia disrupt, typewriter fanny pack chia biodiesel twee artisan selvage edison bulb quinoa bushwick. Seitan beard paleo live-edge. Next level actually viral, tote bag pitchfork cray tousled DIY +1 lo-fi chartreuse neutra crucifix green juice narwhal. Fingerstache cronut keffiyeh beard whatever, dreamcatcher art party taxidermy meh organic. Sartorial sriracha literally unicorn. Etsy ramps green juice whatever, offal XOXO asymmetrical poke letterpress neutra four loko +1 glossier coloring book.Everyday carry swag iPhone affogato williamsburg celiac.</p><div class='logoContainer'><img src='assets/newlogo.png' class='logos'><img src='assets/skulllogo.png' class='logos'></div>"
      }, 2000);
    })
    $('#homeButton').click(function() {
      $('#about').fadeOut(2000);
      setTimeout(() => {
        checkStorage();
        render();
        $('#gallery').show()
        $('#movement').show();
      }, 2000);
    })
  }
  navigation(screenSize);
  console.log('hello');

  // TODO: Build out Design view




})
