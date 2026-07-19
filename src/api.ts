export type Shoe = {
  id: string;
  name: string;
}

export type Answer = {
  id?: string; // Only the answers of the first question have an id property.
  copy: string;
  nextQuestion: number | string; // The last question will have an empty string for nextQuestion.
  ratingIncrease: {
    [key: string]: number;
  }
}

export type Question = {
  id: number;
  copy: string;
  answers: Answer[];
}

export type Quiz = {
  shoes: Shoe[];
  questions: Question[];
}
