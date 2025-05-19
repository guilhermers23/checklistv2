//import { useEffect, useState } from "react";
import TableSessions from "../../Components/Tables/TableSessions";
//import { getAllSessions } from "../../API/sessionService";
//import { IDadosSessao } from "../../Interfaces/ISessions";

const ListaDeSessoes = () => {
    const HEAD_TABLE = [
        "Técnico", "Grupo", "Subgrupo", "Hora de Inicio", "Hora de Término"
    ];
    //const [sessions, setSessions] = useState<IDadosSessao[]>([]);

    // const findAllSessions = async () => {
    //     try {
    //         const dataSessions = await getAllSessions();
    //         setSessions(dataSessions.data);
    //     } catch (error) {
    //         console.error("Ocorreu um erro ao obter as informações! ", error)
    //     }
    // };

    // useEffect(() => {
    //     findAllSessions();
    // }, [])

    return (
        <TableSessions listaCabecalho={HEAD_TABLE} listaSessoes={[]} />
    )
};

export default ListaDeSessoes;
