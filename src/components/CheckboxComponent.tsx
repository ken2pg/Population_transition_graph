import * as React from 'react';
import { prefectureListType, dataType } from '../types/types';
import '../css/style.css';

interface Props {
    checkbox: number[];
    setCheckbox: (setCheckbox: number[]) => void;
    prefectureCode: prefectureListType;
    data: dataType;
    setData: (setData: dataType) => void;
    checkIncludePopulationData: (number: number) => void;
    getLabel: (num: number) => string;
}
// eslint-disable-next-line
export const CheckboxComponent: React.FC<Props> = ({
    checkbox,
    setCheckbox,
    prefectureCode,
    data,
    setData,
    checkIncludePopulationData,
    getLabel,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // チェックボックスの数字がすでにリストに含まれる場合、チェックを外す(リストから除外する)
        // またdataから外した都道府県のグラフを表示させないようにするためisDisplayをfalseに変更
        if (checkbox.includes(Number(e.target.value))) {
            setCheckbox(
                checkbox.filter((item) => item !== Number(e.target.value))
            );
            setData(
                data.map((dataItem) =>
                    dataItem.label === getLabel(Number(e.target.value))
                        ? { ...dataItem, isDisplay: false }
                        : dataItem
                )
            );

            // チェックボックスstateに追加し人口推移データが含まれているかの判断を行う
        } else {
            setCheckbox([...checkbox, Number(e.target.value)]);
            checkIncludePopulationData(Number(e.target.value));
        }
    };

    return (
        <div className="CheckboxComponent_div">
            {prefectureCode.map((p, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="Checkbox_div">
                    <input
                        type="checkbox"
                        value={p.prefCode}
                        onChange={handleChange}
                        checked={checkbox.includes(p.prefCode)}
                    />

                    {/* チェックボックスを整えるための処理、3文字の場合空白1つ含める */}
                    {/* eslint-disable-next-line no-irregular-whitespace */}
                    {p.prefName.length === 3 && `${p.prefName}　`}
                    {p.prefName.length === 4 && p.prefName}
                </div>
            ))}
        </div>
    );
};
