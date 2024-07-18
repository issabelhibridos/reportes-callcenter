import { Header, Footer } from './components';
import { AllRoutes } from './routes/AllRoutes';

function App() {
  return (
    <div className="App bg-appbg dark:bg-darkbg" >
      <Header />
      <AllRoutes />
      <Footer/>
    </div>
  );
}

export default App;
