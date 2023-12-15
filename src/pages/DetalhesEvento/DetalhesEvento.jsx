import React, { useContext, useEffect, useState } from 'react';
import './DetalhesEvento.css'
import MainContent from '../../components/MainContent/MainContent';
import Title from "../../components/Title/Title";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import api from "../../Services/Service";
import { dateFormateDbToView } from '../../Utils/stringFunctions';
import Container from '../../components/Container/Container';

const DetalhesEvento = () => {
    const { userData } = useContext(UserContext);
    const [todosComentarios, setTodosComentarios] = useState([]);
    const [evento, setEvento] = useState([])

    const { idEvento } = useParams();


    async function TodosComentarios() {
        try {
            
                const promise = await api.get(`/ComentariosEvento/ListarSomenteEvento/${idEvento}`)

                
                
                
                const promiseExibe = await api.get(`/ComentariosEvento/ListarSomenteEventoTrue/${idEvento}`)
                
                
                

                userData.role=== "Administrador" ? setTodosComentarios(promise.data) : setTodosComentarios(promiseExibe.data);
            }



         catch (error) {
            console.log(error);
        }
        
        
    }



async function CarregarEventos(){
    try {
        const promise = await api.get(`/Evento/${idEvento}`)

        setEvento(promise.data)

        
    } catch (error) {
        console.log(error);
    }
    
}
// console.log(evento);


    useEffect(() => {
        TodosComentarios()

        CarregarEventos()
    }, [userData.userId])
   







    return (
        <MainContent>
            {/* Detalhes do evento */}
            <section className='detalhes'>
                    <div className="vision__box">
                        <Title
                            titleText={"Detalhes Do Evento"}
                            color='white'
                            additionalClass='vision__title'
                        />
                        <h2 className='vision__mini-title'>Nome Do Evento:</h2>
                        <p className='detalhes__text'>{evento.nomeEvento}</p>
                        <h2 className='vision__mini-title'>Descrição:</h2>
                        <p className='detalhes__text'>{evento.descricao}</p>
                        <h2 className='vision__mini-title'>Data Do Evento:</h2>
                        <p className='detalhes__text'>{new Date(evento.dataEvento).toLocaleDateString()}</p>
                        
                    </div>
                </section>




            <Container>


                <table className="tbal-data">
                    <thead className="tbal-data__head">
                        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
                            <th className="tbal-data__head-title tbal-data__head-title--big">
                                Nome Do Usuario
                            </th>
                            <th className="tbal-data__head-title tbal-data__head-title--big">
                                Comentario
                            </th>
                            <th className="tbal-data__head-title tbal-data__head-title--big">
                            Permissão
                            </th>
                        </tr>
                    </thead>
                    {todosComentarios.map((d) => {
                        return (
                            <tbody>

                                <tr className="tbal-data__head-row" key={Math.random()}>
                                    <td className="tbal-data__data tbal-data__data--big">
                                        {d.usuario.nome}
                                    </td>

                                    <td style={{justifyContent: 'center'}} className="tbal-data__data tbal-data__data--big">
                                        {d.descricao}
                                    </td>

                                    <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                                        {d.exibe}
                                    </td>


                                </tr>
                            </tbody>
                        )
                    })
                    }
                </table>









            </Container>


        </MainContent >
    );
};


export default DetalhesEvento;