const pool = require('./../../../database')

const deleteEvent = async (req, res)=>{
    try{
        const {tablename} = req.params;
        const eventId = req.params.id;

        if(!eventId){
            return res.status(400).json({message: 'id nao fornecido'})
        }

        const deleteQuery = `DELETE FROM ${tablename} WHERE id = $1`;
        await pool.query(deleteQuery, [eventId]);

        return res.status(200).json({ message: 'evento deletada' });

    }catch(error){
        console.error('erro ao deletar event',error);
        return res.status(500).json({ message: 'Erro ao apagar evento' });

    }
}

module.exports = {
    deleteEvent,
}