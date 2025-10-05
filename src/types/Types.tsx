
//Button
export type ButtonProps ={
    className?: string
    onClick?: () => void
    text?: React.ReactNode; 
    style?:any
}


//Input
export type InputProps = {
  label?: string;
  value?: string;
  onChange: (value: any) => void;
  placeholder?: string;
  type?: "text" | "number" | "email"|'checkbox'|'radio'
  disabled?: boolean;
  className?: string;
  checked?:boolean
  key?:number
  name?:string
  readOnly?:boolean
};


//Questions
export interface Question {
  id: number;
  text: string;
  type: 'text' | 'radio' | 'checkbox';
  options: string[];
  required: boolean;
  correctOption?: number;
  correctOptions?: number[];

  nameForm?:string
  descriptionForm?:string
}

export type FormData = {
  id?: number; 
  nameForm: string;
  descriptionForm: string;
  questionsForm: Question[];
};


//Answers
export type Answer = {
  formName:string;
  questionId: number;
  selectedIndex: number | null;
  correctIndex: number | undefined;
  questionText: string;
  options: string[];
};
