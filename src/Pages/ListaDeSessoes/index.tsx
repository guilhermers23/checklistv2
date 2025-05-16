import { useState } from "react";
import TableSessions from "../../Components/Tables/TableSessions";
import { getAllSessions } from "../../API/sessionService";
import { IDadosSessao } from "../../Interfaces/ISessions";

const ListaDeSessoes = () => {
    const [sessions, setSessions] = useState<IDadosSessao[]>([]);

    const findAllSessions = async () => {
        try {
            const dataSessions = await getAllSessions();
            setSessions(dataSessions.data);
        } catch (error) {
            console.error("Ocorreu um erro ao obter as informações! ", error)
        }
    };

    return (
        <TableSessions />
    )
};

export default ListaDeSessoes;