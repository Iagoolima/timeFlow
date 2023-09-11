const express = require('express');
const app = express();

const router = require('./modules/routes')

const cors = require('cors');

app.use(cors());
app.use(express.json());



app.use('/route', router)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Rota não encontrada' });
  });




app.listen(3001, ()=>{
        console.log('servidor funcionando na porta 3001');
});