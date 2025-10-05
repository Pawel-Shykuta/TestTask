import Style from './InputQuestionsStyle.module.scss'

import Input from '../../../components/input/TextInput'
import Button from '../../../components/Button/Button'
import { Question } from '../../../types/Types'


interface InputQuestionsProps {
  q: Question;
  updateQuestion: (id: number, field: keyof Question, value: any) => void;
}

const InputQuestions:React.FC<InputQuestionsProps> = ({q, updateQuestion}) =>{

    function OptionalChange(index:number, value:string){
        const newOptions = [...q.options]
        newOptions[index] = value
        updateQuestion(q.id, 'options', newOptions)
    }

    function CorrectRadio(index:number){
        updateQuestion(q.id, 'correctOption', index)
    }

    function CorrectCheckBox(index:number){
        let newCorrect = q.correctOptions ? [...q.correctOptions] : []
        if(newCorrect.includes(index)){
            newCorrect = newCorrect.filter(idx => idx !== index)
        }else{
            newCorrect.push(index)
        }
        updateQuestion(q.id, 'correctOptions', newCorrect)
    }

    function DellWariant(index:number){
        const newOptions = [...q.options]
        newOptions.splice(index, 1)
        updateQuestion(q.id, 'options', newOptions)
    }

    return(           
            <div className={Style.OptionsWrapper}>                    
                {q.options.map((opt, i) => (
                        <div className={Style.OptionsCon} key={i} >  
                            <div className={Style.wariantsCon}>                 
                                <Input
                                    type="text"
                                    placeholder={`Варіант ${i + 1}`}
                                    value={opt}
                                    onChange={(val) => OptionalChange(i, val)}
                                    label={q.type === 'text'? 'Правильна відповідь' : ''}
                                    className={Style.inputCorrect}
                                />
                                    
                                {q.type === 'radio' && (
                                    <Input
                                        label='Правильна відповідь'
                                        type="radio"
                                        name={`correct-${q.id}`}
                                        className={Style.correct}
                                        checked={q.correctOption === i}                                            
                                        onChange={() => CorrectRadio(i)}
                                    />                                        
                                )}

                                {q.type === 'checkbox' && (
                                    <Input
                                        type="checkbox"
                                        label='Правильна відповідь'
                                        checked={q.correctOptions?.includes(i)}
                                        className={Style.correct}
                                        onChange={() => CorrectCheckBox(i)}
                                    />
                                )}
                            </div>        
                                                            
                            <Button
                                className={Style.DellWariant}
                                onClick={() => DellWariant(i)}
                            />
                        </div>
                    ))}
                       
                    {q.type !== 'text' && (
                        <Button
                            text="Додати варіант"
                            className={Style.addWariants}
                            onClick={() =>
                                updateQuestion(q.id, 'options', [...q.options, ''])
                            }
                        />
                    )}                
            </div>
    )
}

export default InputQuestions