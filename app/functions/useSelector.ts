import { useSelector as useSelectorBase, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase

export default useSelector;
