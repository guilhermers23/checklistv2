interface Props {
    type: "email" | "password" | "text";
    placeholder: string;
    label: string;
    value: string;
    setValor: (e: string) => void;
  }
  
  export default function Input(props: Props) {
    return (
      <div className="md:w-9/12">
        <label htmlFor={props.type} className="block font-Oswald dark:text-gray-400">{props.label}</label>
        <input className="login_input"
          type={props.type}
          placeholder={props.placeholder}
          id={props.type}
          value={props.value}
          onChange={(event) => props.setValor(event.target.value)}
          required
        />
      </div>
    );
  };
  