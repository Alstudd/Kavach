import React from "react";
import { Card } from "@tremor/react";

const alertsData = [
  {
    severity: "ALERT",
    identifier: 1729961473265008,
    effective_start_time: "Sat Oct 26 22:20:00 IST 2024",
    effective_end_time: "Sun Oct 27 22:20:00 IST 2024",
    disaster_type: "Lightning",
    area_description: "10 Mandals",
    severity_level: "Likely",
    actual_lang: "te",
    warning_message:
      "మీ ప్రాంతంలో పిడుగులు పడే అవకాశం ఉంది. ఉరుములు మెరుపులతో కూడిన వర్షం పడేప్పుడు చెట్లు,టవర్స్,పోల్స్, పొలాలు,బహిరంగ ప్రదేశాల్లో ఉండరాదు. సురక్షితమైన భవనాల్లో ఆశ్రయం పొందండి. -ఏపీ విపత్తుల సంస్థ",
    severity_color: "orange",
    alert_source: "Andhra Pradesh SDMA",
  },
  {
    severity: "Yellow",
    identifier: 1729956732806013,
    effective_start_time: "Sat Oct 26 20:00:00 IST 2024",
    effective_end_time: "Sun Oct 27 08:00:00 IST 2024",
    disaster_type: "Flood",
    area_description: "Ganga, Kachla Bridge, Badaun, Uttar Pradesh",
    severity_level: "steady",
    actual_lang: "hi",
    warning_message:
      "उत्तर प्रदेश के बदायूँ जिले में कछला ब्रिज पर गंगा नदी आज रात 8:00 बजे सामान्य से अधिक बाढ़ की स्थिति में बह रही है।",
    severity_color: "yellow",
    alert_source: "Uttar Pradesh SDMA",
  },
];

const AlertCard = ({ alert }) => {
  const { disaster_type, area_description, severity_level, warning_message, severity_color, effective_start_time, effective_end_time, alert_source } = alert;

  return (
    <Card className="mx-auto p-6 mb-6 border-l-8" decorationColor={severity_color}>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {disaster_type} in {area_description}
      </p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Severity: {severity_level}
      </p>
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content mt-2">
        {warning_message}
      </p>
      <p className="text-tremor-default dark:text-dark-tremor-content mt-4">
        Effective from: {effective_start_time} <br />
        To: {effective_end_time}
      </p>
      <p className="text-tremor-default dark:text-dark-tremor-content mt-1">
        Source: {alert_source}
      </p>
    </Card>
  );
};

const AlertsDashboard = () => {
  return (
    <div className="md:w-[90%] w-[95%] mx-auto py-3">
      <div className="grid md:grid-cols-2 gap-6">
        {alertsData.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
      </div>
    </div>
  );
};

export default AlertsDashboard;
