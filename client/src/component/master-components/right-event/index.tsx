import { useEffect, useState } from 'react';
import BoxEvent from '../box-right-event';
import './styleEvent.css';


import api from '../../../api';
import { useLocation } from 'react-router-dom';

interface Event {
  id: number;
  title: string;
  time: string;
  text: string;
  date: string;
  buttonDelete: () => void;
}

export default function Event() {
  const [events, setEvents] = useState<Event[]>([]);  // Estado para armazenar os eventos
  const location = useLocation();
  const [tableName, setTableName] = useState<string>();
  const [ nomeUser, setNomeUser] = useState<string>()

  const [eventToDelete, setEventToDelete]=useState<Event | null>(null);

  const [modalDelete, setDeleteModal] = useState(false);

  const { tabela_associada, nome } = location.state || {};

  useEffect(() => {
      if (tabela_associada && nome) {
          setTableName(tabela_associada);
          setNomeUser(nome);
      }
  }, [location.state]);


 //essa função que quero chamar no outro arquivo 
  
     async function fetchEvents() {
      try {
        const response = await api.get(`/route/read/${tableName}`); // Substitua pela URL correta da sua API
        const data = response.data; // Acessar os dados diretamente
        if (data.success) {
          setEvents(data.events); // Suponha que os eventos estejam em data.events
        } else {
          console.error('Falha ao buscar eventos:', data.message);
        }
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    }

    //função acima de atualizar
    
   useEffect(()=>{
    fetchEvents();
   })
     
   
 

    const handleDelete = (eventItem: Event) =>{
      setEventToDelete(eventItem);
      setDeleteModal(true);
    }

    const confirmHandleDelete= async () =>{
      if(eventToDelete){
        try{
  
          await api.delete(`/route/delete/${tableName}/${eventToDelete.id}`)
          setDeleteModal(false);
          fetchEvents();//função de atualizar tabela
        }catch(error){
          console.error('erro ao deletar evento:', error)
        }
      }
    }
  



  return (
    <div className="container-event">
      {modalDelete && (
                
                    <div className="card-modal-client-right">

                        <div className="box-text-modal-right">
                            
                            <h3>Deseja apagar o {eventToDelete?.title} ?</h3>

                        </div>
                                <div className="box-button-modal">
                                    <button className="buton-confirm-modal modal-color-red" onClick={() =>{setDeleteModal(false)}}>Fechar</button>
                                    <button className="buton-confirm-modal modal-color-green" onClick={confirmHandleDelete}>Excluir</button>
                                </div>

                    
                </div>
      )}

      <div className="container-event-content">

        {events.map((event) => (
          <BoxEvent
            key={event.id} // Certifique-se de ter uma chave única para cada evento
            title={event.title}
            time={event.time}
            text={event.text}
            date={event.date}
            buttonDelete={() => handleDelete(event)}
          />
        ))}


      </div>
      <div className="container-event-right-title">
        <div className="box-text-title-right-event">
          <p className='title-event'>E</p>
          <p className='title-event'>V</p>
          <p className='title-event'>E</p>
          <p className='title-event'>N</p>
          <p className='title-event'>T</p>
          <p className='title-event'>O</p>
          <p className='title-event'>S</p>
        </div>
      </div>
    </div>
  )
}