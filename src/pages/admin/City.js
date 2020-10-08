import React, { Component } from 'react';
import { Table, Button,Select ,Modal,Input} from 'antd';

import axios from '../../utils/Axios.js'


import { PlusOutlined } from '@ant-design/icons';

import '../../css/city.css'
const { Option } = Select;
class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add:{},
            visible: false,
            columns: [
                {
                    title: '城市ID',
                    dataIndex: 'id',
                    sorter: {
                        compare: (a, b) => a.id - b.id,
                        multiple: 3,
                    },
                    width:100
                },
                {
                    title: '城市名称',
                    dataIndex: 'name',
                },
                {
                    title: '用车模式',
                    dataIndex: 'pattern',
                },
                {
                    title: '营运模式',
                    dataIndex: 'service',
                },
                {
                    title: '授权加盟商',
                    dataIndex: 'franchisee_name',
                },
                {
                    title: '城市管理员',
                    dataIndex: "city_admins"
                },
                {
                    title: '城市开通时间',
                    dataIndex: 'open_time',
                      sorter: {
                        
                        compare: (a, b) => { 
                            // a.open_time=new Date(a.open_time).getTime();
                            // b.open_time=new Date(b.open_time).getTime();
                           return a.open_time - b.open_time
                        },
                        multiple: 1,
                      },
                },
                {
                    title: '操作时间',
                    dataIndex: 'update_time',
                    //   sorter: {
                    //     compare: (a, b) => a.english - b.english,
                    //     multiple: 1,
                    //   },
                },
                {
                    title: '操作人',
                    dataIndex: 'sys_user_name',
                },
            ], data: [],list:[]
        }
    }
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    componentDidMount() {
        this.getdata();
    }
    getdata() {
        axios.get('/open_city')
            .then(res => {
                console.log(res.data);
                this.setState({ data: res.data.result.item_list} );
                this.setState({ list:res.data.result.item_list });
                this.setState({ add:res.data.result.item_list[0] });
                console.log(this.state.add,'添加');
            })
            .catch(err => console.log(err))
    }
    handleChange1=(value) =>{
        console.log(`selected ${value}`);
        // console.log(this);
        let data=this.state.data.filter(item=>{
            return item.name===`${value}`
        })
        this.setState({data})
        // console.log(this.state.data);
      }
      handleChange2=(value) =>{
        console.log(`selected ${value}`);
        // console.log(this);
        let data=this.state.data.filter(item=>{
            return item.pattern===`${value}`
        })
        this.setState({data})
        // console.log(this.state.data);
      }
      rest=()=>{
            this.setState({data:this.state.list})
      }
      //弹出框
      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
        var newArray =  JSON.parse(JSON.stringify(this.state.data));    
        // newArray.push("new value");   
        // this.setState({arr:newArray})
        newArray.unshift(this.state.add)
        newArray.map((item,index)=>{
            item.id=index+1;
            item.key=index+1
        })
        this.setState({data:newArray})
        console.log(this.state.data);
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      inp1(e){
          let list={name:e.target.value}
          this.setState({add:{...this.state.add,...list}})
        //   console.log(this.state.add,'修改');
      }
      handleChange3=(value) =>{
        // console.log(`selected ${value}`);
        // console.log(this);
       let list={pattern:value}
       this.setState({add:{...this.state.add,...list}})
      
        // console.log(this.state.data);
      }
      handleChange4=(value) =>{
        console.log(`selected ${value}`);
        // console.log(this);
        let list={service:value}
        this.setState({add:{...this.state.add,...list}})
        console.log(this.state.add,'修改');
      }
    render() {
        return (
            <div className='city'>
                <Modal
          title="添加城市"
          cancelText="取消"
          okText="确定"
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div><span className='sp1'>城市：</span><Input placeholder="请输入城市" onInput={(e)=>{this.inp1(e)}}/></div>
          <div><span  className='sp1'>用车模式：</span><Select  placeholder="请选选择用车模式" style={{ width: "80%" }} onChange={this.handleChange3} >
                        
                        <Option value="禁停区">禁停区</Option>
                        <Option value="停车点">停车点</Option>
                    </Select></div>
          <div><span  className='sp1'>运营模式：</span><Select placeholder="请选选择运营模式" style={{  width: "80%"}} onChange={this.handleChange4}>
                        <Option value="禁停区">自营</Option>
                        <Option value="停车点">加盟</Option>
                        
                    </Select></div>
        </Modal>
                {/* <button onClick={()=>{this.getdata()}}>anniu</button> */}
                <div>城市管理</div>
                <div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={this.showModal}>
                        添加城市
                    </Button>
                </div>

                <div className="top">
                    <span className="tit">城市：</span>
                    <Select defaultValue="全部" style={{ width: 70 }} onChange={this.handleChange1} >
                        <Option value="全部">全部</Option>
                        <Option value="上海">上海</Option>
                        <Option value="北京">北京</Option>
                        <Option value="郑州">郑州</Option>
                    </Select>
                    <span  className="tit">用车模式：</span>
                    <Select defaultValue="全部" style={{ width: 70 }} onChange={this.handleChange2}>
                        <Option value="全部">全部</Option>
                        <Option value="禁停区">禁停区</Option>
                        <Option value="停车点">停车点</Option>
                    </Select>
                    <Button className="rest" onClick={this.rest}>重置</Button>
                </div>
                <Table columns={this.state.columns} dataSource={this.state.data} onChange={this.onChange} />
            </div>
        );
    }
}

export default City;