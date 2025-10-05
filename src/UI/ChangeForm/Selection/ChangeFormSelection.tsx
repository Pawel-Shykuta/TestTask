import Style from './ChangeFormSelection.module.scss'
import { Question, FormData } from '../../../types/Types'

interface ChangeSelectionProps {
  el: Question;
  setFormData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const ChangeSelection: React.FC<ChangeSelectionProps> = ({ el, setFormData }) => {
  function updateQuestion(questionId: number, key: keyof Question, value: any) {
    setFormData(prev =>
      prev
        ? {
            ...prev,
            questionsForm: prev.questionsForm.map(q =>
              q.id === questionId ? { ...q, [key]: value } : q
            )
          }
        : prev
    );
  }

  return (
    <div className={Style.Selected}>
      <select
        value={el.type}
        onChange={e =>
          updateQuestion(el.id, 'type', e.target.value as Question['type'])
        }
      >
        <option value="text">Текст</option>
        <option value="radio">Один варіант</option>
        <option value="checkbox">Декілька варіантів</option>
      </select>
    </div>
  );
}

export default ChangeSelection;
