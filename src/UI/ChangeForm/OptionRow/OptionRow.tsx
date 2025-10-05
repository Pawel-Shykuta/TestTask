import Style from './OptionRowStyle.module.scss'

//Types
import { Question, FormData} from '../../../types/Types'

//Components
import Input from '../../../components/input/TextInput'
import Button from '../../../components/Button/Button'

interface OptioonRow{
    el:Question
    setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const OptioonRow: React.FC<OptioonRow> = ({el, setFormData}) => {

    function DellOption(questionId: number, optionIndex: number) {
        setFormData(prev =>
            prev ? {
                ...prev,
                questionsForm: prev.questionsForm.map(q =>
                    q.id === questionId
                        ? { ...q, options: q.options.filter((_, i) => i !== optionIndex) }
                    : q
                )
            }
            : prev
        );
    }

    function ChangeAnchwer(index:number, newText:string){
        setFormData(prev => prev ? {
            ...prev,
            questionsForm: prev.questionsForm.map(q => q.id === el.id ? {
                ...q, 
                options: q.options.map((opt, i) => i === index ? newText : opt)
            } : q)
        } : prev)
    }

    function ChangeCorrect(index: number){
        setFormData(prev => prev ? {
            ...prev,
            questionsForm: prev.questionsForm.map(q => q.id === el.id ? 
                { ...q,
                  correctOption: index
                } : q)
        } : prev)
    }



    return(
        <>
            {el.options.map((option, index) => (
                <div key={index} className={Style.OptionRow}>
                    <div className={Style.OptionRow}>
                        <Input
                            type="text"
                            value={option}
                            className={Style.Anchwer}
                            placeholder={`Варіант ${index + 1}`}
                            onChange={(val) => ChangeAnchwer(index, val)}
                        />
                    
                        <Input 
                            type={el.type} 
                            name={`q-${el.id}`}
                            className={Style.Correct} 
                            label='Правильна відповідь' 
                            onChange={() => ChangeCorrect(index)}
                            checked={el.correctOption === index}
                            readOnly
                        />
                    </div>
                    <Button className={Style.DellUnchwer} onClick={() => DellOption(el.id, index)}/>
                </div>
            ))}
        </>      
    )
}   

export default OptioonRow
