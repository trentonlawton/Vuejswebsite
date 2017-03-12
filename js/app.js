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


  // TODO: onload needs to grab json file and save it to session sessionStorage
  // TODO: if the page alsready has data in sesssion storage check that its upto date
  // TODO: if not then it should make another json request
  /*this function should grab scaled data based on current viewport */
function loader(){
  var hello = setTimeout(showGallery,2000)
}

function showGallery(){
  $('.container').show();
  $('.loader').remove();
}

  function getData(){

    var screenSize = imageSize($(window).width());
      $.getJSON("http://www.usernameisnull.com/data/wp-json/wp/v2/posts/?_embed",function(data){
console.log(data[app.counter]);
localStorage.setItem('test',data)
app.imgSrc = data[app.counter]._embedded['wp:featuredmedia'][0].media_details.sizes[screenSize].source_url;
app.title = data[app.counter].title.rendered;


  var newdata = JSON.stringify(data)
  app.message =data[app.counter].content.rendered;
  sessionStorage.setItem('data',newdata)
      console.log(JSON.parse(sessionStorage.data))
      })

  }
  loader();
  getData()

// TODO: update to use sessionStorage that way there is only one initial payload from wp api
// TODO: restructure function to rely on sessionStorage array
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
    if(app.counter)
    app.counter++;
    getData();
  })
  }


    browse()

    console.log('hello');
