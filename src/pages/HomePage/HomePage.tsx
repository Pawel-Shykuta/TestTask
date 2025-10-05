import  Style  from "./HomePage.module.scss"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"

import { FormData } from "../../types/Types"

function HomePage({data}: any){
    const navigate = useNavigate()

    return(
        <section className={Style.MainWrapper}>
            {data.map((form:FormData) =>(
                <div key={form.id} className={Style.FormElement} onClick={() => navigate(`/ChangeForm/${form.id}`)} >
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
            <Button className={Style.HomeElement} onClick={() => navigate('/CreatePage')} />
        </section>
    )
}

export default HomePage
