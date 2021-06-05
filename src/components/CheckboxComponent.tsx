import * as React from 'react';
import { getPopulationData } from 'src/api/requestResas';
import { prefectureList, data } from '../types/types';
import '../css/CheckboxComponent.css';

interface Props {
    checkbox: number[];
    setCheckbox: (setCheckbox: number[]) => void;
    prefectureCode: prefectureList;
    setPrefectureCode: (setPrefectureList: prefectureList) => void;
    displayData: data;
    setDisplayData: (setData: data) => void;
    data: data;
    setData: (setData: data) => void;
}

export const CheckboxComponent: React.FC<Props> = ({
    checkbox,
    setCheckbox,
    prefectureCode,
    setPrefectureCode,
    displayData,
    setDisplayData,
    data,
    setData,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checkbox.includes(Number(e.target.value))) {
            setCheckbox(
                checkbox.filter((item) => item !== Number(e.target.value))
            );
        } else {
            setCheckbox([...checkbox, Number(e.target.value)]);
        }
    };

    return (
        <div>
            {prefectureCode.map((p, i) => {
                return (
                    <div key={i}>
                        <input
                            type="checkbox"
                            value={p.prefCode}
                            onChange={handleChange}
                            checked={checkbox.includes(p.prefCode)}
                        />
                        {p.prefName}
                    </div>
                );
            })}
        </div>
    );
};
