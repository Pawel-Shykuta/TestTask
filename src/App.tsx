import React, { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';

//Setver
import { LoadFromLOcal, SaveToLocal } from './Server/SaveToLocal';

//Types
import { FormData, Answer } from './types/Types';

//Pages
import PanelBuild from './components/PanelNavigation/PanelBuild'
import HomePage from './pages/HomePage/HomePage';
import CreatePage from './pages/CreatePage/CreatePage';
import ChangeForm from './pages/ChangeForm/ChangeForm';
import ChooseTest from './pages/ChooseTest/ChooseTest';
import StartTest from './pages/StartTest/StartTest';
import LoockAnswers from './pages/LoockAnswers/LoockAnswers';




const App:React.FC = () => {
  const [data, setData] = useState<FormData[]>([])
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    LoadFromLOcal(setData)
    console.log(data)
  }, []);

  useEffect(() =>{
    if(!data || data.length === 0) return
    SaveToLocal(data)
    console.log(data)
  },[data])

  

  return (
    <div className='APPContainer'>
      <PanelBuild />

      <div className='RouterContainer'>
        <Routes>
          <Route path='/' element={<HomePage data={data}/>} />
          <Route path='CreatePage' element = {<CreatePage setData={setData}/>} />
          <Route path='ChangeForm/:id' element = {<ChangeForm data ={data} setData={setData}/>} />
          <Route path='ChooseTest' element = {<ChooseTest data={data} />} />
          <Route path='StartTest/:id' element = {<StartTest data={data} setAnswers={setAnswers} answers={answers} />} />
          <Route path='LoockAnswers' element = {<LoockAnswers answers={answers} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
