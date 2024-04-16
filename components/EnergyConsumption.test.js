import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

import { EnergyConsumption } from "./EnergyConsumption";
import mockReadings from "../__mocks__/mockreadings.json";
import mockGroupedByDay from "../__mocks__/mockGroupedByDay.json";
import mockSortByTime from "../__mocks__/mockSortByTime.json";
import {renderChart}from "../utils/chart";
import {sortByTime, groupByDay} from "../utils/reading";
import { ENERGY_CONSUMPTION } from "../constants/ApplicationConsants";

jest.mock("../utils/chart.js");
jest.mock("../utils/reading");

describe("EnergyConsumption component", () => {
  const mockContainerId = "test-usageChart-1";

  beforeEach(() => {
    renderChart.mockClear();
    sortByTime.mockResolvedValue(mockSortByTime);
    groupByDay.mockReturnValue(mockGroupedByDay);
  });

  it("should renders EnergyConsumption component", async () => {
    render(
      <EnergyConsumption
        readings={mockReadings}
        containerId={mockContainerId}
      />
    );

    await new Promise((resolve) => setTimeout(resolve));

    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(ENERGY_CONSUMPTION);
  });
  it("renders EnergyConsumption component with chart data", async () => {
    render(
      <EnergyConsumption
        readings={mockReadings}
        containerId={mockContainerId}
      />
    );

    await new Promise((resolve) => setTimeout(resolve));

    expect(sortByTime).toHaveBeenCalledWith(expect.any(Array));
    expect(groupByDay).toHaveBeenCalledWith(expect.any(Array));
    expect(renderChart).toHaveBeenCalledWith(
      mockContainerId,
      expect.any(Array)
    );
  });
});
