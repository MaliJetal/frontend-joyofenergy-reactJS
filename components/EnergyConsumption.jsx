import React, { useCallback, useEffect } from "react";
import { renderChart } from "../utils/chart.js";
import { groupByDay, sortByTime } from "../utils/reading";
import { ENERGY_CONSUMPTION, ENERGY_CONSUMPTION_BTN } from "../constants/ApplicationConsants.js";

export const EnergyConsumption = ({ readings, containerId }) => {
    const updatedReadings = useCallback(async () => {
    const groupedByDayReadings = await sortByTime(groupByDay(readings));
    console.log("Gj", groupedByDayReadings);
    const slicedReadings = groupedByDayReadings?.slice(-30);
    renderChart(containerId, slicedReadings);
  }, [readings]);

  useEffect(() => {
    updatedReadings();
  }, []);

  return (
    <>
      <h1 className="regular darkgray line-height-1 mb3">{ENERGY_CONSUMPTION}</h1>
      <section className="mb3">
        <button
          className="
              h5
              inline-block
              shadow-2
              pl2
              pr2
              pt1
              pb1
              roundedMore
              border-grey
              bg-blue
              white
              bold
            "
        >
          {ENERGY_CONSUMPTION_BTN}
        </button>
      </section>
      <section className="chartHeight mb3">
        <canvas id={containerId} />
      </section>
    </>
  );
};
