import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      display: true,
      labels: {
        color: 'black',
        padding: 20,
        pointStyleWidth: 15,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
};

const Portfolio = () => {
  // State for total volume and chart data
  const [totalValue, setTotalValue] = useState('');
  const [chartData, setChartData] = useState({
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
      {
        label: '# of Votes',
        data: [33, 33, 34],
        backgroundColor: ['rgb(255,99,132)', 'rgb(54,162,235)', 'rgb(255,206,86)'],
        borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(255,206,86,1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Fetch data from CoinGecko API
    const fetchPortfolioData = async () => {
      try {
        const apiUrl =
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbitcoin&order=market_cap_desc';

        const labels = [];
        const dataValues = [];

        const response = await fetch(apiUrl);
        const responseData = await response.json();

        // Extract data from API response
        responseData.forEach((element) => {
          console.log(element.market_cap)
          dataValues.push(element.market_cap);
          labels.push(element.name);
        });

        // Update state with fetched data
        setChartData({
          labels: labels,
          datasets: [
            {
              data: dataValues,
              backgroundColor: ['#6c00b6', '#6d47ef', '#ef47bd'],
              borderColor: ['white'],
              borderWidth: 0,
            },
          ],
        });

        // Calculate and set total value
        setTotalValue(dataValues.reduce((partialSum, value) => partialSum + value, 0).toFixed(0));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-100 rounded-lg shadow-xl ml-4">
      <div className="mt-3">
        <span className="text-xl font-semibold pt-6 ml-8">Portfolio</span>
        <span className="text-gray-700 lg:ml-[80px] xl:ml-[120px] text-sm md:ml-[70px] sm:ml-[10px] ml-[50px]">
          Total Value:
        </span>
        <span className="text-xs font-semibold">
          {new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'usd',
          }).format(totalValue)}
        </span>
      </div>
      <div className="xl:w-[240px] xl:-h[180px] md:w-[240px] xl:ml-[100px] md:ml-[170px] h-[230px] -mt-[15px]">
        {/* Render Pie chart with data and options */}
        <Pie data={chartData} options={chartOptions} />
      </div>
      <div className="mt-5"></div>
    </div>
  );
};

export default Portfolio;
