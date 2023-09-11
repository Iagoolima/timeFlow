const pool = require('./../../../database')

async function putEvent(req, res) {
    try {
        const { tablename, titlevalue } = req.params;
        const { clockValue, currentDate, conclusao } = req.body;


        const query = `
        UPDATE ${tablename} 
        SET time = $1, text = $2, date = $3
        WHERE title = $4`;
      

        // Execute a consulta SQL com os parâmetros apropriados
        await pool.query(query, [clockValue, conclusao, currentDate, titlevalue]);

        // Envie uma resposta de sucesso
        res.status(200).json({ message: 'Registro atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar o registro', error);
        // Envie uma resposta de erro
        res.status(500).json({ error: 'Erro ao atualizar o registro.' });
    }
}

module.exports = {
    putEvent,
}