import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/context';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
