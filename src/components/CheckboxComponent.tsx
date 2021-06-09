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
    setCheckPopulationData: (number: number) => void;
    getLabel: (num: number) => string;
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
    setCheckPopulationData,
    getLabel,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //チェックボックスの数字がすでにリストに含まれる場合、チェックを外す(リストから除外する)
        //またdataから外した都道府県のグラフを表示させないために、該当のデータを削除
        if (checkbox.includes(Number(e.target.value))) {
            setCheckbox(
                checkbox.filter((item) => item !== Number(e.target.value))
            );
            setData(
                data.map((dataItem) =>
                    dataItem.label === getLabel(Number(e.target.value))
                        ? { ...dataItem, fill: false }
                        : dataItem
                )
            );

            //リストに含まれない場合、リストにチェックボックス番号を渡しgetPopulationData関数を呼び出す。
            //stateの更新よりもcallApiが呼ばれる方が早いため、checkboxの更新前の値と渡されたvalueをcallApiに渡す
        } else {
            setCheckbox([...checkbox, Number(e.target.value)]);
            setCheckPopulationData(Number(e.target.value));
        }
    };

    return (
        <div>
            {prefectureCode.map((p, i) => {
                return (
                    <div key={i} className="Checkbox_div">
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
