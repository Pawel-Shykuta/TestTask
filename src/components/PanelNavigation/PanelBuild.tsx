import { useState } from "react";
import Style from "./PanelNav.module.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";



function PanelBuild() {
  const navigate = useNavigate()

  const [open, setOpen] = useState<boolean>(true);

  return (
    <aside className={Style.wrapper}>
      
      <Button
        text={open ? "Закрити" : "Відкрити"}
        className={Style.OpenButton}
        onClick={() => setOpen((prev) => !prev)}
      />

      
      <nav className={`${Style.container} ${!open ? Style.closed : ""}`}>
          <ul>
              <li onClick={() => navigate('/')} >Додому</li>
              <li onClick={() => navigate('/CreatePage')} >Створити новий тест</li>
              <li onClick={() => navigate('/ChooseTest')} >Пройти тест</li>
              <li onClick={() => navigate('/LoockAnswers')} >Переглягути відповіді</li>
          </ul>
        </nav>

    </aside>
  );
}

export default PanelBuild;
