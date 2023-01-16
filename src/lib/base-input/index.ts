type BaseInput = Inputs.BaseInput;

export function validateInput<TInput extends BaseInput, TValue>({
  getValidatedValue,
  input,
  validators,
}: {
  getValidatedValue: (input: TInput) => TValue;
  input: TInput;
  validators: Array<Inputs.Validator<TValue>>;
}) {
  const validatedValue = getValidatedValue(input);

  for (const validator of validators) {
    const result = validator(validatedValue);
    if (result.type === 'success') continue;

    const arrayToAppend =
      result.type === 'warning' ? input.warnings : input.errors;
    arrayToAppend.push(result.message);
  }
}
