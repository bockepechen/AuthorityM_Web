<template>
<div class="home-main content">
     <Form ref="formCustom"  :label-width="80" class="m20">
        <FormItem label="用户编号" prop="passwd">
            <Input type="password" ></Input>
        </FormItem>
        <FormItem label="用户名" prop="passwdCheck">
            <Input type="password"></Input>
        </FormItem>
        <FormItem label="所属分公司" prop="age">
            <Input type="text"></Input>
        </FormItem>
        <FormItem label="用户头像" prop="age">
           <div class="form-img">
               <img src="static/timg.jpg" alt="">
            </div> 
        </FormItem>
        <FormItem label="修改密码" prop="age">
            <Button type="ghost" @click="modal1 = true">修改密码</Button>
        </FormItem>
        <FormItem>
            <Button type="primary">取消</Button>
            <Button type="ghost"  style="margin-left: 8px">保存</Button>
        </FormItem>
    </Form>
    <Modal
        v-model="modal1"
        title="修改密码"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formCustom"  :label-width="80" class="m20">
            <FormItem label="原密码" prop="passwd">
                <Input type="password" ></Input>
            </FormItem>
            <FormItem label="新密码" prop="passwdCheck">
                <Input type="password"></Input>
            </FormItem>
            <FormItem label="确认密码" prop="age">
                <Input type="password"></Input>
            </FormItem>
           
            <FormItem>
                <Button  @click="ok" type="primary">取消</Button>
                <Button   @click="cancel" type="ghost"  style="margin-left: 8px">保存</Button>
            </FormItem>
        </Form>
    </Modal>
</div>
</template>
<script>
    export default{
        data(){
            return{
                
                modal1: false
            
            }
        },
        methods:{
            ok () {
                this.modal1 = false;
            },
            cancel () {
                this.modal1 = false;
            }
        }
      
    }
</script>
<style scoped>
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}
.m20{
    margin: 20px 20px 20px 20px;
}
img{
    width: 100%
}
.form-img{
    width:100px
}
</style>

