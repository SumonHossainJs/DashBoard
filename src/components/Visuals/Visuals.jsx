import React from 'react';
import "./Visuals.scss";
import BarChartBox from "../../components/barChartBox/BarChartBox";
import BigChartBox from "../../components/bigChartBox/BigChartBox";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieCartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";


const Visuals = (props) => {
    const data = props.data;
    console.log(props.order)
  return (
    <div className={` visuals ${props.order && 'visuals2'}`}>
        <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...data[0]} />
      </div>
      <div className="box box3">
        <ChartBox {...data[1]} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      {data[2] &&
      <div className="box box5">
      <ChartBox {...data[2]} />
    </div>
      }
      {data[3] &&
       <div className="box box6">
       <ChartBox {...data[3]} />
     </div>
      }
     
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...data[4]} />
      </div>
      <div className="box box9">
        <BarChartBox {...data[5]} />
      </div>
    </div>
  )
}

export default Visuals