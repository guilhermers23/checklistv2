import dayjs from "dayjs";
import { useGetAllSessionsQuery } from "../../services/sessionService";

const ListaDeSessoes = () => {
  const { data: sessions } = useGetAllSessionsQuery();
  if (!sessions) return [];

  const converterData = (data: string) => {
    if (data) {
      const isoData = (data);
      const time = dayjs(isoData).format('HH:mm');
      return time;
    } else {
      return 'Não finalizado'
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-9/10 m-auto my-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Lista de Sessões
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Técnico</th>
            <th scope="col" className="px-6 py-3">Grupo</th>
            <th scope="col" className="px-6 py-3">Subgrupo</th>
            <th scope="col" className="px-6 py-3">Hora de Inicio</th>
            <th scope="col" className="px-6 py-3">Hora de Término</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(sessao => (
            <tr key={sessao._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {sessao.tecnico?.name ?? 'Técnico não informado'}
              </th>
              <td className="px-6 py-4">
                {sessao.grupo}
              </td>
              <td className="px-6 py-4">
                {sessao.subGrupo}
              </td>
              <td className="px-6 py-4">
                {converterData(sessao.dataInicio)}
              </td>
              <td className="px-6 py-4">
                {converterData(sessao.dataFim)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default ListaDeSessoes;
