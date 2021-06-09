import * as React from 'react';
import { getPopulationData, getPrefectureCodes } from './api/requestResas';
import { CheckboxComponent } from './components/CheckboxComponent';
import GraphComponent from './components/GraphComponent';
import { prefectureListType, dataType } from './types/types';
import './css/style.css';

const App: React.FC = () => {
    const [prefectureCodes, setPrefectureCodes] =
        React.useState<prefectureListType>([]);
    const [data, setData] = React.useState<dataType>([]);
    const [checkbox, setCheckbox] = React.useState<number[]>([]);

    const setPopulationData = async (idx: number) => {
        const a = await getPopulationData(idx, prefectureCodes);
        await setData([
            ...data,
            {
                label: a.label,
                data: a.data,
                isDisplay: a.isDisplay,
                backgroundColor: a.backgroundColor,
                borderColor: a.borderColor,
            },
        ]);
    };

    const getLabel = (num: number) => {
        const label = prefectureCodes.map((prefNum) => {
            if (prefNum.prefCode === num) {
                return prefNum.prefName;
            }
            return '';
        });
        // 都道府県labelは1つしかないのでlabel[num-1]を返す。
        // ex. 北海道の場合、["北海道","",""...]のようになっている。
        return label[num - 1];
    };

    const checkIncludePopulationData = (number: number) => {
        // 都道府県コードに対応する都道府県を取得
        const label: string = getLabel(number);
        let isThereLabel = false;

        // もしlabelが存在する場合、isDisplay(表示するかどうか)にtrueをチェック
        setData((dataItem) =>
            dataItem.map((item) =>
                item.label === label ? { ...item, isDisplay: true } : item
            )
        );

        // すでにデータを取得済みの場合、isThereLabelをtrueにして、Apiでもう一度取得しない
        data.map((item) => {
            if (item.label === label) {
                isThereLabel = true;
            }
            return true;
        });

        // チェックボックスにチェックが入っており、まだ取得していない場合はApiで取得
        if (!isThereLabel) {
            setPopulationData(number);
        }
    };

    React.useEffect(() => {
        getPrefectureCodes(setPrefectureCodes);
    }, []);

    return (
        <div className="App_div">
            <h2 className="App_h2">人口推移グラフ</h2>
            <CheckboxComponent
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                prefectureCode={prefectureCodes}
                data={data}
                setData={setData}
                checkIncludePopulationData={checkIncludePopulationData}
                getLabel={getLabel}
            />
            <GraphComponent data={data} />
        </div>
    );
};

export default App;
