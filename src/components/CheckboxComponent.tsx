import * as React from 'react';
import { prefectureList, data } from '../types/types';

interface Props {
    checkbox: number[];
    setCheckbox: (setCheckbox: number[]) => void;
    prefectureCode: prefectureList;
    setPrefectureCode: (setPrefectureList: prefectureList) => void;
    data: data;
    setData: (setData: data) => void;
}

export const CheckboxComponent: React.FC<Props> = ({
    checkbox,
    setCheckbox,
    prefectureCode,
    setPrefectureCode,
    data,
    setData,
}) => {
    return <div></div>;
};
