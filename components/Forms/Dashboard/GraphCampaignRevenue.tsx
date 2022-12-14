import React, {
  useState, useEffect, useContext, Component,
} from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import styles from 'styles/Analytics.module.scss';
import useUtilityFunction from 'hooks/useUtilityFunction';
import { useQuery } from '@apollo/client';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { GET_GRAPH_REVENUE_BY_CAMPAIGN, GET_GRAPH_REVENUE_BY_DATE } from 'store/store.graphql';

interface GraphRevenueProp{
  startFrom: any;
  toDate: any;
  dataFilter:any;
  campaignFilter:any;
  currencyCode: any;
  campaignId: any;
  storeId:any;

}

export default function GraphCampaignRevenue({
  startFrom, toDate, campaignId, currencyCode, dataFilter, campaignFilter, storeId,
}
  : GraphRevenueProp) {
  const defaultgraphlabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const defaultGraphValue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [graphlabel, setGraphlabel] = React.useState(defaultgraphlabel);
  const [graphValue, setGraphValue] = React.useState(defaultGraphValue);
  const {
    graphFormatNumber, formatNumber, getDatesBetween,
    getMonthsBetween, getYearsBetween,
  } = useUtilityFunction();

  const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
  });

  const {
    data: graphRevenueRange, refetch,
  } = useQuery(GET_GRAPH_REVENUE_BY_DATE, {
    variables: {
      storeId,
      startDate: startFrom,
      endDate: toDate,
    },
    skip: dataFilter,
  });

  useEffect(() => {
    if (graphRevenueRange) {
      const date1 = new Date(startFrom);
      const date2 = new Date(toDate);
      const timeDiff = date2.getTime() - date1.getTime();
      // To calculate the no. of days between two dates
      const numDays = timeDiff / (1000 * 3600 * 24) + 1;
      let graphView = 'Month';
      if (numDays <= 31) {
        graphView = 'Day';
      }
      if (numDays > 365) {
        graphView = 'Year';
      }
      if (graphView === 'Day') {
        const dates = getDatesBetween(date1, date2);
        setGraphlabel(dates);
        setGraphValue([]);
        dates.forEach((rdates:string) => {
          const cdates = rdates.split('-');
          // eslint-disable-next-line max-len, no-underscore-dangle
          const dateresult = graphRevenueRange.getGraphRevenueByDate.find((data:any) => data._id.day === +cdates[1] && data._id.month === +cdates[0]);
          if (typeof dateresult === 'undefined') {
            setGraphValue((current) => [...current, 0]);
          } else {
            setGraphValue((current) => [...current, dateresult.revenue]);
          }
        });
      }
      if (graphView === 'Month') {
        const months = getMonthsBetween(date1, date2);
        setGraphlabel(months);
        setGraphValue([]);
        months.forEach((rdates:string) => {
          const cdates = rdates.split('-');
          // eslint-disable-next-line max-len, no-underscore-dangle
          const dateresult = graphRevenueRange.getGraphRevenueByDate.find((data:any) => data._id.year === +cdates[0] && data._id.month === +cdates[1]);
          if (typeof dateresult === 'undefined') {
            setGraphValue((current) => [...current, 0]);
          } else {
            setGraphValue((current) => [...current, dateresult.revenue]);
          }
        });
      }
      if (graphView === 'Year') {
        const years = getYearsBetween(date1, date2);
        setGraphlabel(years);
        setGraphValue([]);
        years.forEach((ryear:number) => {
          // eslint-disable-next-line max-len, no-underscore-dangle
          const dateresult = graphRevenueRange.getGraphRevenueByDate.find((data:any) => data._id.year === +ryear);
          if (typeof dateresult === 'undefined') {
            setGraphValue((current) => [...current, 0]);
          } else {
            setGraphValue((current) => [...current, dateresult.revenue]);
          }
        });
      }
    }
  }, [graphRevenueRange]);

  const {
    data: graphRevenue, refetch: refetchCampaignRevenue,
  } = useQuery(GET_GRAPH_REVENUE_BY_CAMPAIGN, {
    variables: { storeId, campaignId }, skip: campaignFilter, fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (graphRevenue?.getGraphRevenueByCampaign.length) {
      setGraphlabel(defaultgraphlabel);
      setGraphValue(defaultGraphValue);
      const newTodos = [...graphValue];
      setTimeout(() => {
        graphRevenue?.getGraphRevenueByCampaign.forEach((item: any) => {
          const rev = item.revenue;
          // eslint-disable-next-line no-underscore-dangle
          const dataMonth = item._id.month - 1;
          newTodos[dataMonth] = rev;
          setGraphValue(newTodos);
        });
      }, 1000);
    } else {
      setGraphlabel(defaultgraphlabel);
      setGraphValue(defaultGraphValue);
    }
  }, [graphRevenue]);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (`0${currentDate.getMonth() + 1}`).slice(-2);
  const day = (`0${currentDate.getDate()}`).slice(-2);
  const dMonth = defaultgraphlabel[currentDate.getMonth()];
  const dMonthDate = `${month}${'-'}${day}`;
  const dYearMonth = `${year}${'-'}${month}`;
  const options = {
    options: {
      chart: {
        id: 'basic-bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
          color: '#FEB019',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
        formatter(val:any) {
          return `${currencyCode}${graphFormatNumber(val)}`;
        },
        colors: ['#304758'],
      },
      yaxis: {
        labels: {
          show: false,
          formatter(val:number) {
            return `${currencyCode}${formatNumber(val)}`;
          },
        },
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: graphlabel,
      },
      states: {
        hover: {
          filter: {
            type: 'none',
            value: 0,
          },
        },
      },
      colors: [
        // @ts-ignore
        function ({ seriesIndex, w }) {
          const icategories = w.config.xaxis.categories;
          if (icategories[seriesIndex] === `${dMonth}` || icategories[seriesIndex] === `${dMonthDate}` || icategories[seriesIndex] === `${dYearMonth}` || icategories[seriesIndex] === `${year}`) {
            return '#D5FA52';
          }

          return '#F1F1F1';
        },

      ],
    },
    series: [
      {
        name: 'Revenue',
        data: graphValue,
      },
    ],
  };

  return (
    <div className={styles.coreMetrics}>
      <div className={styles.coreMetrics__header}>
        <h3>Total Revenue</h3>
      </div>
      <Row>
        <Col lg={12} className={styles.coreMetrics__summary_box}>
          <div className="mixed-chart">
            {typeof window !== 'undefined' && (

              <Chart
                options={options.options}
                series={options.series}
                type="bar"
                width="100%"
              />
            )}
          </div>
        </Col>
      </Row>

    </div>

  );
}
