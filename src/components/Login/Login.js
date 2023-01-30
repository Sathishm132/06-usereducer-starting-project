import React, { useState,useReducer, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const reducer=(state,actions)=>{
  if(actions.type==='USER_INPUT'){
    return {value: actions.val,isvalid:actions.val.includes('@')}
  }
  if(actions.type==='INPUT_BLUR'){
    return({value:state.value,isvalid:state.value.includes('@')})
  }
  return {value:'',isvalid:false}

}
const passwordreducer=(state,actions)=>{
  if(actions.type==='USER_INPUT'){
    return({value:actions.val,isvalid:actions.val.trim().length > 6})
  }
  if(actions.type==='INPUT_BLUR'){
    return({value:state.value,isvalid:state.value.trim().length > 6})
  }
  return({value:'',isvalid:false})
}
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
 // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailstate,eamildispatch]=useReducer(reducer,{value:'',isvalid:null})
  const [passwordstate,passworddispatch]=useReducer(passwordreducer,{value:'',isvalid:null})

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    eamildispatch({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && event.target.value.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    passworddispatch({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
      emailstate.includes('@') && passwordstate.isvalid
    );
  };

  const validateEmailHandler = () => {
    eamildispatch({type:'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    passworddispatch({type:'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isvalid=== false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordstate.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
