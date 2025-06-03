// contexts/PatientsContext.js
import React, { createContext, useState } from "react";

export const PatientsContext = createContext({
  patients: [],
  addPatient: () => {},
  removePatient: () => {},
});

const INITIAL_PATIENTS = [
  {
    id: "1",
    name: "Ethan Carter",
    details: "Age: 65, Male",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Medium",
    riskPct: "50%",
    riskColor: "#0bda5b",
    // ← Add a “clinical” object with every sub‐key (even if empty):
    clinical: {
      weight: "75", // weight in kg
      height: "175", // height in cm
      age: "65", // age in years
      gender: "Male", // gender string
      notes: "", // any free‐text notes
    },
    // ← Add a “labValues” object (empty for now)
    labValues: {
      Creatinine: "2.5 mg/dL",
      BUN: "40 mg/dL",
      Potassium: "5.2 mEq/L",
      Sodium: "138 mEq/L",
      Bicarbonate: "22 mEq/L",
      // …any other labs you want to seed…
    },
  },

  {
    id: "2",
    name: "Sophia Clark",
    details: "Age: 72, Female",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "High",
    riskPct: "90%",
    riskColor: "#e33e3e",
    clinical: {
      weight: "68",
      height: "160",
      age: "72",
      gender: "Female",
      notes: "Diabetic, HTN",
    },
    labValues: {
      Creatinine: "1.8 mg/dL",
      BUN: "35 mg/dL",
      Potassium: "4.8 mEq/L",
      Sodium: "135 mEq/L",
      Bicarbonate: "20 mEq/L",
    },
  },

  {
    id: "3",
    name: "John Smith",
    details: "Age: 72, Male",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Low",
    riskPct: "10%",
    riskColor: "#0AD95C",
    clinical: {
      weight: "82",
      height: "180",
      age: "72",
      gender: "Male",
      notes: "",
    },
    labValues: {
      Creatinine: "1.2 mg/dL",
      BUN: "28 mg/dL",
      Potassium: "4.5 mEq/L",
      Sodium: "140 mEq/L",
      Bicarbonate: "24 mEq/L",
    },
  },

  {
    id: "4",
    name: "Olivia Brown",
    details: "Age: 20, Female",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "Low",
    riskPct: "25%",
    riskColor: "#0AD95C",
    clinical: {
      weight: "",
      height: "",
      age: "20",
      gender: "Female",
      notes: "",
    },
    labValues: {
      Creatinine: "",
      BUN: "",
      Potassium: "",
      Sodium: "",
      Bicarbonate: "",
    },
  },
];

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  const addPatient = (patient) => setPatients((prev) => [patient, ...prev]);

  const removePatient = (id) =>
    setPatients((prev) => prev.filter((p) => p.id !== id));

  return (
    <PatientsContext.Provider value={{ patients, addPatient, removePatient }}>
      {children}
    </PatientsContext.Provider>
  );
}
