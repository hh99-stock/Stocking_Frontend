import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';
const Chart = () => {
  // 차트 설정과 데이터를 관리하는 상태
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick', // 캔들 차트 타입 설정
      height: 250, // 차트 높이 설정
    },
    title: {
      text: 'Stock Price', // 차트 제목
      align: 'center',
    },
    xaxis: {
      type: 'datetime', // x축을 날짜로 설정
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'price',
      data: [], // 초기 데이터는 빈 배열로 설정
    },
  ]);

  useEffect(() => {
    const getDailyStockPrices = async () => {
      let results = [];

      try {
        const response = await axios.get('uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice', {
          headers: {
            authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            appkey: process.env.REACT_APP_APPKEY,
            appsecret: process.env.REACT_APP_SECRETKEY,
            tr_id: 'FHKST03010100',
            custtype: 'P',
          },
          params: {
            fid_cond_mrkt_div_code: 'J',
            fid_input_date_1: '20220501',
            fid_input_date_2: '20220530',
            fid_input_iscd: '000120',
            fid_org_adj_prc: '0',
            fid_period_div_code: 'D',
          },
        });

        response.data.output1.forEach((item) => {
          const { date, stck_oprc, stck_hgpr, stck_lwpr, stck_clpr } = item;
          results.push({
            x: new Date(date),
            y: [stck_oprc, stck_hgpr, stck_lwpr, stck_clpr],
          });
        });

        setSeries([{ name: 'stock price', data: results }]);
      } catch (err) {
        console.error(`Error fetching price for stock code '000120':`, err);
      }
    };

    getDailyStockPrices();
  }, []);

  return (
    <div id="chart">
      <ApexCharts
        options={{
          chart: {
            type: 'candlestick',
            height: 350,
          },
          title: {
            text: 'Stock Price',
            align: 'center',
          },
          xaxis: {
            type: 'datetime',
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
        series={series}
        type="candlestick"
        height={550}
      />
    </div>
  );
};
export default Chart;
