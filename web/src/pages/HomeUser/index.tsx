import React, {useEffect, useState, useRef, ChangeEvent} from 'react';
import {FiX} from 'react-icons/fi';

import {Map, Marker, TileLayer, Popup} from 'react-leaflet';

import {useHistory} from 'react-router-dom';

import api from './../../services/api';
import Logo from "../../assets/logo.svg";

import './styles.css';
import {AxiosResponse} from "axios";

interface ItemCategoryList {
  id: number;
  description: string;
  img: string
}

interface Item {
  item_id: number;
  item_description: string;
  item_condition: string;
  item_category: string;
  user_id: number;
  user_name: string;
  user_phone: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
}

const HomeUser: React.FC = () => {

  const [userName, setUserName]                     = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemCondition, setNewItemCondition]     = useState('');
  const [newItemCategory, setNewItemCategory]       = useState('');


  const [itemCategoryList, setItemCategoryList] = useState<ItemCategoryList[]>([]);
  const [itemList, setItemList]                 = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentGameList, setCurrentGameList]   = useState<Item[]>([]);

  const popupItem = useRef<any>();
  const history   = useHistory();

  useEffect(() => {
    api.get('/item/category').then((response: AxiosResponse) => {
      setItemCategoryList(response.data);
    })
  }, []);

  useEffect(() => {
    let name = localStorage.getItem('user_name');
    if(name){
      setUserName(name);
    }

  }, []);

  useEffect(() => {
    api.get('/item').then((response: AxiosResponse) => {
      if(!response.data.ok){
        return history.push('/');
      }

      let obj: any = {};
      console.log(response.data.data);
      response.data.data.forEach((el: Item) => {
        if(obj[el.user_id] === undefined){
          obj[el.user_id]       = {};
          obj[el.user_id].games = [];
        }
        obj[el.user_id].latitude  = el.latitude;
        obj[el.user_id].user_id   = el.user_id;
        obj[el.user_id].longitude = el.longitude;
        obj[el.user_id].user_name = el.user_name;
        obj[el.user_id].games.push({title: el.item_description});

      });

      setItemList(obj);
    });
  }, []);

  const handleCategorySelect = (e: any) => {

  }

  const handleUserSelect = async (userID: number) => {
    const request = await api.get('/item', {params: {us_i: userID}});
    if(!request.data.ok){
      alert("Não foi possível recuperar os jogos deste usuário. Por favor, tente novamente.");
      return;
    }

    const {data: games} = request.data;
    setCurrentGameList(games);
  }

  const showPopupItem = () => {
    popupItem.current.style.display = 'block';
  }

  const closePopupItem = () => {
    popupItem.current.style.display = 'none';
  }

  const doRegisterItem = () => {

    let data = {
      description: newItemDescription,
      condition: newItemCondition,
      category: newItemCategory
    };

    api.post('/item', data).then(result => {
      if(result.data.ok){
        popupItem.current.style.display = 'none';
      }else{
        alert(result.data.reason);
      }
    });
  }

  return (
    <div id={'home-user'}>
      <div ref={popupItem} className={'popup-new-event'}>
        <div className={'popup-content'}>
          <div className={'header'}>
            <h2>Novo evento</h2>
            <FiX onClick={closePopupItem}/>
          </div>
          <div className={'field'}>
            <label>Descrição*</label>
            <input type={'text'} onChange={e => {setNewItemDescription(e.target.value)}}/>
          </div>
          <div className={'field'}>
            <label>Condição*</label>
            <select onChange={e => {setNewItemCondition(e.target.value)}}>
              <option value={''}>Selecione uma condição</option>
              <option value={'0'}>Novo</option>
              <option value={'1'}>Usado</option>
            </select>
          </div>
          <div className={'field'}>
            <label>Plataforma*</label>
            <select onChange={e => {setNewItemCategory(e.target.value)}}>
              <option value={''}>Selecione uma plataforma</option>
              {
                itemCategoryList.map(item => (<option key={item.id} value={item.id}>{item.description}</option>))
              }
            </select>
          </div>
          <button className={'primary'} onClick={doRegisterItem}>Cadastrar</button>
        </div>
      </div>

      <div className={'content'}>
        <header>
          <img src={Logo} alt={'Logo'} />

          <div id={'user-actions'}>
            <div>
              <button className={'primary'} onClick={showPopupItem}>Novo item</button>
            </div>
            <div>
              Olá, {userName}. <br/>
              <a>Sair</a>
            </div>
          </div>
        </header>
        <main>
          <section>
            <h2>Filtros</h2>
          </section>
          <div className={'div-filter'}>
            <ul className={'items-grid'}>
              {
                itemCategoryList.map(item => (
                  <li key={item.id} onClick={handleCategorySelect}>
                    <img src={item.img} alt={item.description} />
                    <span>{item.description}</span>
                  </li>
                ))
              }
            </ul>
          </div>
          <div id={'map-container'}>
            <Map center={[-22.930232, -43.1775141]} zoom={15} >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {
                Object.values(itemList).map(el => {
                  let user: Item = el;
                  return <Marker key={user.user_id} position={[user.latitude, user.longitude]} onclick={() => {handleUserSelect(user.user_id)}}/>
                })
              }
            </Map>
          </div>
          {
            currentGameList.map(game => (
              <div className={'games-container'}>
                {JSON.stringify(game)}
              </div>
            ))
          }
        </main>
      </div>
    </div>
  );
};

export default HomeUser;
