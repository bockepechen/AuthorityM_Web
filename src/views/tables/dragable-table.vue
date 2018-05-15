<template>
  <div>
      <table ref="dragable">
        <thead>
          <tr>
            <th v-for="(item,index) in columnsList" :key="index">{{item}}</th>
            
          </tr>
        </thead>
        <tbody ref="tab">
          <tr v-for="(item,index) in tableData" :key="index" >
            <td>{{item.title}}</td>
            <td>{{item.todoItem}}</td>
            <td>{{item.remarks}}</td>
            <td>{{item.move}}</td>
          </tr>
        </tbody>
      </table>
      <input id="file" type="file" >
      
      <div id="fileList"></div>
      <div @click="doupload()">玩呢</div>
      <img src="" alt="" id="preViewImg">
  </div>
  
</template>
<script>
  import Sortable from 'sortablejs';

  export default{
    name:'dragable-table',
    data(){
      return{
       
        columnsList: ['序号','待办事项','备注','拖拽'],
        tableData: [
                {   
                    title:0,
                    todoItem: '明天去后海玩',
                    remarks: '估计得加班',
                    move:'闹'
                },
                {
                     title:1,
                    todoItem: '后天去和妹子看电影',
                    remarks: '可能没妹子',
                    move:'闹'
                },
                {
                     title:2,
                    todoItem: '大后天去吃海天盛筵',
                    remarks: '没钱就不去了',
                    move:'闹'
                },
                {
                     title:3,
                    todoItem: '周末去看电影',
                    remarks: '估计得加班',
                    move:'闹'
                },
                {
                     title:4,
                    todoItem: '下个月准备回家看父母',
                    remarks: '估计得加班',
                    move:'闹'
                },
                {
                     title:5,
                    todoItem: '该买回家的票了',
                    remarks: '可能没票了',
                    move:'闹'
                },
                {
                     title:6,
                    todoItem: '过年不回家和父母视频聊天',
                    remarks: '一定要记得',
                    move:'闹'
                },
                {
                     title:7,
                    todoItem: '去车站接父母一起在北京过年',
                    remarks: 'love',
                    move:'闹'
                }
               ] 
      }
    },
    methods:{
      init(){
        var el = this.$refs.tab
        
        let vm = this;
        Sortable.create(el,{
          onStart:vm.startFunc,
          onEnd:vm.endFunc,
          onChoose:vm.endFunc
      })
        

      },
      startFunc(e){
       
      },
      endFunc(e){
        let vm = this;
       
      
      },
      chooseFunc(e){
         
      },
      upload(){
        document.getElementById("file").addEventListener("change", function(e){
          
            var d = document.getElementById("fileList");
            //加载出正常的图片
            var img = document.createElement("img");
            img.id="aa";
            img.src = window.URL.createObjectURL(e.target.files[0]);
            img.height = 60;
            img.onload = function() {
              window.URL.revokeObjectURL(this.src);
            }
            d.appendChild(img);
            //加载出canva压缩后的图片
            
        });
      },
      doupload(){
        var c=document.createElement("canvas");
        let img = document.getElementById("aa");
        c.width=img.width;c.height=img.height;
        c.getContext("2d").drawImage(img, 0, 0,img.width,img.height);
        var image = new Image();
        image.crossOrigin = "*";
        image.setAttribute('crossOrigin', 'anonymous');
        image = c.toDataURL("image/png");
        console.log(image)
        document.getElementById("preViewImg").src=image; 
        image=image.split(',')[1];
        image=window.atob(image);
        var ia = new Uint8Array(image.length);
        for (var i = 0; i < image.length; i++) {
        ia[i] = image.charCodeAt(i);
              }
          var name=new Blob([ia], {type:"image/png"});
        console.log(name)
        /* 
        压缩
        // 图片原始尺寸
        var originWidth = img.width;
        var originHeight = img.height;
        // 最大尺寸限制
        var maxWidth = 400, maxHeight = 400;
        // 目标尺寸
        var targetWidth = originWidth, targetHeight = originHeight;
        // 图片尺寸超过400x400的限制
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
                // 更宽，按照宽度限定尺寸
                targetWidth = maxWidth;
                targetHeight = Math.round(maxWidth * (originHeight / originWidth));
            } else {
                targetHeight = maxHeight;
                targetWidth = Math.round(maxHeight * (originWidth / originHeight));
            }
        }
            
        // canvas对图片进行缩放
        c.width = targetWidth;
        c.height = targetHeight;
        var context = canvas.getContext('2d');
        // 清除画布
       context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
         */
          

      }

    },
    mounted(){
      this.init();
      this.upload()
    }

  }
</script>
