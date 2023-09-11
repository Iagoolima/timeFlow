const pool = require('./../../../database'); 


async function getEvent(req, res) {
  try {
    const {tablename} = req.params
    const query = `SELECT * FROM ${tablename} `;
    const result = await pool.query(query);
    res.json({ success: true, events: result.rows });
  } catch (error) {
    console.error('Erro ao consultar eventos', error);
    res.status(500).json({ success: false, message: 'Erro ao consultar eventos' });
  }
}

module.exports = {
  getEvent,
};