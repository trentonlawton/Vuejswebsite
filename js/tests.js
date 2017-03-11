describe("For displaying index with photo card components",function(){
console.log($(window).width());

/*this function should return necessary image sizing based on viewport size */
function imageSize(windowSize){
  if(windowSize <750 ){
    console.log("phone");
    console.log(windowSize);
    return "medium_large";
  }
  else if(windowSize >750 &&  windowSize <1024 ){
    console.log("tablet");
    console.log(windowSize);
    return "medium_large";
  }
  else{
    console.log("desktop time")
    return "large";
    }
  }

/*this function should grab scaled data based on current viewport */
function getData(screenSize){
    $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
      $.each(data,function(i){
        console.log('Post data:');
        console.log(data[i].title.rendered);
          console.log(data[i].content.rendered);
              console.log(data[i].date);
                  console.log(screenSize)
        console.log('Image url:');
        console.log(data[i]._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url);
        console.log('********');
        $('body').append("<div class='unisPhotoCard'>"+"<img src="+data[i]._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url+" alt="+data[i].title.rendered+">"+"<br />"+
        "<h1>"+data[i].title.rendered+"</h1>"+data[i].content.rendered+
        "<p>"+data[i].date+"</p>"+"</div>"
      )
      })
    })
}

getData(imageSize($(window).width()))
/* Simple request to get (all) post data */
  describe("For grabbing all wp post data",function(){
    it("should return jason data for each post",function(){
      $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
        $.each(data,function(i){
          console.log(data[i]);
        })
      })
      expect("foo").toEqual("bar");
    })
    it("should return scaled assets for phone viewport",function(){




      expect("medium_large").toEqual(imageSize($(window).width()));
    })
    it("should return scaled assets for tablet viewport",function(){

      // $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
      //   $.each(data,function(i){
      //     console.log(data[i]);
      //   })
      // })
      expect("medium_large").toEqual(imageSize($(window).width()));
    })
    it("should return scaled assets for desktop viewport",function(){
      // $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
      //   $.each(data,function(i){
      //     console.log(data[i]);
      //   })
      // })
        expect("large").toEqual(imageSize($(window).width()));
    })
  })

  /* Now we have to grab the first x and lazy load into an infinite scroll
  /* Simple request to get (all) post data */
    describe("For grabbing first x wp post data and lazy loading x amount with infite scroll",function(){
      it("should return initial x jason data for each post",function(){
        $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
          // $.each(data,function(i){
          //   console.log(data[i]);
          // })
        })
        expect("foo").toEqual("bar");
      })
      it("should return x number of post data when the user hits height cap",function(){
        $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
          // $.each(data,function(i){
          //   console.log(data[i]);
          // })
        })
        expect("foo").toEqual("bar");
      })
    })

    describe("For tossing wp post data into photocard components",function(){
      it("should have wp posts data from api",function(){

        expect('foo').toEqual('bar')
      })
      it("should take that json response and for each post render a new photo card component to the dom",function(){

        expect('foo').toEqual('bar')
      })


    })


})
