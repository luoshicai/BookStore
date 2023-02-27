import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import "../css/logIn.css";
import background from "../imag/登录背景图.jpg";
import localStorage from "localStorage";
import {login, signIn} from "../service/userService";
import {Button, Form, Input, message, Select, Tabs} from "antd";
import {wait} from "@testing-library/user-event/dist/utils";
const { TabPane } = Tabs;
class LogIn extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            counter:1,
            userName:"",
            password:"",
            identity:0
        }
        this.componentWillReceiveProps=this.componentWillReceiveProps.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({counter:++this.state.counter});
    }

    componentDidMount() {
        // localStorage.setItem("userId", "0");
    }


    //测试
    jumpToHome = (userId) =>{
        localStorage.setItem("userId",userId);
        console.log(userId);
        this.props.history.push("/");
    }

    jumpToRoot = (userId) =>{
        localStorage.setItem("userId",userId);
        console.log(userId);
        this.props.history.push("/Root");
    }
    render() {
        return(
            <div className="login-container">
                <div id="logIn">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="登录" key="1">
                            <RLogIn jumpToHome={this.jumpToHome} jumpToRoot={this.jumpToRoot}/>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <SignIn/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
    );
    }
}

const RLogIn = (props) =>{
    const [formLog] = Form.useForm();
    const callback = (data) =>{
        console.log(data);
        if (data.msg!=="登录成功"){
            message.error(data.msg);
        }
        else{
            message.success(data.msg);
            if (data.identity===1){
                props.jumpToHome(data.userId);
            }
            else{
                props.jumpToRoot(data.userId);
            }
        }
    }

    const HandleLogIn = () =>{
        formLog.validateFields().then(values => {
            console.log(values);
             const data = {userName:values.username, password: values.Password};
             login(data,callback);
        })
    }
    return(
        <div id="RLogIn">
            <Form form={formLog}
                  name="wrap"
                  labelCol={{
                      flex: '110px',
                  }}
                  labelAlign="right"
                  labelWrap
                  wrapperCol={{
                      flex: 1,
                  }}
            >
                <Form.Item label="用户名" name="username"
                           rules={[{
                               required:true,
                               message:'用户名不能为空'
                           }]}><Input/></Form.Item>
                <Form.Item label="密码" name="Password"
                           rules={[{
                               required:true,
                               message:'密码不能为空'
                           }]}><Input/></Form.Item>
                {/*<Form.Item label="用户身份" name="identity"*/}
                {/*           rules={[{*/}
                {/*               required:true,*/}
                {/*               message:'请选择用户身份！'*/}
                {/*}]}>*/}
                {/*    <Select>*/}
                {/*        <Select.Option value="user">普通用户</Select.Option>*/}
                {/*        <Select.Option value="root">管理员</Select.Option>*/}
                {/*    </Select>*/}
                {/*</Form.Item>*/}
            </Form>
            <Button className="RLogIn-Btn" onClick={()=>HandleLogIn()}>登录</Button>
        </div>
    )
}

const SignIn = () =>{
    const [formSign] = Form.useForm();
    const callback = (data) =>{
        if (data.msg==="注册成功"){
            message.success("注册成功");
            wait(500).then(r => window.location.reload());
        }
        else{
            message.error("注册失败，用户名重复！");
        }
    }
    const HandleSignIn = () => {
        formSign.validateFields().then(values=>{
             if (values.Password!==values.PasswordConfirm){
                 message.error("两次的密码输入不一致！");
             }
             else{
                 const data = {userName:values.username, password:values.Password,email:values.email};
                 signIn(data,callback);
             }
        })
    }

    return(
        <div id="signIn">
            <Form form={formSign}
                  name="wrap"
                  labelCol={{
                      flex: '110px',
                  }}
                  labelAlign="right"
                  labelWrap
                  wrapperCol={{
                      flex: 1,
                  }}
            >
                <Form.Item label="用户名" name="username"
                           rules={[{
                               required:true,
                               message:'用户名不能为空'
                           }]}><Input/></Form.Item>
                <Form.Item label="密码" name="Password"
                           rules={[{
                               required:true,
                               message:'密码不能为空'
                           }]}><Input/></Form.Item>
                <Form.Item label="再次输入密码" name="PasswordConfirm"
                           rules={[{
                               required:true,
                               message:'密码不能为空'
                           }]}><Input/></Form.Item>
                <Form.Item label="邮箱" name="email"
                           rules={[{
                               required:true,
                               type: "email"
                           }]}
                ><Input/></Form.Item>
            </Form>
            <Button className="signIn-Btn" onClick={() => HandleSignIn()}>注册</Button>
        </div>
    )
}
export default withRouter(LogIn);
