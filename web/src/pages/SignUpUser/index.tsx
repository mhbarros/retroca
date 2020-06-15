import React, {useState, useEffect, ChangeEvent} from 'react';
import {FiArrowLeft} from 'react-icons/fi'

import {LeafletMouseEvent} from 'leaflet';
import {Map, TileLayer, Marker} from 'react-leaflet';

import './styles.css';

import Logo from "../../assets/logo.svg";

import {Link, useHistory} from "react-router-dom";

import api from './../../services/api';
import ibge, {IBGEState, IBGECity} from './../../services/ibge';

const SignInUser: React.FC = () => {

  const [name, setName]           = useState<string>('');
  const [email, setEmail]         = useState<string>('');
  const [phone, setPhone]         = useState<string>('');
  const [password, setPassword]   = useState<string>('');
  const [city, setCity]           = useState<string>('');
  const [latLng, setLatLng]       = useState<[number, number]>([0,0]);
  const [uf, setUf]               = useState<string>('');

  const [ufList, setUfList]       = useState<string[]>([]);
  const [cityList, setCityList]   = useState<IBGECity[]>([]);

  const history = useHistory();

  useEffect(() => {
    api.get('/item/category').then((response) => {
      console.log(response);
    });
  }, []);

  useEffect(() => {
    ibge.get<IBGEState[]>('/localidades/estados').then(response => {
      let uf = response.data.map(uf => uf.sigla);
      setUfList(uf);
    });

  }, []);

  useEffect(() => {
    ibge.get<IBGECity[]>(`/localidades/estados/${uf}/municipios`).then(result => {
      let cityList: IBGECity[] = result.data.map((data) => ({id: data.id, nome: data.nome}));

      setCityList(cityList);
    });
  }, [uf]);

  const handleUfChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUf(e.target.value);
  }

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setCity(e.target.value);
  }

  const handleMapClick = (e: LeafletMouseEvent) => {
    setLatLng([e.latlng.lat, e.latlng.lng]);
  }

  const doSignUp = () => {
    let data = {name, email, password, phone, city, uf, latitude: latLng[0], longitude: latLng[1]};

    api.post('/user', data).then(response => {
      if(response.data.ok){
        history.push('/home');
      }else{
        alert(response.data.reason);
      }
    });
  }

  return (
    <div id="signup-user">
      <div className="content">
        <header>
          <img className={'logo'} src={Logo} alt={'Logo'} onClick={() => {history.push('/')}} />
          <Link to={'/'}>
            <FiArrowLeft />
            Voltar
          </Link>
        </header>

        <form>
          <h1>Cadastre-se na maior <br/>comunidade de troca de jogos.</h1>
          <legend>
            <h2>Dados</h2>
            <span>Preencha seus dados</span>
          </legend>
          <fieldset>
            <div className="field">
              <label htmlFor={'name'} >Nome</label>
              <input type="text" name={'name'} id={'name'} value={name} onChange={e => {setName(e.target.value)}}/>
            </div>
            <div className={'field-divided'} >
              <div className="field">
                <label htmlFor={'email'} >E-mail</label>
                <input type="text" name={'email'} id={email} onChange={e => {setEmail(e.target.value)}}/>
              </div>
              <div className="field">
                <label htmlFor={'phone'} >Telefone</label>
                <input type="text" name={'phone'} id={'phone'} onChange={e => {setPhone(e.target.value)}}/>
              </div>
            </div>
            <div className="field">
              <label htmlFor={'password'} >Senha</label>
              <input type="password" name={'password'} onChange={e => {setPassword(e.target.value)}}/>
            </div>
          </fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Por onde você está?</span>
          </legend>
          <Map center={[-22.930232, -43.1775141]} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={latLng} />
          </Map>
          <fieldset>

            <div className={'field-divided'} >
              <div className="field">
                <label htmlFor={'email'} >Estado(UF)</label>
                <select onChange={handleUfChange}>
                  <option value={''}>Selecione uma UF</option>
                  {
                    ufList.map(state => (<option key={state}>{state}</option>))
                  }
                </select>
              </div>
              <div className="field">
                <label htmlFor={'email'} >Cidade</label>
                <select onChange={handleCityChange}>
                  <option value={''}>Selecione uma cidade</option>
                  {
                    cityList.map(city => (<option key={city.id}>{city.nome}</option>))
                  }
                </select>
              </div>
            </div>
          </fieldset>
          <button type={'button'} onClick={doSignUp}>Cadastre-se</button>
        </form>
      </div>
    </div>
  );
}

export default SignInUser;
