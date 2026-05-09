import { createContext, useContext, useReducer, useCallback } from 'react';
import { createBlankReport } from '../data/defaultReport';
import { storageService } from '../services/storageService';

const ReportContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD':            return action.payload;
    case 'RESET':           return createBlankReport();
    case 'UPDATE_FIELD': {
      const keys = action.path.split('.');
      const next = structuredClone(state);
      let target = next;
      for (let i = 0; i < keys.length - 1; i++) target = target[keys[i]];
      target[keys[keys.length - 1]] = action.value;
      return next;
    }
    case 'ADD_PHOTO': {
      const next = structuredClone(state);
      next.photos[action.category] = [...next.photos[action.category], action.photo];
      return next;
    }
    case 'UPDATE_PHOTO_CAPTION': {
      const next = structuredClone(state);
      const arr = next.photos[action.category];
      const idx = arr.findIndex(p => p.id === action.photoId);
      if (idx >= 0) arr[idx] = { ...arr[idx], caption: action.caption };
      return next;
    }
    case 'REMOVE_PHOTO': {
      const next = structuredClone(state);
      next.photos[action.category] = next.photos[action.category]
        .filter(p => p.id !== action.photoId);
      return next;
    }
    case 'ADD_TEST_SQUARE': {
      const next = structuredClone(state);
      next.damage.hail.testSquares.push({
        slope: 'front', hits: 0, hitSize: '1/2"', notes: '',
      });
      return next;
    }
    case 'UPDATE_TEST_SQUARE': {
      const next = structuredClone(state);
      next.damage.hail.testSquares[action.index] = {
        ...next.damage.hail.testSquares[action.index],
        [action.field]: action.value,
      };
      return next;
    }
    case 'REMOVE_TEST_SQUARE': {
      const next = structuredClone(state);
      next.damage.hail.testSquares.splice(action.index, 1);
      return next;
    }
    default: return state;
  }
}

export function ReportProvider({ children, initialReport }) {
  const [report, dispatch] = useReducer(reducer, initialReport || createBlankReport());

  const save = useCallback(async () => {
    return storageService.saveReport(report);
  }, [report]);

  return (
    <ReportContext.Provider value={{ report, dispatch, save }}>
      {children}
    </ReportContext.Provider>
  );
}

export const useReport = () => {
  const ctx = useContext(ReportContext);
  if (!ctx) throw new Error('useReport must be used inside ReportProvider');
  return ctx;
};
