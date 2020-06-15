import React, {useState} from 'react';
import {FiArrowLeft} from 'react-icons/fi'

import './styles.css';

import Logo from "../../assets/logo.svg";
import {Link, useHistory} from "react-router-dom";

import api from './../../services/api';

const SignInUser: React.FC = () => {

  const [email, setEmail]       = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();

  const doLogin = () => {
    api.post('/login/user', {email, password}).then((r) => {
      if(r.data.ok){
        let {name} = r.data.data;
        localStorage.setItem('user_name', name);
        history.push('/home');

      }else{
        alert(r.data.reason);
      }
    })
  }

  return (
    <div id="signin-user">
      <div className="content">
        <header>
          <img className={'logo'} src={Logo} alt={'Logo'} onClick={() => {history.push('/')}}/>
          <Link to={'/'}>
            <FiArrowLeft />
            Voltar
          </Link>
        </header>

        <form>
          <h1>Entre com sua conta</h1>
          <div className="field">
            <label htmlFor={'email'} >E-mail</label>
            <input type="email" name={'email'} value={email} onChange={e => {setEmail(e.target.value)}}/>
          </div>
          <div className="field">
            <label htmlFor={'email'} >Senha</label>
            <input type="password" name={'email'} value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <button type={'button'} onClick={doLogin}>Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default SignInUser;
