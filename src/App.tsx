import * as React from 'react';
import { getPopulationData, getPrefectureCodes } from './api/requestResas';
import { CheckboxComponent } from './components/CheckboxComponent';

export const App = () => {
    const [prefectureCodes, setPrefectureCodes] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [checkbox, setCheckbox] = React.useState([]);

    const setPopulationData = async (idx: string) => {
        const a = await getPopulationData(idx + 1);
        await setData([...data, a]);
    };

    React.useEffect(() => {
        setPrefectureCodes([...prefectureCodes, getPrefectureCodes()]);
    }, []);

    return (
        <>
            <CheckboxComponent
                checkbox={checkbox}
                setCheckbox={setCheckbox}
                prefectureCode={prefectureCodes}
                setPrefectureCode={setPrefectureCodes}
                data={data}
                setData={setData}
            />
        </>
    );
};
