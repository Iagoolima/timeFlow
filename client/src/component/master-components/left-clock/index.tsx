import { useEffect, useState, useRef } from "react";
import "./styleClock.css";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import TimerModal from "../timer-modal";

import { useForm } from 'react-hook-form';
import api from "../../../api";
import { useLocation, useNavigate } from "react-router-dom";

import fetchEvents from "../right-event";






export default function Clock() {
    const [time, setTime] = useState(() => {
        // Tente recuperar o valor do tempo do localStorage, se não existir, use 0
        const savedTime = localStorage.getItem("savedTime");
        return savedTime ? parseInt(savedTime, 10) : 0;
    });

    const [stoppedTime, setStoppedTime] = useState<number>(0);

    const [isRunning, setIsRunning] = useState(false);

    const intervalRef = useRef<number | undefined>();
    const pauseAlertIntervalRef = useRef<number | undefined>();

    //modal
    const [isModalPause, setIsModalPause] = useState(false);
    const [isModalEvent, setIsModalEvent] = useState(false);
    const [isModalFinalEvent, setIsModalFinalEvent] = useState(false);


    //função para anotar evento apenas uma vez
    const storedFirstTime = localStorage.getItem("firstTime");
    const initialFirstTime = storedFirstTime === "true" ? false : storedFirstTime ? JSON.parse(storedFirstTime) : false;

    const [firstTime, setFirstTime] = useState(initialFirstTime);


    //hooks form
    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 }, reset: resetForm1 } = useForm();


    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 }, reset: resetForm2 } = useForm();


    //nome da tabela 
    const [tableName, setTableName] = useState<string>();
    const [nomeUser, setNomeUser] = useState<string>()


    const [titleValue, setTitleValue] = useState<string>('')





    const location = useLocation();
    const { tabela_associada, nome } = location.state;
    useEffect(() => {

        setTableName(tabela_associada);
        setNomeUser(nome);

    }, [location.state])


    // Formate a hora em HH:MM:SS
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    useEffect(() => {
        if (isRunning) {
            if (!intervalRef.current) {
                // Inicie o intervalo apenas se não estiver em execução
                intervalRef.current = window.setInterval(() => {
                    setTime((prevTime) => {
                        const newTime = prevTime + 1;
                        // Salve o novo tempo no localStorage
                        localStorage.setItem("savedTime", newTime.toString());
                        return newTime;
                    });
                }, 1000);

                // Configure o intervalo para pausar e mostrar o alerta a cada 5 segundos
                pauseAlertIntervalRef.current = window.setInterval(() => {
                    setIsRunning(false);
                    setIsModalPause(true);

                    setTimeout(() => {
                        setIsModalPause(false);

                    }, 8000);
                }, 5600);
            }
        } else {
            // Pausar o intervalo se estiver em execução
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }

            // Limpar o intervalo de alerta
            if (pauseAlertIntervalRef.current) {
                clearInterval(pauseAlertIntervalRef.current);
                pauseAlertIntervalRef.current = undefined;
            }
        }

        // Limpe o intervalo quando o componente for desmontado
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }

            if (pauseAlertIntervalRef.current) {
                clearInterval(pauseAlertIntervalRef.current);
                pauseAlertIntervalRef.current = undefined;
            }
        };
    }, [isRunning]);

    // Restaurar o valor do tempo quando o componente é montado
    useEffect(() => {
        const savedTime = localStorage.getItem("savedTime");
        if (savedTime) {
            setTime(parseInt(savedTime, 10));
        }
    }, []);

    const formReset = () => {
        resetForm1();
        resetForm2();

    }


    const modalEvent = () => {
        if (firstTime === false) {
            setIsModalEvent(true);
            setFirstTime(true);
            localStorage.setItem("firstTime", JSON.stringify(true));
            // Defina o tempo inicial como 0 quando um novo projeto é iniciado

        } else {
            setIsRunning(!isRunning);
        }
    }

    const cancelModalEvent = () => {
        setFirstTime(false);
        localStorage.setItem("firstTime", JSON.stringify(false));
        setIsModalEvent(false)
    }


    async function onSubmit(formData: any) {
        try {
            setTitleValue(formData.titulo);
            const response = await api.post(`/route/post/${tableName}`, { titulo: formData.titulo });
            handlePlayPauseClick();
            formReset();
        } catch (error) {
            console.error("erro ao cadastrar usuario", error)
        }
    }

    const modalEventFinal = () => {
        if (firstTime === true) {
            setIsModalFinalEvent(true);
        }
        setIsRunning(false);
        setStoppedTime(time)
    }



    const onSubmitFinal = async (formData: any) => {
        try {
            const stoppedHours = Math.floor(stoppedTime / 3600);
            const stoppedMinutes = Math.floor((stoppedTime % 3600) / 60);
            const stoppedSeconds = stoppedTime % 60;
            const formattedStoppedTime = `${String(stoppedHours).padStart(2, "0")}:${String(
                stoppedMinutes
            ).padStart(2, "0")}:${String(stoppedSeconds).padStart(2, "0")}`;


            const currentDate = new Date();
            const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

            const response = await api.put(`/route/post/${tableName}/${titleValue}/`, {
                clockValue: formattedStoppedTime,
                currentDate: formattedDate,
                conclusao: formData.conclusao

            })

            formReset();
            setIsModalFinalEvent(false)
            handleStopClick();
        } catch (error) {
            console.error('erro ao editar usuario', error)
        }

    }




    const handlePlayPauseClick = () => {
        setIsRunning(true);
        setIsModalEvent(false);
        fetchEvents()
        //função de atualizar tabela 
    };

    const handleStopClick = () => {
        setIsRunning(false);
        setStoppedTime(time); // Defina stoppedTime com o valor atual de time
        // Limpar o valor do tempo no localStorage quando o botão de parar for clicado
        localStorage.removeItem("savedTime");
        setFirstTime(false)
        setTime(0);
    };



    const navigate = useNavigate();

    const returnScreen = () => {
        if (firstTime === true) {
            alert('para sair, encerre sua atividade !')
        } else {
            navigate('/')
        }

    }

    const hadleButtonEnter1 = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão de submissão do formulário

            const formData = new FormData(event.target.form);
            const titulo = formData.get("titulo");
            handleSubmitForm1(() => onSubmit({ titulo }))(); // Chama a função de envio do formulário
        }
    }
    const hadleButtonEnter2 = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Impede o comportamento padrão de submissão do formulário

            const formData = new FormData(event.target.form);
            const conclusao = formData.get("conclusao");
            handleSubmitForm2(() => onSubmitFinal({ conclusao }))(); // Chama a função de envio do formulário
        }
    }

    window.addEventListener('beforeunload', function (e) {
        // Cancela o evento padrão para exibir a mensagem personalizada
        e.preventDefault();
        // Define a mensagem de confirmação personalizada
        e.returnValue = 'Tem certeza de que deseja sair? Se você estiver com algum processo e andamento poderá perder dados não salvos.';
    });


    return (
        <div className="container-clock">
            <div className="box-header-clock">
                <h1 className="title-name-user">
                    Olá {nomeUser}
                </h1>
                <button onClick={returnScreen} className="button-exit">Sair</button>

            </div>

            <div className="box-time-buttons">
            <h1 className={`clock-text ${isRunning ? "" : "color-clock"}`}>
                {formattedTime}
            </h1>

            <div className="box-button-clock">
                <button className="button-clock" onClick={modalEvent}>
                    {isRunning ? <FaPause /> : <FaPlay />}{" "}
                </button>
                <button className="button-clock" onClick={modalEventFinal}>
                    <FaStop />
                </button>
            </div>

            </div>


            {isModalEvent && (
                <div className="container-modal-client">
                    <div className="card-modal-client">

                        <div className="box-text-modal">
                            <h2>Olá programador!</h2>
                            <h3>Digite nome do projeto de hoje e vamos programar !</h3>

                        </div>

                        <div className="box-input-modal">
                            <label htmlFor="" className="label-title-modal">Titulo</label>

                            <form onSubmit={handleSubmitForm1(onSubmit)} className="form-title-modal">
                                <input type="text" className="input-modal-title" autoComplete="off" {...registerForm1("titulo", { required: true })} onKeyDown={hadleButtonEnter1} />

                                <div className="box-button-modal">
                                    <button className="buton-confirm-modal modal-color-red" onClick={cancelModalEvent}>Fechar</button>
                                    <button type="submit" className="buton-confirm-modal modal-color-green"> Iniciar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}






            {isModalFinalEvent && (
                <div className="container-modal-client">
                    <div className="card-modal-client">

                        <div className="box-text-modal">
                            <h2>Projeto concluido ?</h2>
                            <h3>Digite a conclusão da sua tarefa de hoje !</h3>

                        </div>

                        <div className="box-input-modal">
                            <form onSubmit={handleSubmitForm2(onSubmitFinal)} className="form-title-modal-final">
                                <input type="text" className="input-modal-conclusao" autoComplete="off" {...registerForm2("conclusao", { required: true })} placeholder="Digite..." onKeyDown={hadleButtonEnter2} />

                                <div className="box-button-modal">
                                    <button className="buton-confirm-modal modal-color-red" onClick={() => { setIsModalFinalEvent(false) }}>Fechar</button>
                                    <button type="submit" className="buton-confirm-modal modal-color-green">Finalizar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            )}



            {isModalPause && (
                <div className="container-modal-client">
                    <div className="card-modal-client">

                        <div className="box-text-modal">
                            <h2>Parabens !</h2>
                            <h3>Agora descanse alguns minutos e volte a programar.</h3>
                        </div>

                        <TimerModal />
                    </div>
                </div>
            )}
        </div>
    );
}


