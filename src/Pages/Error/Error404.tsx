import { Link } from "react-router-dom";
import fotoGato from "./assets/19.png";

export default function Error404() {
  return (
    <>
      <div className="h-screen w-screen bg-gray-100 flex items-center">
        <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
          <div className="max-w-md">
            <div className="text-5xl font-dark font-bold">404</div>
            <p className="text-2xl md:text-3xl font-light leading-normal">
              Desculpe, não conseguimos encontrar esta página.{" "}
            </p>
            <p className="mb-8">
              Mas não se preocupe, você pode encontrar muitas outras coisas em
              nosso página inicial.{" "}
            </p>

            <Link to="/">
              <button className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Voltar pagina inicial
              </button>
            </Link>

          </div>
          <div className="max-w-lg">
            <img src={fotoGato} alt="Imagam de um gato perto de uma jarra" />
          </div>
        </div>
      </div>
    </>
  );
};
