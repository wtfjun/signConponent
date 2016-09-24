import React from 'react';
import { Button, Modal, Form, FormControl } from 'rctui';
class App extends React.Component {
   render() {
      return (
<div>

<Button status="primary" onClick={() => Modal.open({
  header: '注册',
  width: 300,
  buttons: {
    '提交': 'submit',
    '取消': true
  },
  content: (
    <Form onSubmit={
      (data) => {
        alert(JSON.stringify(data));
        {/*关闭最上层Modal*/}
        Modal.close();
      }} layout="inline">
      <span>手机号</span>
      <FormControl 
        placeholder="手机"
        type="text"
        grid={{width:1}} />
      <FormControl name="select" label="选择所在班级" data={["软件工程一班","软件工程二班", "软件工程三班"]} type="select" grid={{width:1}} />
      <FormControl name="password" grid={1} tip="" label="密码" type="password" />
      <FormControl name="password" grid={1} label="再次输入密码" type="password" />
      <span>密码强度</span>
    </Form>
  )
})}>open form</Button>
         </div>
      );
   

   }
}

export default App