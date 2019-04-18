
$(function(){
  var w = $(window).width();
  var isAndroid = /(Android)/i.test(navigator.userAgent);

  var   imageObj = new Image()
  var   imgObj=[];
  var nw,nh;
      resizeFun()
      function resizeFun(){
              var h = $(window).height();
              var w = $(window).width();
             
              //视频尺寸16：9
              var vw = 16*h/9;
              var vh = 9*w/16;
              if(w > vw){
                $("#canvas,#main,.video").css({
                  height: h,
                  width: vw,
                  "margin-top": -h / 2,
                  top: "50%",
                  left:"50%",
                  "margin-left": -vw/2
                });
        
                nw = vw;
                nh=h;
              }else{
                $("#canvas,#main,.video").css({
                  height: vh,
                  width: w,
                  "margin-top":-vh/2,
                  top: "50%",
                  left:"50%",
                  "margin-left": -w/2
                });
              
                nw = w;
                nh=vh;
              }
      }

  $(window).resize(function(){
    resizeFun()
  })
  var fileList = [
    "images/weBg.jpg",
    "images/startBtn.png",
    
  ];
  // 加载帧图资源
    loader = new PxLoader();
    for (var i = 0; i < fileList.length; i++) {
        imgObj[i] = loader.addImage(fileList[i]);
    }

    loader.start();
    // 加载完成


})


$(function(){
  $(".btn").on("mousedown",function(){
    var that = this;
    
    $(this).addClass("active");
    // playSound();
    setTimeout(function(){
      $(that).removeClass("active");
 
    },200)

  })
  $(".abtn,.bbtn").on("mousedown",function(){
    var that = this;
    
    $(this).addClass("active");
    // playSound();
    setTimeout(function(){
      $(that).removeClass("active");
 
    },200)

  })

})

//提示框
function fbAlert(text,time){
  var time = time
  if(!time){
    time = 1000
  }
  $(".alertText").remove();
  $("#main").append(`<div class="alertText">
  <p>`+text+`</p>
</div>`);
  $(".alertText").fadeIn(200);
  setTimeout(function(){
    $(".alertText").fadeOut(200);

  },time)
}


function playSound()
    {
      var borswer = window.navigator.userAgent.toLowerCase();
      if ( borswer.indexOf( "ie" ) >= 0 )
      {
        //IE内核浏览器
        var strEmbed = '<embed name="embedPlay" src="button.mp3" autostart="true" hidden="true" loop="false"></embed>';
        if ( $( "body" ).find( "embed" ).length <= 0 )
          $( "body" ).append( strEmbed );
        var embed = document.embedPlay;

        //浏览器不支持 audion，则使用 embed 播放
        embed.volume = 100;
        //embed.play();这个不需要
      } else
      {
        //非IE内核浏览器
        var strAudio = "<audio id='audioPlay' src='button.mp3' hidden='true'>";
        if ( $( "body" ).find( "audio" ).length <= 0 )
          $( "body" ).append( strAudio );
          
          var audio = document.getElementById( "audioPlay" );
          audio.pause()
        //浏览器支持 audion
        audio.play();
      }
    }
document.oncontextmenu = function(){
  return false;
} 

