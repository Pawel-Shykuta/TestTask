import { useNavigate, useParams } from "react-router-dom";

import Style from "./StartTestStyle.module.scss";

//Types
import { Answer, FormData } from "../../types/Types";

//Components
import Button from "../../components/Button/Button";
import Input from "../../components/input/TextInput";
import { useEffect } from "react";


type StartTestProps = {
  data: FormData[];
  answers: Answer[]
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>
};


const StartTest: React.FC<StartTestProps> = ({ data, setAnswers, answers }) => {
  const navigate = useNavigate()  
  const { id } = useParams<{ id: string }>();
  const form = data.find((f) => f.id === Number(id));

  
  useEffect(() =>{
    if(!id) return
    setAnswers([])
    localStorage.removeItem('answers')
  },[])

  useEffect(() =>{
    if(answers.length > 0){
      localStorage.setItem('answers',JSON.stringify(answers))
    }
  },[answers])

  useEffect(() => {
    if (!form) return;

    setAnswers(() =>
      form.questionsForm.map((q) => ({
        formName: form.nameForm,
        questionId: q.id,
        selectedIndex: null, 
        correctIndex: q.correctOption,
        questionText: q.text,
        options: q.options,
      }))
    );
  }, [form, setAnswers]);


  function addAnswer(questionId:number, selectIndex:number){
    setAnswers(prev => prev.map(el =>  el.questionId === questionId ? { ...el, selectedIndex: selectIndex } : el));
  }

  function Send(){
    if(!form) return

    const requiredQuestions = form.questionsForm.filter(q => q.required)
    const allRequiredAnswered = requiredQuestions.every(q => answers.some(a => a.questionId === q.id))

    if (!allRequiredAnswered) {
      alert("Будь-ласка, дайте відповіді на всі обов’язкові питання перед відправкою!");
      return;
    }

    navigate('/LoockAnswers')
  }


  return (
    <section className={Style.StartTestWrapper}>
      <div className={Style.FormHeader}>
        <h1>{form?.nameForm}</h1>
        <p>{form?.descriptionForm}</p>
      </div>

      <div className={Style.Questions}>
        {form?.questionsForm.map((el) => (
          <div key={el.id} className={Style.QuestionCard}>
            <h3 className={Style.QuestionText}>
              {el.text}
              {el.required && <span className={Style.Required}>*</span>}
            </h3>

            <div className={Style.Options}>
              {el.options.map((option, index) => (                
                  <Input
                    key={index}
                    type={el.type}
                    name={`question-${el.id}`}
                    className={Style.OptionLabel}
                    label={option}
                    onChange={() =>
                      addAnswer(el.id, index)
                    }
                  />                                 
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button text='Надіслати' className={Style.SubmitBtn} onClick={Send} />
    </section>
  );
};

export default StartTest;
