import React, { useContext, useEffect, useState } from 'react';
import "./DetalhesEvento.css";
import MainContent from '../../components/MainContent/MainContent';
import Title from "../../components/Title/Title";
import { useParams } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import api from "../../Services/Service";
import { dateFormatDbToView } from '../../Utils/stringFunctions';
import Container from '../../components/Container/Container';

const DetalhesEvento = () => {
    const { userData } = useContext(UserContext);
    const [todosComentarios, setTodosComentarios] = useState([]);

    const { idEvento } = useParams();


    useEffect(() => {
        TodosComentarios()
    }, [])
    async function TodosComentarios(id) {
        try {
            if (userData.role === "Administrador") {
                const promise = await api.get(`/ComentariosEvento/ListarSomenteEvento/${idEvento}`)

                setTodosComentarios(promise.data);

            }
            else {
                alert("Bateu")
                const promise = await api.get(`/ComentariosEvento/ListarSomenteEventoTrue/${idEvento}`)

                console.log(promise.data);

                setTodosComentarios(promise.data);
            }



        } catch (error) {
            console.log(error);
        }
        console.log(todosComentarios);
    }
    return (
        <MainContent>
            <Container>
                <Title additionalClass='custom-title' titleText="Detalhes Do Evento" />
                {/* Detalhes do evento */}
                {todosComentarios.map((d) => {
                    return (





                        
                        <table className="tbal-data">
                            <thead className="tbal-data__head">
                                <tr className="tbal-data__head-row tbal-data__head-row--red-color">
                                    <th className="tbal-data__head-title tbal-data__head-title--big">
                                        Nome Usuario
                                    </th>
                                    <th className="tbal-data__head-title tbal-data__head-title--big">
                                        Comentario
                                    </th>
                                    <th className="tbal-data__head-title tbal-data__head-title--big">
                                        Bloqueado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="tbal-data__head-row" key={Math.random()}>
                                    <td className="tbal-data__data tbal-data__data--big">
                                        {d.usuario.nome}
                                    </td>

                                    <td className="tbal-data__data tbal-data__data--big">
                                        {d.descricao}
                                    </td>

                                    <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                                        {d.exibe}
                                    </td>


                                </tr>
                            </tbody>
                        </table>
                    )
                })
                }




            </Container>


        </MainContent >
    );
};


export default DetalhesEvento;