import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Animation from './components/Animation';
import { AiOutlineClose } from 'react-icons/ai';
import datosEfemerides from './assets/datosEfemerides.json';

const App = () => {
  const [todayData, setTodayData] = useState([]);
  const today = new Date();
  
  useEffect( () => {
    handleData(datosEfemerides);
    m8Color();
  }, []);

  const handleData = data => {
    let arrayTemp = [];

    data.forEach(element => {
      let date = new Date(`${element.fecha} 2024`);
      
      if(checkDates(today, date)) arrayTemp.push(element);
    });

    setTodayData(arrayTemp);
  };

  const m8Color = () => {
    const targetDate = new Date('Mar 8 2024');
    if (today.getFullYear() === targetDate.getFullYear() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getDate() === targetDate.getDate()) {
      
      document.querySelector('.navbar-header').classList.add('special-bg');
    }
  };

  const checkDates = (todayDate, holidayDate) => {
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDate();

    let holidayYear = holidayDate.getFullYear();
    let holidayMonth = holidayDate.getMonth();
    let holidayDay = holidayDate.getDate();

    if(holidayDay === todayDay && holidayMonth === todayMonth && holidayYear === todayYear) return true;

    return false;
  };
  
  const deleteElement = id => {
    let arrayTemp = todayData.filter(item => item.id !== id);

    setTodayData(arrayTemp);
  };

  return (
    <>
      <ContenedorCuadro>
        {todayData.length !== 0 && (
          <h5>Hoy conmemoramos...</h5>
        )}
        {todayData && todayData.map( item => (
          item.tipo === 1 ? (
            <CuadroTexto
              key={item.id}>
                <AiOutlineClose onClick={() => deleteElement(item.id)}/>
                <Imagen>
                  <img src={item.imagen}/>
                </Imagen>
                <p>{item.texto}</p>
            </CuadroTexto>
          ) : (
            <CuadroTexto
              key={item.id}>
                <AiOutlineClose onClick={() => deleteElement(item.id)}/>
                <Imagen>
                  <img src='https://media.tenor.com/1Z7EJnXM8c8AAAAC/happy-birthday.gif'/>
                </Imagen>
                <TextoCumple>
                  <p>!Feliz cumpleaños <b>{item.texto}</b>!</p>
                  <p>{item.sucursal}</p>
                </TextoCumple>
            </CuadroTexto>
          )
        ))}
      </ContenedorCuadro>
      {today.getMonth() === 2 && (
        <Animation/>
      )}
    </>
  );
};

export default App;
const ContenedorCuadro = styled.div`
  align-items: center;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  left: 20px;
  pointer-events: auto;
  position: absolute;
  z-index: 100;

  h5 {
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    padding: 5px;
  };
`;

const CuadroTexto = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  display: flex;
  gap: 10px;
  height: 160px;
  justify-content: center;
  position: relative;
  transform: scale(100%);
  width: 350px;

  svg {
    color: #FFFFFF;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
  };

  p {
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    text-align: center;
    width: 150px;
  };
`;

const Imagen = styled.div`
  background-color: #000000;
  height: 100px;
  width: 100px;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  };
`;

const TextoCumple = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;

  p {
    color: #FFFFFF;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    text-align: center;
    width: 100%;
  };

  b {
    color: #FFD966;
  };
`;