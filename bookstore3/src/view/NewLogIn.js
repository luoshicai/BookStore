import React, {Component} from "react";
import "../css/NewLogIn.css";
import {withRouter} from "react-router-dom";
class NewLogIn extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div class="container">
                    <Login/>
                </div>
            </div>
        )
    }
}

class Login extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="login-wrapper">
                <div className="header">登录</div>
                <div className="form-wrapper">
                    <input type="text" name="username" placeholder="用户名" className="input-item"/>
                    <input type="password" name="password" placeholder="密码" className="input-item"/>
                    <div className="btn">登录</div>
                    <div className="new-checkbox">
                        <input name="user" type="checkbox" value="user" className="new-user"/>
                        <p className="user-text">用 户</p>
                        <input name="root" type="checkbox" value="root" className="new-root"/>
                        <p className="root-text">管理员</p>
                    </div>
                </div>
                <div className="msg">
                    还没有账号？
                    <a href="#">注册</a>
                </div>
            </div>
        )
    }
}

export default withRouter(NewLogIn);
