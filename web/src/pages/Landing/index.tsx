import React from "react";
import {Link} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import Logo from './../../assets/logo.svg';
import Bg from '../../assets/landing-bg.svg';

import './styles.css';

const Landing: React.FC = () => {
  return (
    <div id={'page-home'}>
      <div className="content">
        <header>
          <img src={Logo} alt={'Logo'} />
        </header>

        <main>
          <div>
            <h1>Seu marketplace de troca de jogos.</h1>
            <p>Ajudamos pessoas a encontrarem um novo destino para seus jogos antigos.</p>
            <Link to={'/signin/user'}>
              <span>
                <FiLogIn />
              </span>
              <strong>Entrar com uma conta</strong>
            </Link>
            <Link to={'/signup/user'}>
              <span>
                <FiLogIn />
              </span>
              <strong>Junte-se a comunidade !</strong>
            </Link>
          </div>
          <div>
            <img src={Bg} alt={'Background image'} style={{maxWidth: 720}}/>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Landing
