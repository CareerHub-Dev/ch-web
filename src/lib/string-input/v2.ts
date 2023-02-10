type StringInput = Inputs.StringInput;

export function getStringInput(
  val?: string | Pick<StringInput, 'value' | 'wasChanged'>
): StringInput {
  let value = '';
  if (typeof val === 'string') {
    value = val;
  } else if (val && 'value' in val) {
    value = val.value;
  }

  let wasChanged = false;
  if (val && typeof val === 'object' && 'wasChanged' in val) {
    wasChanged = val.wasChanged;
  }

  let wasBlurred = wasChanged ? true : false;

  return {
    value,
    wasChanged,
    wasBlurred,
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
    wasChanged: true,
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
