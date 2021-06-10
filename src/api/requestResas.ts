import { prefectureListType } from '../types/types';

const requestURL =
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=';
const headerRequest: string = process.env.HEADERREQUEST;
const hslColorList: { h: number; s: number; l: number }[] = [];

// hslカラーリストを作成する,48の異なる色になるようにhslのカラーリストが含まれる
for (let i = 0; i < 24; i += 1) {
    hslColorList.push({ h: (i / 24) * 360, s: 80, l: 60 });
}

for (let i = 0; i < 24; i += 1) {
    hslColorList.push({ h: (i / 24) * 360, s: 80, l: 70 });
}

// 都道府県コードを取得し返す関数
export const getPrefectureCodes: (
    setPrefectureCodes: React.Dispatch<React.SetStateAction<prefectureListType>>
) => Promise<void> = async (
    setPrefectureCodes: React.Dispatch<React.SetStateAction<prefectureListType>>
) => {
    try {
        const res = await fetch(
            'https://opendata.resas-portal.go.jp/api/v1/prefectures',
            {
                headers: {
                    'X-API-KEY': headerRequest,
                },
            }
        ).catch((err) => {
            throw new Error(err.message);
        });
        const json = await res.json();
        await setPrefectureCodes(json.result);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
    }
};

export const getPopulationData: (
    prefCode: number,
    prefectureList: prefectureListType
) => Promise<{
    label: string;
    data: number[];
    isDisplay: boolean;
    backgroundColor: string;
    borderColor: string;
}> = async (prefCode: number, prefectureList: prefectureListType) => {
    const value: number[] = [];
    try {
        const res = await fetch(requestURL + prefCode.toString(), {
            headers: {
                'X-API-KEY': headerRequest,
            },
        });
        const json = await res.json().catch((err) => {
            throw new Error(err.message);
        });
        // jsonファイルの年毎のvalue(人数)を取り出しtempリストに格納する。
        const temp: { year: number; value: number }[] = await json.result
            .data[0].data;
        // valueに対して1万で割り万単位でグラフを表示させる
        await temp.map((ls) => {
            const tempValuels = ls.value / 10000;
            value.push(tempValuels);
            return true;
        });
        // 都道府県コード、人口数、チェックボックスにチェックが入っているか、背景カラー、
        // ボーダーカラーの情報が含まれたオブジェクトを生成し返す
        const prefData = await {
            label: prefectureList[prefCode - 1].prefName,
            data: value,
            isDisplay: true,
            backgroundColor: `hsl(${hslColorList[prefCode - 1].h}, ${
                hslColorList[prefCode - 1].s
            }%, ${hslColorList[prefCode - 1].l}%)`,
            borderColor: `hsl(${hslColorList[prefCode - 1].h}, ${
                hslColorList[prefCode - 1].s
            }%, ${hslColorList[prefCode - 1].l}%)`,
        };
        // eslint-disable-next-line no-console
        console.log('success');
        return await prefData;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return {
            label: '',
            data: [],
            isDisplay: false,
            backgroundColor: '',
            borderColor: '',
        };
    }
};
