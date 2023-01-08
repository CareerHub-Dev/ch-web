type StringInput = Inputs.StringInput;

export function getStringInput(): StringInput;
export function getStringInput(value: string): StringInput;
export function getStringInput({
  value,
  isTouched,
}: Pick<StringInput, 'value' | 'isTouched'>): StringInput;

export function getStringInput(
  val?: string | Pick<StringInput, 'value' | 'isTouched'>
): StringInput {
  let value = '';
  if (typeof val === 'string') {
    value = val;
  } else if (val && 'value' in val) {
    value = val.value;
  }

  let isTouched = false;
  if (val && typeof val === 'object' && 'isTouched' in val) {
    isTouched = val.isTouched;
  }

  return {
    value,
    isTouched,
    errors: [],
    warnings: [],
  };
}

export function validateStringValue({
  value,
  validators,
}: {
  value: string;
  validators: Array<Inputs.Validator<string>>;
}): StringInput {
  const resultInput = getStringInput({
    value,
    isTouched: true,
  });
  for (const validator of validators) {
    const result = validator(value);

    if (result.type === 'success') continue;
    const arrayToAppend =
      result.type === 'warning' ? resultInput.warnings : resultInput.errors;

    arrayToAppend.push(result.message);
  }
  return resultInput;
}
