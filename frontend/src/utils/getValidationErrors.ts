import { ValidationError } from 'yup';

interface ValidationErrors {
  // the key word in this case does not matter, could be anything
  [key: string]: string;
}
export default function getValidationErrors(
  err: ValidationError,
): ValidationErrors {
  const validationErrors: ValidationErrors = {};
  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}
