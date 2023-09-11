import { useNavigate } from 'react-router-dom';
import './form.css';
import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';

import { AuthContext } from '../authContext';

import api from '../../../api';

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const { auth, setAuth } = useContext(AuthContext);
    // const {isNameTable, setIsNameTable } = useState<string | undefined>(undefined);


    // Adicione uma função para enviar os dados do formulário para o servidor

    async function onSubmit(formData: any) {
        try {
            const response = await api.post('/route/login', formData); // Envie os dados do formulário
            const { nome, username, tabela_associada } = response.data.user;
            //  setIsNameTable(tabela_associada)
            console.log(`Nome: ${nome}, Usuário: ${username} e tabela ${tabela_associada}`);
            navigate('/master' ,{state: {tabela_associada, nome}});
            setAuth(true);
        } catch (error) {
            console.error('Erro ao processar login:', error);
            setPasswordError(true)
            // Lide com erros de maneira adequada, como exibir uma mensagem de erro para o usuário
        }

    }


    return (
        <div className="container-form">
            <h1 className="title-form">TIME FLOW</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="box_input">
                    <p>BEM VINDO !</p>
                    <input
                        type="password"
                        placeholder="Digite usuário..." className='input-login' autoComplete='off'
                        {...register("username", { required: true })}
                    />
                    {passwordError && <span className='error-login'>Usuário não encontrado</span>}
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
}
