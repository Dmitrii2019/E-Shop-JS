// https://bezkoder.com/node-express-sequelize-postgresql/

const express = require('express')
const fs = require('fs');
const bodyParser = require('body-parser');
// подключили корсы
const cors = require('cors')

const app = express()

// добавили корсы
app.use(cors())
app.use(bodyParser.json());

app.post('/addToCart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{ "result": 0 }')
    } else {
      const cart = JSON.parse(data);
      const item = req.body;

      cart.push(item);

      fs.writeFile('./database/cart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  })
})

app.get('/test', (req, res) => {
  res.send('testt')
})

app.post('/deleteFromCart', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{ "result": 0 }')
    } else {
      const cart = JSON.parse(data);
      const item = req.body;
      const cartNew = cart.filter(i => JSON.stringify(i) != JSON.stringify(item));

      fs.writeFile('./database/cart.json', JSON.stringify(cartNew), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  })
})

app.get('/catalogData', (req, res) => {
  fs.readFile('./database/catalog.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.get('/cartData', (req, res) => {
  fs.readFile('./database/cart.json', 'utf8', (err, data) => {
    res.send(data)
  })
})

app.listen(3000, () => {
  console.log('Server started on 3000 port!')
})

