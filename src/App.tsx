import { Provider } from "react-redux";
import AppRoutes from "./Routes";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
};
