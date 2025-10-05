import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Style from './ChangeFormStyle.module.scss';

//Types
import { FormData, Question } from '../../types/Types';


//Components
import Input from '../../components/input/TextInput';
import Button from '../../components/Button/Button';

//UI
import CahngeFormHEader from '../../UI/ChangeForm/ChangeFormHeader/ChangeFormHeader';
import ChangeSelection from '../../UI/ChangeForm/Selection/ChangeFormSelection';
import ButtonsControllers from '../../UI/ChangeForm/buttonsControllers/buttonsControllers'; 
import OptioonRow from '../../UI/ChangeForm/OptionRow/OptionRow';


type ChangeFormProps = {
  data: FormData[];
  setData: React.Dispatch<React.SetStateAction<FormData[]>>
};

const ChangeForm = ({ data, setData }: ChangeFormProps) => {
  const { id } = useParams<{ id: string }>();
  const form = data.find(f => f.id === Number(id)); 
  const [formData, setFormData] = useState(form);


  function Save(){
    if(!formData) return
    setData(prev => prev? prev.map(el => (el.id === formData.id ? formData : el)) : prev)

    alert('Форма збережена!')
  }

  function DellForm(){
    setData(prev => prev.filter(el => el.id !== formData?.id))
  }

  function addQuestion() {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'text',
      options: [],
      required: false,
    };
    setFormData(prev => prev? {...prev, questionsForm: [...prev.questionsForm, newQuestion]} : prev);
  }

  function ChangeQuestion(questionId:number, newText:string){
      setFormData(prev => prev? {
        ...prev,
        questionsForm: prev.questionsForm.map(el => el.id === questionId ? {...el, text: newText} : el)
      } : prev)
  }

  useEffect(() => {
    if (!formData) {
      const info = localStorage.getItem('changeForm');
      if (info) {
        setFormData(JSON.parse(info));
      }
    }
  }, []);

  useEffect(() => {
    if (formData) {
      localStorage.setItem('changeForm', JSON.stringify(formData));
    }
  }, [formData]);

  if (!form || !formData) return <p>Форма не знайдена</p>;
  


  return (
    <section className={Style.ChangeFormWrapper}>
      <CahngeFormHEader formData={formData} setFormData={setFormData}/>
      
        {formData?.questionsForm.map(el => (
          <div key={el.id} className={Style.QuestionCard}>
            <Input
              type="text"
              value={el.text}
              placeholder="Запитання"
              onChange={(e) => ChangeQuestion(el.id, e.target.value)}
              className={Style.QuestionInput}
            />

            <ChangeSelection el ={el} setFormData={setFormData} />
            <OptioonRow el={el} setFormData={setFormData}/>
            <ButtonsControllers setFormData = {setFormData} el={el} />

          </div>
        ))}
        
      <Button text='Додати відповідь' className={Style.AdQuestion} onClick={addQuestion}/>
      <Button text='Зберегти форму' className={Style.SaveForm} onClick={Save}/>
      <Button text='Видалити форму' className={Style.DellForm} onClick={DellForm}/>
    </section>
  );
};

export default ChangeForm;
