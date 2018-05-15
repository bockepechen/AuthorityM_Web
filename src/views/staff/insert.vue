<template>
  <div class="home-main content">
      <div class="">
          <table cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
              <tr>
                  <th colspan="4"><div>增加人员信息</div></th>
              </tr>
              <tr>
                  <td><div>人员代码</div></td>
                  <td><div><Input></Input></div></td>
                  <td><div>人员姓名</div></td>
                  <td><div><Input></Input></div></td>
              </tr>
               <tr>
                  <td><div>性别</div></td>
                  <td><div>
                      <Select   value="男">
                            <Option v-for="item in list" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </div>
                </td>
                  <td><div>出生日期</div></td>
                  <td><div><Input type="date"></Input></div></td>
              </tr>
               <tr>
                  <td><div>证件类型</div></td>
                  <td><div><Input></Input></div></td>
                  <td><div>证件号码</div></td>
                  <td><div><Input></Input></div></td>
              </tr>
               <tr>
                  <td><div>入职日期</div></td>
                  <td><div><Input type="date"></Input></div></td>
                  <td><div>离职日期</div></td>
                  <td><div><Input type="date"></Input></div></td>
              </tr>
               <tr>
                  <td><div>人员状态</div></td>
                  <td><div><Input></Input></div></td>
                  <td><div>邮箱</div></td>
                  <td><div><Input type="email"></Input></div></td>
              </tr>
               <tr>
                  <td><div>办公电话</div></td>
                  <td><div><Input></Input></div></td>
                  <td><div>手机号码</div></td>
                  <td><div><Input></Input></div></td>
              </tr>
               <tr>
                  <td><div>家庭住址</div></td>
                  <td colspan="3"><div><Input></Input></div></td>
                  
              </tr>
               <tr>
                  <td><div>公司名称</div></td>
                  <td colspan="3"><div><Input></Input></div></td>
                 
              </tr>
               <tr>
                  <td><div>备注说明</div></td>
                  <td colspan="3"><div><Input></Input></div></td>
                 
              </tr>
               <tr>
                  <td><div> <Checkbox label="twitter"></Checkbox>操作员信息</div></td>
                  <td colspan="3"><div><Input></Input></div></td>
                  
              </tr>
               <tr>
                  <td><div>用户登陆名</div></td>
                  <td><div><Input></Input></div></td>
                  <td><div>密码</div></td>
                  <td><div><Input type="password"></Input></div></td>
              </tr>
               <tr>
                  <td><div>操作员状态</div></td>
                  <td colspan="3"><div><Input></Input></div></td>
                 
              </tr>
          </table>
      </div>
      <div class="control">
          <Button >保存</Button>
          <Button>取消</Button>
      </div>
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
</style>

