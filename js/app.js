  var newArray= [];
var app = new Vue({
el:'#app',
data:{
  counter:0,
  message:'hello world',
  imgSrc:'default',
  title:'hello'
}
})

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
  function getData(){
    var screenSize = imageSize($(window).width());
      $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
console.log(data[app.counter]);
localStorage.setItem('test',data)
app.imgSrc = data[app.counter]._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url;
app.title = data[app.counter].title.rendered;
  app.message =data[app.counter].content.rendered;
      })

  }
  getData()

  function browse(){
  $('#prev').click(function(){
    if(app.counter != 0){
      app.counter--;
      getData()
    }
    else{
      console.log('at the beginning');
    }
  })
  $('#next').click(function(){
    app.counter++;
    getData();
  })
  }


    browse()

    console.log('hello');
