import styles from './App.module.css'
import Form from './components/Form/Form';
import useWeather from './hooks/useWeather';

function App() {
  const { fetchWeather } = useWeather()
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        <div>
          <Form 
            fetchWeather={fetchWeather}
          />
        </div>

        <div>2</div>
      </div>
    </>
  );
}

export default App;
