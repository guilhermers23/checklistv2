import { useEffect, useState } from "react";
import { getAllListaTestes } from "../../Services/testesServices";
import { ITeste } from "../../Interfaces/Testes";

export default function ListaDeTestes() {
  const [testes, setTestes] = useState<ITeste[]>([]);

  const HEAD_TABLE = [  
    "Grupo", "Casos de Uso", "Resultado", "Observações", "Ações"
  ];

  const findAllTestes = async () => {
    try {
      const response = await getAllListaTestes();
      setTestes(response.data);
    } catch (error) {
      console.error("Erro ao buscar testes:", error);
    }
  };

  useEffect(() => {
    findAllTestes();
  }, []);

  return ;
};
