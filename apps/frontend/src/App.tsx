import { JSX } from "react/jsx-runtime";
import { Routes, Route} from 'react-router-dom'
import AppRoutes from "./AppRoutes";
import { Layout } from "./pages/Layout";

function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, ...rest } = route;
          return <Route key={index} {...rest} element={element}/>;
        })}
      </Routes>
    </Layout>
  );
}

export default App;
