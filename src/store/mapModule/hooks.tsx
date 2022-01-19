import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MapModuleState } from '../types';

export const useMapModule = () => {
  const mapModule = useSelector(
    (state: { mapModule: MapModuleState }) => state.mapModule,
  );
  return mapModule;
};
