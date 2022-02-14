import React from 'react';
import ReactDOM from 'react-dom';
import {createServer, Model} from 'miragejs';
import {App} from './App';

createServer({
  models:{
    transaction: Model,
  },

  //popular valores iniciais do banco de dados usando model
  seeds(server){
    server.db.loadData({
      transactions: [//A tabela é o nome do model no plural no caso o model é transaction e a tabela é transactions
        {
          id:1,
          title: 'Freeelance de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id:2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-10 11:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');//retornar todas as transações dentro do model(banco de dados)
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);//qual é o medel e os dados que vao ser enviados
    })

  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);