import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import axios from 'axios';

const Chart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'candlestick',
      height: 250,
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
  });

  const [series, setSeries] = useState([{ name: 'price', data: [] }]);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    async function getAccessToken() {
      try {
        const response = await axios.post('apis/oauth2/tokenP', {
          grant_type: 'client_credentials',
          appkey: process.env.REACT_APP_APPKEY,
          secretkey: process.env.REACT_APP_SECRETKEY,
        });
        setAccessToken(response.data.access_token);
      } catch (err) {
        console.log(err);
      }
    }

    getAccessToken();
  }, []);

  useEffect(() => {
    async function getDailyStockPrices() {
      if (!accessToken) return;

      try {
        const response = await axios.get('apis/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice', {
          headers: {
            authorization: `Bearer ${accessToken}`,
            appkey: process.env.REACT_APP_appKey,
            appsecret: process.env.REACT_APP_secretKey,
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

        const newData = response.data.output2.map((item) => ({
          x: item.stck_bsop_date, // 수정 필요: API 응답에 맞는 실제 날짜 데이터 사용
          y: [item.stck_bsop_date, item.stck_oprc, item.stck_hgpr, item.stck_lwpr, item.stck_clpr],
        }));

        setSeries([{ name: 'stock price', data: newData }]);
      } catch (err) {
        console.error(`Error fetching price for stock code '000120':`, err);
      }
    }

    if (accessToken) {
      getDailyStockPrices();
    }
  }, [accessToken]); // accessToken 상태에 의존

  return (
    <div id="chart">
      <ApexCharts options={options} series={series} type="candlestick" height={550} />
    </div>
  );
};

export default Chart;
