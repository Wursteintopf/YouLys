export interface Result {
  amount: number
  meanSuccessFactor?: number
}

export interface FaceSuccessResultsInterface {
  existence: {
    yes: Result
    no: Result
  }
  amount: {
    one: Result
    two: Result
    more: Result
  }
  expression: {
    angry: Result
    sad: Result
    surprised: Result
    happy: Result
    neutral: Result
  }
  gender: {
    male: Result
    female: Result
  }
  size: {
    small: Result
    big: Result
  }
}

export interface TitleSuccessResultsInterface {
  uppercase: {
    yes: Result
    no: Result
  }
  punctuation: {
    yes: Result
    no: Result
  }
  emoji: {
    yes: Result
    no: Result
  }
}

export interface SuccessResultsInterface {
  amountOfVideosAnalyzed: number
  faces: FaceSuccessResultsInterface
  title: TitleSuccessResultsInterface
}

export const EMPTY_RESULT: Result = {
  amount: 0,
  meanSuccessFactor: undefined,
}

export const EMPTY_SUCCESS_RESULT: SuccessResultsInterface = {
  amountOfVideosAnalyzed: 0,
  faces: {
    existence: {
      no: EMPTY_RESULT,
      yes: EMPTY_RESULT,
    },
    amount: {
      one: EMPTY_RESULT,
      two: EMPTY_RESULT,
      more: EMPTY_RESULT,
    },
    expression: {
      angry: EMPTY_RESULT,
      happy: EMPTY_RESULT,
      neutral: EMPTY_RESULT,
      sad: EMPTY_RESULT,
      surprised: EMPTY_RESULT,
    },
    gender: {
      female: EMPTY_RESULT,
      male: EMPTY_RESULT,
    },
    size: {
      big: EMPTY_RESULT,
      small: EMPTY_RESULT,
    },
  },
  title: {
    uppercase: {
      yes: EMPTY_RESULT,
      no: EMPTY_RESULT,
    },
    punctuation: {
      yes: EMPTY_RESULT,
      no: EMPTY_RESULT,
    },
    emoji: {
      yes: EMPTY_RESULT,
      no: EMPTY_RESULT,
    },
  },
}
