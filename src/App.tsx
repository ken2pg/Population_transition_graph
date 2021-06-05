import * as React from 'react';
import { getPopulationData, getPrefectureCodes } from './api/requestResas';
import { CheckboxComponent } from './components/CheckboxComponent';
import { GraphComponent } from './components/GraphComponent';
import { prefectureList } from './types/types';

export const App = () => {
    const [prefectureCodes, setPrefectureCodes] =
        React.useState<prefectureList>([]);
    const [data, setData] = React.useState([]);
    const [displayData, setDisplayData] = React.useState([]);
    const [checkbox, setCheckbox] = React.useState([]);

    const setPopulationData = async (idx: number) => {
        const a = await getPopulationData(idx + 1);
        await setData([...data, a]);
    };

    React.useEffect(() => {
        getPrefectureCodes(setPrefectureCodes);
    }, [0]);

    return (
        <>
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
            <CheckboxComponent
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
