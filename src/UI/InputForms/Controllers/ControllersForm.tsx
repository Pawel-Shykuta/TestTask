
import Style from './ControllertStyle.module.scss'

import Input from "../../../components/input/TextInput"
import Button from "../../../components/Button/Button"

import { Question } from '../../../types/Types'

interface ControllersFormProps {
  q: Question;
  updateQuestion: (id: number, field: keyof Question, value: any) => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}


const ColtrollersForm: React.FC<ControllersFormProps> = ({updateQuestion, q, setQuestions}) =>{

    return(
        <div className={Style.controllers}>
                 <label>
                    <Input
                        type="checkbox"
                         checked={q.required}
                        label='Обов язковий'
                        className={Style.mandatory}
                        onChange={(val: string | boolean) =>
                            updateQuestion(q.id, 'required', Boolean(val))
                        }                    
                    />
                </label>

                <Button
                    text='Dell'
                    className={Style.DellCartBtn}
                    onClick={() => setQuestions(prev => prev.filter(el => el.id !== q.id))}
                />
            </div> 
    )
}

export default ColtrollersForm
