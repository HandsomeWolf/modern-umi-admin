import { useECharts } from '@/hooks/useECharts.ts';
import { PieECOption } from '@/utils/echartsConfig.ts';
import { format } from 'echarts/core';
import { CallbackDataParams } from 'echarts/types/dist/shared.d.ts';
import { useEffect } from 'react';

interface BarChartProps {
  // 饼状图系列的数据
  seriesData: BarChartData[];
  // 饼状图中心的标题
  title: string;
  // 饼状图底部的图例
  legendData: string[];
  // 图表高度
  height?: number;
  // tooltip显示的单位，默认：元
  unit?: string;
}

interface BarChartData {
  value: number;
  name: string;
}

const pieColors = [
  '#73DDFF',
  '#73ACFF',
  '#FDD56A',
  '#FDB36A',
  '#FD866A',
  '#9E87FF',
  '#9eea89',
  '#FD6A6A',
  '#75E6DA',
  '#EDD743',
  '#B44657',
  '#C589E8',
  '#44B4B8',
  '#EE6F57',
  '#4D80E4',
  '#E4CF4F',
  '#6C91C2',
  '#C27C0E',
  '#7F6C8F',
  '#9F4500',
  '#1768AC',
  '#18DCFF',
  '#5860E1',
];

export const PieChart = ({
  seriesData,
  title,
  legendData,
  height = 400,
  unit = '元',
}: BarChartProps) => {
  const { chartRef: pieRef, chartInstanceRef: pieChart } = useECharts();

  useEffect(() => {
    pieChart.current?.setOption({
      title: {
        text: title,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 20,
          lineHeight: 26,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: CallbackDataParams) => {
          return `${params.marker} ${params.name}&nbsp;&nbsp;&nbsp;<strong>${format.addCommas(params.value as number)} ${unit}</strong>`;
        },
      },
      legend: {
        orient: 'horizontal',
        icon: 'circle',
        bottom: 20,
        x: 'center',
        data: legendData,
        // textStyle: {
        //   color: '#fff'
        // }
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['40%', '60%'],
          itemStyle: {
            color: function (params) {
              return pieColors[params.dataIndex];
            },
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            rich: {
              hr: {
                backgroundColor: 'inherit',
                borderRadius: 3,
                width: 3,
                height: 3,
                padding: [3, 3, 0, -12],
              },
              a: {
                // 颜色取饼状图当前颜色
                color: 'inherit',
                padding: [-13, 6, -20, 6],
              },
            },
          },
          labelLine: {
            length: 30,
            length2: 30,
            lineStyle: {
              width: 1,
            },
          },
          data: seriesData,
        },
      ],
    } as PieECOption);
  }, [legendData, pieChart, seriesData, title, unit]);

  return <div style={{ height: `${height}px` }} ref={pieRef}></div>;
};
