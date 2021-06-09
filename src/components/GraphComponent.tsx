import * as React from 'react';
import { getPopulationData } from 'src/api/requestResas';
import { prefectureList, data } from '../types/types';
import { Line } from 'react-chartjs-2';
import '../css/style.css';

interface Props {
    data: data;
}

export const GraphComponent: React.FC<Props> = ({ data }) => {
    //表示するデータの取得
    const tempData = data
        .filter((dataItem) => {
            if (dataItem.isDisplay) {
                return dataItem;
            }
        })
        .map((dataItem) => {
            return {
                label: dataItem.label,
                data: dataItem.data,
                fill: false,
                backgroundColor: dataItem.backgroundColor,
                borderColor: dataItem.borderColor,
            };
        });
    const dataSet: {
        labels: number[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            backgroundColor: string;
            borderColor: string;
        }[];
    } = {
        labels: [
            1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010,
            2015, 2020,
        ],
        datasets: tempData,
    };

    //グラフの軸オプション
    const options = {
        responsive: true,

        plugins: {
            title: {
                display: true,
                text: '',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '年度',
                },
            },
            y: {
                min: 0,
                max: 1400,
                title: {
                    display: true,
                    text: '人口数(万人)',
                },
            },
        },
    };
    return (
        <>
            <div className="GraphComponent_div">
                <Line data={dataSet} options={options} height="200" />
            </div>
            <div className="GraphComponent_div_mobile">
                <Line data={dataSet} options={options} height="250" />
            </div>
        </>
    );
};
