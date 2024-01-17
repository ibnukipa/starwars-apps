import {useReducer, Reducer, useCallback} from 'react';

const useForm = <S, A>(
  reducer: Reducer<S, {type: A; value: string}>,
  initialState: S,
): [S, (formKey: A) => (value: string) => void] => {
  const [formState, formDispatch] = useReducer(reducer, initialState);
  const setFormValue = useCallback(
    (formKey: A) => (value: string) => {
      formDispatch({type: formKey, value});
    },
    [],
  );
  return [formState, setFormValue];
};

export default useForm;
