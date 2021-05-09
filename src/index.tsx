import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({

  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transaction', () => {
      return this.schema.all('transactions');
    });

    this.post('/transaction', (schema, request) => {
      const body = JSON.parse(request.requestBody);

      const data = {
        ...body,
        createdAt: new Date()
      }

      return schema.create('transactions', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
