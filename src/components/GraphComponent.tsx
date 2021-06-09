import * as React from 'react';
import { getPopulationData } from 'src/api/requestResas';
import { prefectureList, data } from '../types/types';
import { Line } from 'react-chartjs-2';
import '../css/GraphComponent.css';

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

export const GraphComponent: React.FC<Props> = ({
    checkbox,
    setCheckbox,
    prefectureCode,
    setPrefectureCode,
    displayData,
    setDisplayData,
    data,
    setData,
}) => {
    //表示するデータの取得
    const tempData = data
        .filter((dataItem) => {
            if (dataItem.fill) {
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
        scales: {
            xAxes: [
                {
                    fontSize: 14,
                    scaleLabel: {
                        display: true,
                        labelString: '年度',
                        fontSize: 16,
                    },
                    ticks: {
                        fontSize: 14,
                    },
                },
            ],
            yAxes: [
                {
                    type: 'line',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                    scaleLabel: {
                        display: true,
                        labelString: '万人',
                        fontSize: 16,
                    },
                    ticks: {
                        fontSize: 14,
                    },
                },
            ],
        },
    };

    // console.log(dataSet);

    // const options = {};
    return (
        <div className="GraphComponent_div">
            <Line data={dataSet} options={options} />
        </div>
    );
};
