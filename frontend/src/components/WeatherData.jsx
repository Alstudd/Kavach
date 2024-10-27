import React, { useState, useEffect } from "react";
import { AreaChart, Card, DonutChart, BarChart } from "@tremor/react";
import { Filter, Sliders, SortAsc } from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AlertsDashboard from "./AlertsDashboard";

const WeatherData = () => {

  return (
    <div className="md:w-[90%] w-[95%] mx-auto py-3">
      <div className="grid md:grid-cols-4 gap-3">
        <div className="col-span-4">
          <div className="grid md:grid-cols-2 gap-3">
            <Card className="w-full">
              <h3 className="text-center text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Satellite
              </h3>
              <img
                className="mt-4"
                src="https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg"
                alt="map"
              />
            </Card>
            <Card className="w-full">
              <h3 className="text-center text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Radar
              </h3>
              <img
                className="mt-4"
                src="https://mausam.imd.gov.in/Radar/MOSAIC/Converted/mosaic.gif"
                alt="map"
              />
            </Card>
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid md:grid-cols-2 gap-3">
            <Card className="w-full">
              <h3 className="text-center text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Lightning
              </h3>
              <img
                className="mt-4"
                src="https://mausam.imd.gov.in/lightning/Converted/BT.gif"
                alt="map"
              />
            </Card>
            <Card className="w-full">
              <h3 className="text-center text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Radar
              </h3>
              <img
                className="mt-4"
                src="https://mausam.imd.gov.in/Radar/MOSAIC/Converted/mosaic.gif"
                alt="map"
              />
            </Card>
          </div>
        </div>
        {/* <div className="grid gap-3">
          <Card className="h-full">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Lightning
            </h3>
            <img className="mt-4" src="https://mausam.imd.gov.in/lightning/Converted/BT.gif" alt="map" />
          </Card>
        </div> */}

        {/* <div className="flex flex-col gap-3">
          <Card className="mx-auto" decorationColor="indigo">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Sales
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
          </Card>
          <Card className="h-full">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Number of species threatened with extinction (2021)
            </h3>
            <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Newsletter Revenue
            </h3>
            <DonutChart
              data={sales}
              className="mt-4 h-[11rem]"
              category="sales"
              index="name"
              valueFormatter={valueFormatter}
              colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
        </div>

        <div className="flex flex-col gap-3">
          <Card className="mx-auto" decorationColor="indigo">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Sales
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              $34,743
            </p>
          </Card>
          <Card className="h-full">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Number of species threatened with extinction (2021)
            </h3>
            <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Newsletter Revenue
            </h3>
            <DonutChart
              data={sales}
              className="mt-4 h-[11rem]"
              category="sales"
              index="name"
              valueFormatter={valueFormatter}
              colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
        </div> */}
      </div>
      <Card className="my-3">
        <div className="flex items-center justify-between mb-4">
          <h3 className="mx-auto text-center text-2xl font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Alerts
          </h3>
        </div>
        <AlertsDashboard />
      </Card>
    </div>
  );
};

export default WeatherData;
