// import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import CampaignForm from './components/campaigns';
import ColorInversionFooter from './components/footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <CampaignForm/>
      <ColorInversionFooter/>
    </div>
  );
}

export default App;