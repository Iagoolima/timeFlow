import './styleBoxEvent.css';
import { IoTrashOutline } from 'react-icons/io5';


interface proposTitleEvent {
    title: string;
    time: string;
    text: string;
    date: string;
    buttonDelete: ()=> void;
}

export default function BoxEvent(props: proposTitleEvent) {
    return (
        <div className="box-event">
            <h1 className='title-box-event'>{props.title}</h1>
            <p className='time-box-event'>Horas desenvolvida: {props.time}</p>
            <p className='text-box-event'>Conclusão: {props.text}</p>
            <p className='date-box-event'>Data:{props.date}
            <button className="button-delete">
                <IoTrashOutline size={25} onClick={props.buttonDelete}/>
            </button></p>
        </div>
    )
}