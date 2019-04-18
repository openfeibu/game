
// //微信注入
// function fb_config(){
//    $.getJSON(locahost +'wechat/getConfig',{"url":location.href},function(data) {
//         if(data.code == 200){
//           wx.config({
//           debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//           appId: data.data.appId, // 必填，公众号的唯一标识
//           timestamp:data.data.timestamp , // 必填，生成签名的时间戳
//           nonceStr:data.data.nonceStr, // 必填，生成签名的随机串
//           signature: data.data.signature,// 必填，签名，见附录1
//           jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline","openAddress","scanQRCode"],// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//           // url:decodeURIComponent(data.data.url)
//         });
//       }
//     })
// }
// $(function(){
//   try {
//     if (wx && is_weixn()) {
//        fb_config();
//       }
//     } catch (e) {
       
//     }
// })
// //微信注入
$(function(){
  var w = $(window).width();
  var isAndroid = /(Android)/i.test(navigator.userAgent);
  var canvas = document.querySelector('canvas'),
      context = canvas.getContext('2d'),
      imageObj = new Image(),
      imgObj=[];
  var nw,nh;
      resizeFun()
      function resizeFun(){
              var h = $(window).height();
              var w = $(window).width();
             
              //视频尺寸16：9
              var vw = 16*h/9;
              var vh = 9*w/16;
              if(w > vw){
                $("#canvas").css({
                  height: h,
                  width: vw,
                  "margin-top": -h / 2,
                  top: "50%",
                  left:"50%",
                  "margin-left": -vw/2
                });
                $("#byl_video").css({
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
                $("#canvas").css({
                  height: vh,
                  width: w,
                  "margin-top":-vh/2,
                  top: "50%",
                  left:"50%",
                  "margin-left": -w/2
                });
                $("#byl_video").css({
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
    loader.addCompletionListener(function () {
      console.log(123)
        var flag = false;
        var imageNumber = 0;
        var speed = 1000;
        var timer = null;
        var videoElem = document.getElementById('byl_video');
        var buffered = 0;
        // runFun();
        // context.drawImage(imgObj[0],0,0,1920,1080);
        
        videoElem.addEventListener('canplaythrough',function(){
          //  context.drawImage(imgObj[1],1246,826,613,192);
            $(".video_welcome").on("click",function(){
              $("#video_box").css("opacity","1");
              $("#byl_video")[0].play(); 
              $(".video_welcome").hide();
            })
            videoElem.removeEventListener("canplaythrough");
        });
        // if(isAndroid){
        //   videoElem.addEventListener('canplaythrough',function(){
        //       clearInterval(timer)
        //       speed = 200;
        //       runFun();
        //       videoElem.removeEventListener("canplaythrough");
        //   });
        // }else{
        //   var n = 0;
        //   var t = setInterval(function(){
        //       n++;
        //       if(n == 8){
        //         clearInterval(timer)
        //         clearInterval(t)
        //         speed = 200;
        //         runFun();
        //       }
        //   },500)
        // }
        function runFun(){
            timer = setInterval(function () {
                context.drawImage(imgObj[imageNumber],0,0,1920,1080);
                context.drawImage(imgObj[imageNumber],0,0,809,312);
                imageNumber++;
                if (imageNumber === fileList.length) {
                    imageNumber = fileList.length-2;
                    if(!flag){
                      $(".video_welcome").on("click",function(){
                        $("#video_welcome").css("opacity","1");
                        $("#byl_video")[0].play(); 
                        $(".video_welcome").hide();
                        clearInterval(timer);
                      })
                      flag == true;
                    }
                } 
            }, speed);
        }
      videoElem.addEventListener('ended',function () {
        $(".question").show();
        $(".question-bg-b,.question-home,.question-reset").addClass("gcenterIn")
        $(".question-item").addClass("grightIn")
      });
    });
    $(".question-item").on("click",function(){
      resultAnimate();
    })
    function resultAnimate(){
      $(".question-result").show().addClass("gdownIn")
      setTimeout(function(){
        $(".question-result").addClass("gUpOut");
        setTimeout(function(){
          $(".question-result").hide().removeClass("gdownIn gUpOut")
        },1000)
      },1000)
    }
    $(".question-reset").on("click",function(){
      $(".question").hide();
      $(".question-bg-b,.question-home,.question-reset").removeClass("gcenterIn")
      $(".question-item").removeClass("grightIn")
      $('#byl_video')[0].currentTime=0;
      $("#byl_video")[0].play();
    })
    $(".question-home").on("click",function(){
      $(".question").hide();
      $(".question-bg-b,.question-home,.question-reset").removeClass("gcenterIn")
      $(".question-item").removeClass("grightIn")
      $('#byl_video')[0].currentTime=0;
      $("#video_box").css("opacity","0");
      $(".video_welcome").show();
    })
})


