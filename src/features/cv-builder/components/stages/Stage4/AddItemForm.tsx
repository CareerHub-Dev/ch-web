import { ArrayInputAction } from '@/lib/array-input/v2'
import { useRef } from 'react'

export default function AddItemForm(props: {
  dispatchFn: (action: ArrayInputAction<string>) => void;
  id: string;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedValue = inputRef.current!.value.trim()
    inputRef.current!.value = trimmedValue
    if (trimmedValue.length > 0) {
      props.dispatchFn({ type: 'add', item: trimmedValue })
      inputRef.current!.value = ''
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='sm:text-sm sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5'
    >
      <label
        htmlFor={props.id}
        className='block sm:text-sm font-medium text-gray-700 mb-1'
      >
        { props.label}
      </label>
      <div className='isolate flex rounded-md shadow-sm'>
        <input
          id={props.id}
          type='text'
          className='w-full border border-gray-300 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm focus:border-blue-500 focus:ring-blue-500 relative rounded-l-md px-4 py-2 text-sm font-medium text-gray-700 focus:z-10'
          ref={inputRef}
          required
        />
        <button
          type='submit'
          className='relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        >
          {'Додати'}
        </button>
      </div>
    </form>
  )
}
