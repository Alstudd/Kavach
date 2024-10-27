import React, { useState, useEffect } from "react";
import { AreaChart, Card, DonutChart, BarChart } from "@tremor/react";
import { Filter, Sliders, SortAsc } from "lucide-react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import DisasterList from "./DisasterList";
import ResourceList from "./ResourceList";
import axios, { all } from "axios";

const Dashboard = () => {
  const colRef = collection(db, "issue");
  const [complaintArr, setComplaintArr] = useState([]);
  const [ration, setRation] = useState(null);
  const [disasters, setDisasters] = useState([]);
  const [resources, setResources] = useState([]);
  const [allocatedResources, setAllocatedResources] = useState([]);
  const [solvedDisasters, setSolvedDisasters] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationArr, setDonationArr] = useState([]);

  useEffect(() => {
    try {
      const getDisasters = async () => {
        const response = await axios.get("http://localhost:3000/api/disaster");
        setDisasters(response.data);
        console.log(response.data);
      };
      getDisasters();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      let arr = [];
      const getTotalDonations = async () => {
        const response = await axios.get("http://localhost:3000/api/donation");
        response.data.forEach((donation) => {
          arr.push(donation.amount);
        });
        setDonationArr(arr);
      };
      getTotalDonations();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    let total = 0;
    donationArr.forEach((donation) => {
      total += donation;
    });
    setTotalDonations(total);
  }, [donationArr]);

  useEffect(() => {
    try {
      const getAllocatedResources = async () => {
        const response = await axios.get("http://localhost:3000/api/resource-allocation");
        setAllocatedResources(response.data);
        console.log(response.data);
      };
      getAllocatedResources();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    let count = 0;
    disasters.forEach((disaster) => {
      if (disaster.status === "rescued") {
        count += 1;
      }
    });
    setSolvedDisasters(count);
  }, [disasters]);

  useEffect(() => {
    try {
      const getResources = async () => {
        const response = await axios.get("http://localhost:3000/api/resource");
        setResources(response.data);
        console.log(response.data);
      };
      getResources();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const countStatus = (setComplaintArr) => {
    let newPositive = 0;
    let newNegative = 0;
    for (let i = 0; i < setComplaintArr.length; i++) {
      if (setComplaintArr[i].status === true) {
        newPositive += 1;
      } else {
        newNegative += 1;
      }
    }
    return { newPositive, newNegative };
  };
  const { newPositive, newNegative } = countStatus(complaintArr);

  const countCategory = (setComplaintArr) => {
    let newBiological = 0;
    let newNatural = 0;
    let newEnvironmental = 0;
    let newHumanInduced = 0;
    let newTechnological = 0;
    for (let i = 0; i < setComplaintArr.length; i++) {
      if (
        setComplaintArr[i].type === "Biological Disasters" ||
        setComplaintArr[i].type === "fnsyV6Ze7Ufhkxcqnq20"
      ) {
        newBiological += 1;
      } else if (
        setComplaintArr[i].type === "Natural Disasters" ||
        setComplaintArr[i].type === "YU3EJbpcs7lTo7Pqbgow"
      ) {
        newNatural += 1;
      } else if (
        setComplaintArr[i].type === "Environmental Disasters" ||
        setComplaintArr[i].type === "iIntcTRGv0z8mIRXvYtL"
      ) {
        newEnvironmental += 1;
      } else if (
        setComplaintArr[i].type === "Technological Disasters" ||
        setComplaintArr[i].type === "Ang7eN63LnIbkKPTcPvx"
      ) {
        newTechnological += 1;
      } else {
        newHumanInduced += 1;
      }
    }
    return {
      newBiological,
      newEnvironmental,
      newTechnological,
      newNatural,
      newHumanInduced,
    };
  };
  const {
    newBiological,
    newEnvironmental,
    newTechnological,
    newNatural,
    newHumanInduced,
  } = countCategory(complaintArr);

  const countLoc = (setComplaintArr) => {
    let Nalla = 0;
    let NallaSolved = 0;
    let Malad = 0;
    let MaladSolved = 0;
    let Andheri = 0;
    let AndheriSolved = 0;
    let Others = 0;
    let OthersSolved = 0;
    let Total = 0;
    for (let i = 0; i < setComplaintArr.length; i++) {
      if (setComplaintArr[i].location === "Nallasopara") {
        Nalla += 1;
        Total += 1;
        if (setComplaintArr[i].status === true) {
          NallaSolved += 1;
        }
      } else if (setComplaintArr[i].location === "Malad") {
        Malad += 1;
        Total += 1;
        if (setComplaintArr[i].status === true) {
          MaladSolved += 1;
        }
      } else if (setComplaintArr[i].location === "Andheri") {
        Andheri += 1;
        Total += 1;
        if (setComplaintArr[i].status === true) {
          AndheriSolved += 1;
        }
      } else {
        Others += 1;
        Total += 1;
        if (setComplaintArr[i].status === true) {
          OthersSolved += 1;
        }
      }
    }
    return {
      Nalla,
      Malad,
      Andheri,
      Others,
      Total,
      NallaSolved,
      MaladSolved,
      AndheriSolved,
      OthersSolved,
    };
  };
  const {
    Nalla,
    Malad,
    Andheri,
    Others,
    Total,
    NallaSolved,
    MaladSolved,
    AndheriSolved,
    OthersSolved,
  } = countLoc(complaintArr);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let issues = [];
        snapshot.docs.forEach((doc) => {
          issues.push({ ...doc.data(), id: doc.id });
        });
        setComplaintArr(issues);
        // console.log(issues);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const calculateResourceQuantities = (resources) => {
    const typeTotals = {};

    resources.forEach((resource) => {
      const { type, quantity } = resource;
      if (typeTotals[type]) {
        typeTotals[type] += quantity;
      } else {
        typeTotals[type] = quantity;
      }
    });

    return Object.entries(typeTotals).map(([name, quantity]) => ({
      name,
      "Total Quantity": quantity,
    }));
  };

  const categoryStat = calculateResourceQuantities(resources);

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  console.log(categoryStat);

  const StatusRatio = [
    {
      name: "Solved Disasters",
      count: solvedDisasters,
    },
    {
      name: "Unsolved Disasters",
      count: disasters.length - solvedDisasters,
    },
  ];

  const [value, setValue] = useState(null);

  const LocSolved = [
    {
      location: "Nallasopara",
      Disasters: Nalla,
      "Solved Disasters": NallaSolved,
    },
    {
      location: "Malad",
      Disasters: Malad,
      "Solved Disasters": MaladSolved,
    },
    {
      location: "Andheri",
      Disasters: Andheri,
      "Solved Disasters": AndheriSolved,
    },
    {
      location: "Others",
      Disasters: Others,
      "Solved Disasters": OthersSolved,
    },
  ];

  function getDisasterStats(disasters) {
    const stats = [];

    disasters.forEach((disaster) => {
      const existingDisaster = stats.find(
        (stat) => stat.disasterType === disaster.disasterType
      );

      if (existingDisaster) {
        if (disaster.status === "on-going") {
          existingDisaster["number of on-going"] += 1;
        } else if (disaster.status === "rescued") {
          existingDisaster["number of rescued"] += 1;
        }
      } else {
        stats.push({
          disasterType: disaster.disasterType,
          "number of on-going": disaster.status === "on-going" ? 1 : 0,
          "number of rescued": disaster.status === "rescued" ? 1 : 0,
        });
      }
    });

    return stats;
  }

  const disasterStats = getDisasterStats(disasters);
  console.log(disasterStats);

  let newRat;

  useEffect(() => {
    const ratio = () => {
      newRat = (newPositive / Total).toFixed(2) * 100;
      setRation(newRat);
    };

    const timeoutId = setTimeout(() => {
      ratio();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [newPositive, Total]);

  const valueFormatter = function (number) {
    return new Intl.NumberFormat("us").format(number).toString();
  };

  const resourceQuantities = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = 0;
    }
    acc[resource.type] += resource.quantity;
    return acc;
  }, {});

  const resourceArray = Object.keys(resourceQuantities).map((type) => ({
    resourceType: type,
    quantity: resourceQuantities[type],
  }));

  resourceArray.sort((a, b) => b.quantity - a.quantity);

  const top4Resources = resourceArray.slice(0, 4);

  return (
    <div className="md:w-[90%] w-[95%] mx-auto py-3">
      <div className="grid md:grid-cols-4 gap-3">
        <div className="col-span-3">
          <div className="grid md:grid-cols-3 gap-3 mb-3 ">
            <Card className="mx-auto" decorationColor="indigo">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Number of resources
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {resources.length}
              </p>
            </Card>
            <Card className="mx-auto" decorationColor="indigo">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Number of allocated resources
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {allocatedResources.length}
              </p>
            </Card>
            <Card className="mx-auto" decorationColor="indigo">
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Total Donations in SOL
              </p>
              <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {totalDonations} SOL
              </p>
            </Card>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Card>
              <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Disaster Tracker
              </h3>
              <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {disasters.length}
              </p>
              <AreaChart
                className="mt-4 h-72"
                data={disasterStats}
                index="disasterType"
                yAxisWidth={60}
                categories={["number of on-going", "number of rescued"]}
                colors={["indigo", "cyan"]}
                valueFormatter={valueFormatter}
              />
            </Card>
            <Card>
              <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Category based Disasters faced by the People
              </h3>
              <BarChart
                className="mt-6"
                data={top4Resources}
                index="resourceType"
                categories={["quantity"]}
                colors={["blue"]}
                valueFormatter={dataFormatter}
                yAxisWidth={48}
              />
            </Card>
          </div>
        </div>
        <div className="grid gap-3">
          <Card className="mx-auto" decorationColor="indigo">
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Disaster Rescue Completion Percentage
            </p>
            <p className="text-3xl mb-4 text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {((solvedDisasters / disasters.length) * 100).toFixed(2)}%
            </p>
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              This is the percentage of disasters that have been rescued
            </p>
          </Card>
          <Card className="h-full">
            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Disaster Completion Ratio
            </h3>
            <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Status of Disasters
            </h3>
            <DonutChart
              data={StatusRatio}
              className="mt-4 h-[11rem]"
              category="count"
              index="name"
              valueFormatter={valueFormatter}
              colors={["blue", "cyan"]}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
        </div>
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
      <div className="pt-3">
        <a href="/disasters">
          <DisasterList showSort={false} />
        </a>
      </div>
      <div className="pt-3">
        <a href="/resources">
          <ResourceList showSort={false} />
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
