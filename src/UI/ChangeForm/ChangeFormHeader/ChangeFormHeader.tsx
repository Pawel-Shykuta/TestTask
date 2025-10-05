
import Style from './ChangeFormHeader.module.scss'

import Input from '../../../components/input/TextInput'

import { FormData } from '../../../types/Types';



interface CahngeFormHeaderProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}



const CahngeFormHEader:React.FC<CahngeFormHeaderProps> = ({formData, setFormData}) => {

    return(
      <div className={Style.FormHeader}>
        <Input
          type="text"
          value={formData.nameForm}
          placeholder="Назва форми"
          className={Style.NameINput}
          onChange={(val) =>
            setFormData(prev => prev ? {...prev, nameForm: String(val)} : prev)
          }
        />

        <Input
          type="text"
          value={formData.descriptionForm}
          placeholder="Опис"
          onChange={(val) =>
            setFormData(prev => prev ? {...prev, descriptionForm: String(val)} : prev)
          }
        />
      </div>
    )
}

export default CahngeFormHEader