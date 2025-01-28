interface PropsInput {
  id: string;
  type: "email" | "password" | "text";
  placeholder: string;
  label: string;
  value: string;
  setValor: (e: string) => void;
  onchangeObservation?: (id: string, e: React.ChangeEvent<HTMLSelectElement>) => Promise<void> | undefined;
};

export default function Input(props: PropsInput) {
  return (
    <div className="md:w-9/12">
      <label htmlFor={props.type}
        className="block font-Oswald dark:text-gray-400">
        {props.label}
      </label>
      <input className="login_input"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.setValor && props.setValor(event.target.value)}
        required
      />
    </div>
  );
};
