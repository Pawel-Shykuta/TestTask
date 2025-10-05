import Input from "../../../components/input/TextInput"
import Style from './FromHeaderStyle.module.scss'

type FormHeaderProps = {
  formTitle: string;
  setFormTitle: (val: string) => void;
  formDescription: string;
  setFormDescription: (val: string) => void;
};


const FormHeader: React.FC<FormHeaderProps> =({formTitle,setFormTitle,formDescription,setFormDescription}) => {

    return(
        <div className={Style.FormHeader}>
            <Input
                type="text"
                placeholder="Нова форма"
                className={Style.FormName}
                value={formTitle}
                onChange={(val: string | boolean) => setFormTitle(String(val))}
            />
            <Input
                type="text"
                placeholder="Опис"
                className={Style.FormDescription}
                value={formDescription}
                onChange={(val: string | boolean) => setFormDescription(String(val))}
            />
      </div>
    )
}

export default FormHeader