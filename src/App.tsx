import * as React from 'react';
import { getPopulationData, getPrefectureCodes } from './api/requestResas';
import { CheckboxComponent } from './components/CheckboxComponent';
import { GraphComponent } from './components/GraphComponent';
import { prefectureList, data } from './types/types';

export const App = () => {
    const [prefectureCodes, setPrefectureCodes] =
        React.useState<prefectureList>([]);
    const [data, setData] = React.useState<data>([]);
    const [displayData, setDisplayData] = React.useState([]);
    const [checkbox, setCheckbox] = React.useState<number[]>([]);

    const setPopulationData = async (idx: number) => {
        const a = await getPopulationData(idx, prefectureCodes);
        await setData([
            ...data,
            {
                label: a.label,
                data: a.data,
                fill: true,
                backgroundColor: a.backgroundColor,
                borderColor: a.borderColor,
            },
        ]);
    };

    const getLabel = (num: number) => {
        const label = prefectureCodes.map((prefNum) => {
            if (prefNum.prefCode === num) {
                return prefNum.prefName;
            } else {
                return '';
            }
        });
        //都道府県labelは1つしかないのでlabel[num-1]を返す。
        //ex. 北海道の場合、["北海道","",""...]のようになっている。
        return label[num - 1];
    };

    const setCheckPopulationData = (number: number) => {
        //都道府県コードに対応する都道府県を取得
        const label: string = getLabel(number);
        let isThereLabel = false;

        //もしlabelが存在する場合、fill(表示するかどうか)にtrueをチェック
        setData((data) =>
            data.map((item) =>
                item.label === label ? { ...item, fill: true } : item
            )
        );

        //すでにデータを取得済みの場合、isThereLabelをtrueにして、Apiでもう一度取得しない
        data.map((item) => {
            if (item.label === label) {
                isThereLabel = true;
            }
        });

        //チェックボックスにチェックが入っており、まだ取得していない場合はApiで取得
        if (!isThereLabel) {
            setPopulationData(number);
        }
    };
    React.useEffect(() => {
        getPrefectureCodes(setPrefectureCodes);
    }, [0]);
    return (
        <>
            <h2>人口推移グラフ</h2>
            <CheckboxComponent
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                prefectureCode={prefectureCodes}
                setPrefectureCode={setPrefectureCodes}
                displayData={displayData}
                setDisplayData={setDisplayData}
                data={data}
                setData={setData}
                setCheckPopulationData={setCheckPopulationData}
                getLabel={getLabel}
            />
            <GraphComponent
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                prefectureCode={prefectureCodes}
                setPrefectureCode={setPrefectureCodes}
                displayData={displayData}
                setDisplayData={setDisplayData}
                data={data}
                setData={setData}
            />
        </>
    );
};
