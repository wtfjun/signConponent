
import React from 'react'; 
import { Button, Modal, Form, FormControl } from 'rctui';

var TelNumber = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      focState: 'none',
      errMsgState: 0,
      passIconState: 0,
      telInputBg: '',
      topTelColor: '#fff'
    };
  },
 
  handleChange: function(event) {
    this.replaceState({
      value: event.target.value,
      focState: event.target.focState
    });
    this.judgeTel(event.target.value);
  },
  //
  judgeTel: function(value) {
    //isNaN(x) is true x不是全数字
    //用户输入手机为全数字且为11位
    if( !isNaN(value) && value.length == 11 )
      this.setState({
        errMsgState: 0,
        telInputBg: '',
        topTelColor: '#0078e7',
        passIconState: 1
      });
    else {
      this.setState({
        errMsgState: 1,
        telInputBg: '#FEE0A9',
        topTelColor: '#FEE0A9',
        passIconState: 0
      });
    }
  },
  //不对焦手机号码输入框时触发
  noFocus: function() {   
    this.setState({
      focState: 'none'
    });
  },

  //对焦手机号码输入框时触发
  focus: function() {
    this.setState({
      focState: 'display'
    });

  },

  render: function() {
    

    return (
      <div>
      <p className="top-tel" style={{color:this.state.topTelColor}}>
      <big style={{display:this.state.focState}}>
       
        <span>{this.state.value.slice(0,3)}</span>
        <span style={{marginLeft:5+'px'}}>{this.state.value.slice(3,7)}</span>
        <span style={{marginLeft:5+'px'}}>{this.state.value.slice(7)}</span>
      </big>
      </p>
        <div className="input-con">
          <input 
          type="text" 
          placeholder="手机号码"
          value={this.state.value}
          style={{background:this.state.telInputBg}}
          onChange={this.handleChange} 
          className="rct-form-control" 
          onBlur={this.noFocus}
          onFocus={this.focus}
          />
          
          <p className="err-msg">
            <span style={{opacity:this.state.errMsgState}} >*手机号格式不正确</span>
            <img  style={{opacity:this.state.passIconState}} src="/images/pass.png" />
          </p>
         
        </div>
      </div>
    );
  }
});

var Password = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      pswStrength: '0',
      pswIconState: 0,
      rePswIconState: 0,
      rePswInputBg: '',
      psw: '',
      rePsw: ''
    };
    
  },
  handleChange: function(e) {
    this.getPswStrength(e.target.value);
    this.setPswIconState(e.target.value);
    this.setState({
      value: e.target.value,
      psw: e.target.value
    });
  },
  handleReChange: function(e) {
    this.setState({
      rePsw: e.target.value
    });
    if(e.target.value === this.state.psw) {
      this.setState({
        rePswIconState: 1,
        rePswInputBg: ''
      });
    }
    else {
      this.setState({
        rePswIconState: 0,
        rePswInputBg: '#FEE0A9'
      });
    }
  },
  getPswStrength: function(psw) {
    var i,sum=0;
      for(i=1;i<psw.length;i++) {
        //charCodeAt 取得asc码
        sum+=Math.abs(psw.charCodeAt(i)-psw.charCodeAt(i-1));
        if(sum > 180) {
          sum = 180;
        }
      }
    i=0;
    this.setState({
      pswStrength: sum
    });
  },
  setPswIconState: function(psw) {
    if(psw.length >=6 ) {
      this.setState({
        pswIconState: 1
      });
    }
    else {
      this.setState({
        pswIconState: 0
      });
    }
  },
  render: function() {
    return <div className="password-con">
      <img src="/images/pass.png" className="psw-pass-icon" style={{opacity:this.state.pswIconState}} />
      <input type="password" placeholder="输入密码" 
      className="rct-form-control"
      onChange={this.handleChange} />
      <img src="/images/pass.png" className="rePsw-pass-icon" style={{opacity:this.state.rePswIconState}} />
      <input type="password" placeholder="再次输入" className="rct-form-control"
      onChange={this.handleReChange}
      style={{background:this.state.rePswInputBg}}
      />
      <p>密码强度：<span><i style={{left:this.state.pswStrength +'px'}}></i></span></p>
    </div>
  }
});

var Content = React.createClass({
  getInitialState: function() {
    return {author: '222', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
    console.log(e.target.value);
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {

    return  <div>

<Button status="primary" onClick={() => Modal.open({
  header: <img src="/images/szu.png" />,
  width: 300,
  buttons: {
    '提交': 'submit',
    '取消': true
  },
  content: (
    <Form className="sign" onSubmit={
      (data) => {
        alert(JSON.stringify(data));
        {/*关闭最上层Modal*/}
        Modal.close();
      }} layout="inline">
      <TelNumber />
      <FormControl name="select" label="选择所在班级" data={["软件工程一班","软件工程二班", "软件工程三班"]} type="select" grid={{width:1}} />
      <Password />
    </Form>
  )
})}>注册</Button>

      </div>
  }
});


export default Content;



