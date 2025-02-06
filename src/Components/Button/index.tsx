interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled: boolean;
};

export default function Button(props: Props) {
  return (
    <button className="login_button flex gap-2 disabled:cursor-progress disabled:bg-sky-300" type={props.type}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};
