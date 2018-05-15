<template>
    <div class="home-main center">
        <div v-if="organization">
            <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <img class="avator-img" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div class="organization">所属机构1</div>
                                        <div>
                                            <b class="card-user-infor-name">Admin</b>
                                            <p>super admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">北京</Col>
                            </Row>
                        </Card>
                    </Col>
        </div>
        <div v-if="!organization">
           <div v-for="(item,index) in list" :key="index" class="organization-choose">
               <div @click="chooseO(item)" class="organization-choose-item">
                   <div class="organization-choose-item-content">{{item}}</div>
              </div>
               
           </div>
        </div>
    </div>
</template>
<script>
  export default{
    name:'home',
    data(){
        return{
            organization:false,
            list:["所属机构1","所属机构2"]
        }
    },
    methods:{
        init(){
           
            let vm = this
            if(localStorage.getItem("organization")){
                vm.organization = true
            }
        },
        chooseO(item){
            localStorage.setItem("organization",item)
            this.organization = true
        }
    },
    mounted(){
        
        this.init()
    }
  }
  
</script>
<style <style scoped>
.m-l240{
    margin-left: 240px
}
.line-gray{
    height: 0;
    border-bottom: 2px solid #dcdcdc;
}

.via{
    width: 100px;
    margin: 0px auto;
}
img{
    width: 100%;
}
.center{
    margin: 0 auto;
}
li{
    list-style: none;
}
.card-user-infor-name{
    font-size: 2em;
    color: #2d8cf0;
}
.user-infor{
    height: 135px;
}
.made-child-con-middle{
    height: 100%;
}
.avator-img{
    display: block;
    width: 80%;
    max-width: 100px;
    height: auto;
}
.card-user-infor-name{
    font-size: 2em;
    color: #2d8cf0;
}
.margin-top-8{
    margin-top: 8px;
}
.notwrap{
    word-break:keep-all; 
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.padding-left-8{
    padding-left: 5px;
}
.organization{
    position:  absolute;left: 70%;top: 00px;
}
.organization-choose{
    text-align: center; background-color: #fff;
}
.organization-choose-item:hover{
    background-color: #2d8cf0;
    color:#fff
}
.organization-choose-item-content{
    padding-top: 20px;padding-bottom: 20px;
}
</style>

