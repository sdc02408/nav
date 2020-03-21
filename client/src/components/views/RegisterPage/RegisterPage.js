import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import {withRouter } from 'react-router-dom';
function RegisterPage (props) {
  
  //value 부분에 state를 넣어줘야해. 안에서 데이터를 바꾸러면 state해서 데이터를변화해야해.
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("")//처음에는 빈칸
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  
  
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler = (event) => {
    //이걸 안하면 계속해서 리프레쉬가 됨
    event.preventDefault();
    
    if(Password !== ConfirmPassword){
      return alert('비밀번호화 비밀번호 확인은 같아야 합니다.')
    }
    
    // 서버에 보낼때
    let body ={
      email: Email,
      name: Name,
      password: Password
      
    }
    // 리덕스 사용할때
    // loginUser라는액션을 취할꺼야 디스패치로
    dispatch(registerUser(body))
    .then(response =>{
      if(response.payload.success){
        props.history.push("/login")
      } else{
        alert("회원가입 하는데 실패했다.")
      }
    })
    
  }
  
  return (
    <div>
      <div style={{
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        width:'100%', height:'100vh'}}>
        
        <form style={{display:'flex', flexDirection:'column'}}
              onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          {/*타이핑 할때 value를 바꿔 onchange 이벤트 발생시켜서.  state이 바뀌어서 value가 바뀌어.*/}
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler} />
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler} />
  
          <label>Confirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
          <br />
          
          <button type="submit">
              회원가입
          </button>
        </form>
      
      
      </div>
    </div>
  )
}

export default withRouter(RegisterPage)
