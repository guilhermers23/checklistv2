import { Link } from "react-router-dom";

interface ItemLinkProps {
  children: React.ReactNode;
  to: string;
}

export default function ItemLink({ children, to }: ItemLinkProps) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
    >
      <span className="flex items-center gap-2">{children}</span>
    </Link>
  );
}
