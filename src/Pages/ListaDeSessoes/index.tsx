import { useEffect, useState } from "react";
import TableSessions from "../../components/Tables/TableSessions";
import { getAllSessions } from "../../services/sessionService";
import { IDadosSessao } from "../../Interfaces/ISessions";

const ListaDeSessoes = () => {
    const HEAD_TABLE = [
        "Técnico", "Grupo", "Subgrupo", "Hora de Inicio", "Hora de Término"
    ];

    const [sessions, setSessions] = useState<IDadosSessao[]>([]);

    const findAllSessions = async () => {
        try {
            const dataSessions = await getAllSessions();
            setSessions(dataSessions.data);
        } catch (error) {
            console.error("Ocorreu um erro ao obter as informações! ", error)
        }
    };

    useEffect(() => {
        findAllSessions();
    }, [])

    return (
        <TableSessions listaCabecalho={HEAD_TABLE} listaSessoes={sessions} />
    )
};

export default ListaDeSessoes;
