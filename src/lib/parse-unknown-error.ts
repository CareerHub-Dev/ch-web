export default function parseUnknownError(error: unknown): string {
  let msg = 'Невідома помилка при виконанні запиту';
  if (typeof error === 'string') {
    msg = error;
  } else if (error instanceof Error) {
    msg = error.message;
  }
  return msg;
}
