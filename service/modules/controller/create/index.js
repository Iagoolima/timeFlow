const pool = require('./../../../database');

async function postEvent(req, res){
    try{
        const{tablename} = req.params;
        const { titulo } = req.body;
       
        const query = 
        `INSERT INTO ${tablename}(title) VALUES ($1)`;
        
        const result = await pool.query(query, [titulo]);
        res.json({ success: true, events: result.rows });
    }catch(error){
        console.error('Erro ao cadastrar titulo', error);
        res.status(500).json({ success: false, message: 'Erro ao cadastrar usuario' });
    }

}

module.exports = {
    postEvent,
};
