<template>
<div>
  <Table border :columns="columns7" :data="data6"></Table>
   <div style="margin-top:100px;">
      <table ref="dragable" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
        <thead>
          <tr>
            <th v-for="(item,index) in columnsList" :key="index" v-bind:class="{xx:index==0}" ><div ><span>{{item}}</span></div></th>
            
          </tr>
        </thead>
        <tbody ref="tab">
          <tr v-for="(item,index) in tableData" :key="index" >
            <td class="xx"><div><span>{{item.title}}</span></div></td>
             <td ><div ><span>{{item.todoItem}}</span></div></td> 
             <td ><div ><span>{{item.remarks}}</span></div></td> 
             <td><div><span>{{item.move}}</span><Button >不能用</Button></div></td>
          </tr>
        </tbody>
      </table>
  </div>
</div>
  
</template>
<script>
  export default{
    name:'editable-table',
    data(){
      return{
        columns7: [
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '弹出'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
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
      show (index) {
                console.log(index)
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index.index].name}<br>Age：${this.data6[index.index].age}<br>Address：${this.data6[index.index].address}`
                })
            },
      remove (index) {
          this.data6.splice(index, 1);
      }

    },

  }
</script>
<style scoped>

</style>

