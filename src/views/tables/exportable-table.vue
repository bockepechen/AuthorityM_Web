<template>
<div>
  <Table border :columns="columns7" :data="data6"  ref="tableExcel"></Table>
  <Button type="primary" size="large" @click="exportExcel">下载表格数据</Button>
  <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
</div>
  
</template>
<script>
import table2excel from '@/libs/table2excel.js';
  export default{
    name:'exportable-table',
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
      },
      exportExcel () {
            table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', "thisexcelFileName");
        }

    },

  }
</script>
