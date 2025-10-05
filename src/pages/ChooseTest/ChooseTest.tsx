
import Style from './ChooseTestStyle.module.scss'
import { FormData } from "../../types/Types"
import { useNavigate } from 'react-router-dom';

type ChooseTestProps = {
  data: FormData[];
};

const ChooseTest: React.FC<ChooseTestProps> = ({data}) =>{
    const navigate = useNavigate()    

    return(
        <section className={Style.MainWrapper}>
            {data.map((form:FormData) =>(
                    <div key={form.id} className={Style.FormElement} onClick={() => navigate(`/StartTest/${form.id}`)} >
                        <div className={Style.FormEmmiter}>
                            <h3>{form.nameForm}</h3>
                            <p>{form.descriptionForm}</p>
                            <p>{form.questionsForm?.length ?? 0} Заитань</p>
                            <p>somesing</p>
                            <p>somesing</p>
                            <p>somesing</p>
                            <p>somesing</p>                   
                        </div>
                    </div>
                ))
                
            }
        </section>
    )
}

export default ChooseTest