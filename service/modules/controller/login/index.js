// loginController.js

const pool = require('./../../../database'); // Importe a configuração do banco de dados


async function login(req, res) {
  try { 
    const { username } = req.body;
    
    // Execute uma consulta no banco de dados para verificar o nome de usuário
    const query = 'SELECT * FROM login WHERE username = $1';
    const result = await pool.query(query, [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json({ success: true, user });  
    } else {
      res.json({ success: false, message: 'Nome de usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao processar login:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}



// Exporte a função getEvent e o nome da tabela associada
module.exports = {
  login,
   
};
