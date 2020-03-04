$(document).ready(function(){
    let jsonLink = 'bangdan.json';
   $(function(){
    $.getJSON(jsonLink, function(data){     //解析json数据，这里用的是jq的方法，原生比较复杂
        let arr = 5;            //首先加载5个item
        for(let i=0;i<5;i++){
            $("#items").append("<div class='item' id='item"+i+"'><span class='rank'>"+data['num'][i]+"</span><div class='item_main'><h5 class='title'>"+data['title'][i]+"</h5><div class='up'><i class='fa fa-user' aria-hidden='true'>&nbsp;</i><span class='upName'>"+data['up_name'][i]+"</span></div><h5 class='score'>"+data['grade'][i]+"</h5></div></div>");
            $(".item").fadeIn(1000);
        }
     })
   })
  // debugger;
   

  //  debugger;
  /*新版本的infinitescroll可能有所变化 */
   $('#items').infinitescroll({     
        navSelector: "#next",      //页面分页元素(成功后会被隐藏)
        nextSelector: "a#next",
        itemSelector: ".item",      //ajax回来之后，每一项的selecter
        animate      : true,      //加载完毕是否采用动态效果
        extraScrollPx: 100,       //向下滚动的像素，必须开启动态效果
        debug: true,                //调试
        dataType: 'json',
        maxPage: 2,             //最大显示页数
        appendCallback:false,
        loading: {
        finishedMsg: '我是有底线的~', //当加载失败，或者加载不出内容之后的提示语
        img:  './images/loading.gif',   //自定义loadding的动画图
        msgText : '正在加载中...',    //加载时的提示语
    },
        path: function() {
             return jsonLink;       //json数据的路径，路径可以多个，可给定index
      }
}, function(data) {
    let arr = data.num;
    //console.log(arr.length);
    for(let i=5;i<arr.length;i++){  //动态创建每一个div.item
        console.log(i);
        $("<div class='item' id='item"+i+"'><span class='rank'>"+data['num'][i]+"</span><div class='item_main'><h5 class='title'>"+data['title'][i]+"</h5><div class='up'><i class='fa fa-user' aria-hidden='true'>&nbsp;</i><span class='upName'>"+data['up_name'][i]+"</span></div><h5 class='score'>"+data['grade'][i]+"</h5></div></div>").appendTo("#items");
    }
    
});

//弹框
/*此处不能直接click(function(){}),因为在$(document).ready()页面加载时遍历所有元素，而下面的item是后面创建的，选择器会找不到对象*/
$("#items").on('click','.item',function(){
    let itemId = this.id;           //取出当前点击item的id
    let index = itemId.substr(4);   //取出id里面的数字
   // console.log(index);
    //console.log(itemId);
    $.getJSON(jsonLink,function(data){  //创建图片对象
        $("<a href='"+data['src_content'][index]+"' class='detail'><img src='"+data['src_image'][index]+"' alt='图片裂了' class='img-thumbnail'></a>").appendTo('.modal-body');
    })
    $("#detailWindow").modal('toggle'); //模态框弹出

    $("#btn-back").click(function(){
        $('.modal-body').empty();       //销毁modal-body的字节点
    })
})

$(function(){
    $('#infoWindow').modal('toggle');       //页面加载后的提示
})

})