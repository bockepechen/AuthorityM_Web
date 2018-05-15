<template>
  <div>
   <Card class="home-main">
      <div class="form-content">
           <Form  label-position="left" :label-width="100">
              <FormItem label="机构代码">
                  <Input></Input>
              </FormItem>
              <FormItem label="机构名称">
                  <Input></Input>
              </FormItem>
             
          </Form>
      </div>
      <div class="control">
          <Button >保存</Button>
          <Button>取消</Button>
      </div>
   </Card>
</div>
</template>
<script>
    export default{
      data(){
          return{
              list:['男','女']
          }
      }
    }
</script>
<style scoped>
.control{
    width: 120px;
    margin: 42px auto;
}
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}
.form-content{
      width: 50%;
    margin: 40px auto;
}
</style>

