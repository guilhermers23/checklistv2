interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

export default function Button(props: Props) {
    return (
      <button className="login_button" type={props.type}>
        {props.children}
      </button>
    );
};
