import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

import data from "./mock.json";

class Kandarea extends React.Component {
  render() {
    const { DataView } = DataSet;
    const cols = {
      date: {
        type: "time",
        nice: false,
        mask: "MM-DD",
        tickCount: 10
      },
      range: {
        min: 20,
        max: 35,
        nice: false,
        tickInterval: 2
      },
      mean: {
        min: 20,
        max: 35,
        nice: false
      },
      stockRange: {
        min: 20,
        max: 35,
        nice: false
      }
    };
    const dv = new DataView();
    dv.source(data).transform({
      type: "map",
      callback: obj => {
        obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
        return obj;
      }
    });
    return (
      <div>
        <Chart height={window.innerHeight} data={dv} scale={cols} forceFit>
          <Axis name="mean" visible={false} />
          <Legend />
          <Axis name="stockRange" visible={false} />
          <Tooltip
            showTitle={false}
            itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/><span style=&quot;padding-left: 16px&quot;>开盘价：{start}</span><br/><span style=&quot;padding-left: 16px&quot;>收盘价：{end}</span><br/><span style=&quot;padding-left: 16px&quot;>最高价：{max}</span><br/><span style=&quot;padding-left: 16px&quot;>最低价：{min}</span><br/><span style=&quot;padding-left: 16px&quot;>成交量：{volumn}</span><br/></li>"
          />
          <Geom type="area" position="date*range" color="#64b5f6" />
          <Geom
            type="schema"
            position="date*stockRange"
            color={[
              "trend",
              val => {
                if (val === "up") {
                  return "#f04864";
                }

                if (val === "down") {
                  return "#2fc25b";
                }
              }
            ]}
            tooltip="start*end*highest*lowest"
            shape="candle"
          />
          <Geom type="line" position="date*mean" color="#FACC14" />
        </Chart>
      </div>
    );
  }
}

export default Kandarea;
