import React from "react";

import "./home.scss";
import Visuals from "../../components/Visuals/Visuals";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
const data=[
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
]

const Home = () => {
  return (
    <div className="home">
      <Visuals data={data}/>
    </div>
  );
};

export default Home;
