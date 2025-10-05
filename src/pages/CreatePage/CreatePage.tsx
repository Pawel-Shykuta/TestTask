import { useState } from 'react';
import Style from './CreatePageStyle.module.scss';

//Types
import { Question, FormData } from '../../types/Types';

//Components
import Input from '../../components/input/TextInput';
import Button from '../../components/Button/Button';

//UI
import FormHeader from '../../UI/InputForms/FormHeader/FormHeader';
import InputQuestions from '../../UI/InputForms/InputsQuestions/InputQuestions';
import ColtrollersForm from '../../UI/InputForms/Controllers/ControllersForm';




type CreatePageProps = {
  setData: React.Dispatch<React.SetStateAction<FormData[]>>;
};

function CreatePage({setData}: CreatePageProps) {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

 
  function addQuestion() {
    const newQuestion: Question = {
      id: Date.now(),
      text: '',
      type: 'text',
      options: [],
      required: false,
    };
    setQuestions(prev => [...prev, newQuestion]);
  }

 
  function updateQuestion(id: number, field: keyof Question, value: any) {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, [field]: value } : q))
    );
  }

  function Save(){
    if(!formTitle.trim()){
      alert('Введіть назву форми!')
      return
    }

    if(questions.length === 0){
      alert("Додайте хоча б одне запитання!")
      return
    }

    for(let q of questions){
      if(!q.text.trim()){
        alert("Усі запитання повинні мати текст!")
        return
      }

      if((q.type ==='radio'|| q.type ==='checkbox') && q.options.length === 0){
        alert("Питання з типом варіантів повинні мати хоча б один варіант!")
        return
      }
    }

    const data: FormData = {
      id: Date.now(),
      nameForm: formTitle,
      descriptionForm: formDescription,
      questionsForm: questions
    };

    setData(prev => [data , ...prev]);

    setQuestions([])
    setFormDescription('')
    setFormTitle('')
    alert('Форма збережена!')
  }

 

  return (
    <section className={Style.CreatePageWrapper}>
      <FormHeader formTitle={formTitle}  setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription}/>
        <div className={Style.Questions}> 
          {questions.map(q => (
            <div key={q.id} className={Style.QuestionBlock}>  

              <Input
                    type="text"
                    placeholder="Запитання"
                    value={q.text}
                    onChange={(val: string | boolean) =>
                      updateQuestion(q.id, 'text', String(val))
                    }
              />

              <select
                  value={q.type}
                  onChange={e =>
                      updateQuestion(q.id, 'type', e.target.value as Question['type'])
                  }
                >
                  <option value="text">Текст</option>
                  <option value="radio">Один варіант</option>
                  <option value="checkbox">Декілька варіантів</option>
              </select>
                        
              <InputQuestions q={q} updateQuestion={updateQuestion}/>
              <ColtrollersForm updateQuestion={updateQuestion} setQuestions={setQuestions} q={q}/>
                    
            </div>
          ))}

          <Button
            onClick={addQuestion}
            className={Style.addQuestionBtn}
            text="Додати запитання"
          />

        </div>

        <Button
          onClick={Save}
          className={Style.saveQuestions}
          text="Зберегти"
        />

    </section>
  );
}

export default CreatePage;
