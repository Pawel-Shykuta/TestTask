
import {useState } from "react";
import { Answer } from "../../types/Types";
import Style from "./LoockAnswersStyle.module.scss";

type LoockAnswersProps = {
  answers: Answer[];
};

const LoockAnswers: React.FC<LoockAnswersProps> = ({ answers }) => {

    const [answer] = useState<Answer[]>(() => {
    const data = localStorage.getItem('answers');
    if (data) {
        try {
        return JSON.parse(data) as Answer[];
        } catch {
        console.error("Помилка при зчитуванні даних з localStorage");
        return [];
        }
    }
    return [];
    });



    const formName = answer[0]?.formName || "Тест";
    const correctCount = answer.filter(ans => ans.selectedIndex === ans.correctIndex).length
    const prozent = Math.round((correctCount / answer.length) * 100)



    return (
        <div className={Style.AnswersWrapper}>
            <h1>{formName}</h1>  
                {answer.map((ans, index) => {
                    const isCorrect = ans.selectedIndex === ans.correctIndex;

                        return (
                            <div key={index} className={`${Style.AnswerCard} ${ isCorrect ? Style.CardCorrect : Style.CardIncorrect }`}>
                                <p>{index + 1}. {ans.questionText}</p>
                            
                                <p className={isCorrect ? Style.Correct : Style.Incorrect} >
                                    Ваша відповідь: {ans.selectedIndex !== null ? ans.options[ans.selectedIndex] : '-'}
                                </p>

                                {!isCorrect && ans.correctIndex !== undefined && (
                                    <p className={Style.CorrectAnswer}>
                                        Правильна відповідь: {ans.options[ans.correctIndex]}
                                    </p>
                                )}
                            </div>
                        );
                })}
            <p>
                Результат: {correctCount} із {answer.length} правильних ({prozent}%)
            </p>
        </div>
    );
};

export default LoockAnswers;
