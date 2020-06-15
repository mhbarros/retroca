import axios from 'axios';

export interface IBGEState {
  sigla: string
}

export interface IBGECity {
  id: number;
  nome: string;
}

export default axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1',
});


// https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios
