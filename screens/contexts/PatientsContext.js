// screens/contexts/PatientsContext.js
import React, { createContext, useState } from "react";

// 1) Define the shape of our context
export const PatientsContext = createContext({
  patients: [], // array of patient objects
  addPatient: () => {}, // function to add a new patient
  removePatient: () => {}, // function to remove one by id
  updatePatientClinical: () => {}, // NEW: function to update clinical info
});

// 2) Provide some "clinical" defaults for each initial patient to avoid undefined errors
const INITIAL_PATIENTS = [
  {
    id: "1",
    name: "Ethan Carter",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Medium",
    riskPct: "50%",
    riskColor: "#0bda5b",
    clinical: {
      weight: "75", // in kg
      height: "175", // in cm
      age: "65",
      gender: "Male",
      notes: "",
    },
    labValues: {
      Creatinine: "1.2 mg/dL",
      BUN: "40 mg/dL",
      // …add any others you want
    },
  },
  {
    id: "2",
    name: "Sophia Clark",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "High",
    riskPct: "90%",
    riskColor: "#e33e3e",
    clinical: {
      weight: "80",
      height: "168",
      age: "72",
      gender: "Female",
      notes: "",
    },
    labValues: {
      Creatinine: "1.8 mg/dL",
      BUN: "50 mg/dL",
    },
  },
  {
    id: "3",
    name: "John Smith",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMxlcPx1dh-l8uhb9AvXQovks5QvuaDw8nQlNHdEw_ih_jmt_2yAteEVaYa_QoEYS2XdZP9qbacppKkhvpbjflNr5hFfJUesihfdQQYkAYqCiNI5UvX_0bVNf1xIMQhz2xoLLJH7iD98IGVJhWnK4KGLaZ7zqs2wEWexXOJNMXOiy4fb6iidqojcOZhk_0jKQHefiuQZ474WDRqZA_xlK48aEtbPm4-lIkL9ObBX_ip1h4feAHQb58WPaw4NLs-B7A4cwKjVCcvnE",
    riskLabel: "Low",
    riskPct: "10%",
    riskColor: "#0AD95C",
    clinical: {
      weight: "68",
      height: "180",
      age: "72",
      gender: "Male",
      notes: "",
    },
    labValues: {
      Creatinine: "0.9 mg/dL",
      BUN: "18 mg/dL",
    },
  },
  {
    id: "4",
    name: "Olivia Brown",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB9OboGcvAk2beHqEABPJ8Z-O-qesZemOu11NYQidOkhTrQ-pU_fCa1ZMirdpiQKTD9FceLQOQn0E2i0sS2SuqTColDfZz_oCczDvgLgleKYn9vijRA64GaNSqw9fv0Eg-2zeg-OMsi1oj6_jZ94Zms60Fon893UgswtZCEkqv7oobFaQRkTcty47mBJcPvzm-WCHCyvUxuT5MYFviOdfG2nqOZe-CjU9KxCgDtnIbnFnvgvoInzIWCxZEglukRqJu-KsDwwe4WIiA",
    riskLabel: "Low",
    riskPct: "25%",
    riskColor: "#0AD95C",
    clinical: {
      weight: "60",
      height: "165",
      age: "20",
      gender: "Female",
      notes: "",
    },
    labValues: {
      Creatinine: "0.7 mg/dL",
      BUN: "12 mg/dL",
    },
  },
];

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  // 3) addPatient: prepend a brand-new patient, making sure to include a “clinical” field
  const addPatient = (patient) =>
    setPatients((prev) => [
      {
        ...patient,
        // If no clinical object was passed in, default to these empty strings
        clinical: {
          weight: patient.clinical?.weight || "",
          height: patient.clinical?.height || "",
          age: patient.clinical?.age || "",
          gender: patient.clinical?.gender || "",
          notes: patient.clinical?.notes || "",
        },
        labValues: patient.labValues || {},
      },
      ...prev,
    ]);

  // 4) removePatient: filter out one by id
  const removePatient = (id) =>
    setPatients((prev) => prev.filter((p) => p.id !== id));

  // 5) updatePatientClinical: locate the patient by id and merge in new `clinical` values
  const updatePatientClinical = (id, newClinical) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          clinical: {
            ...p.clinical,
            ...newClinical,
          },
        };
      })
    );
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        addPatient,
        removePatient,
        updatePatientClinical, // ← expose the new updater function
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}
