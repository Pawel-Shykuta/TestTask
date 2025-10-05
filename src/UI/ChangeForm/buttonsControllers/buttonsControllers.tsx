import Style from './buttonsControllersStyle.module.scss'
import Button from "../../../components/Button/Button"

import { Question,FormData } from '../../../types/Types'

interface buttonsControllersProps{
    el:Question
    setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const buttonsControllers:React.FC<buttonsControllersProps> = ({setFormData, el}) =>{

  function DellQuestion(id:number){
    setFormData(prev => prev? {...prev, questionsForm: prev.questionsForm.filter(el => el.id !== id)} : prev)
  }

  function updateQuestion(questionId:number, key: keyof Question, value:any){
    setFormData(prev => prev ? {
      ...prev,
        questionsForm: prev.questionsForm.map(q => q.id === questionId ? {...q, [key] : value} : q)
    } : prev)
  }

  return(
        <div className={Style.buttonsControllers}>
          <Button text='Додати відповідь' className={Style.AddAntswer} onClick={() => updateQuestion(el.id, 'options', [...el.options, ''])}/>
          <Button text='Видалити' onClick={() => DellQuestion(el.id)} className={Style.AddAntswer}/>
        </div>
  )
}

export default buttonsControllers
