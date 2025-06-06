import React, { createContext, useState } from "react";

export const PatientsContext = createContext({
  patients: [],
  addPatient: () => {},
  removePatient: () => {},
  updatePatient: () => {},
});

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
      weight: "75",
      height: "175",
      age: "65",
      gender: "Male",
      notes: "",
    },
    labValues: {
      Creatinine: "1.2",
      HCO3: "10.0",
      Creatinine: "1.2",
      "Mean Arterial Pressure": "10.0",
      Procalcitonin: "0.05",
      Bilirubin: "1.0",
      pH: "7.4",
      Albumin: "4.0",
      Urea: "5.0",
      "White Blood Cell Count": "8.0",
      SOFA: "2.0",
      APACHEII: "10.0",
      Glasgow: "14.0",
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
      Creatinine: "1.2",
      HCO3: "10.0",
      Creatinine: "1.2",
      "Mean Arterial Pressure": "10.0",
      Procalcitonin: "0.05",
      Bilirubin: "1.0",
      pH: "7.4",
      Albumin: "4.0",
      Urea: "5.0",
      "White Blood Cell Count": "8.0",
      SOFA: "2.0",
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
      Creatinine: "1.2",
      HCO3: "10.0",
      Procalcitonin: "0.05",
      Bilirubin: "1.0",
      pH: "7.4",
      Albumin: "4.0",
      Urea: "5.0",
      "White Blood Cell Count": "8.0",
      SOFA: "2.0",
      APACHEII: "10.0",
      Glasgow: "14.0",
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
      Creatinine: "1.2",
      "Mean Arterial Pressure": "10.0",
      Procalcitonin: "0.05",
      Bilirubin: "1.0",
      pH: "7.4",
      Albumin: "4.0",
      Urea: "5.0",
      "White Blood Cell Count": "8.0",
      SOFA: "2.0",
      APACHEII: "10.0",
      Glasgow: "14.0",
    },
  },
];

export function PatientsProvider({ children }) {
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  const addPatient = (newPatient) =>
    setPatients((prev) => [
      {
        ...newPatient,
        clinical: {
          weight: newPatient.clinical?.weight || "",
          height: newPatient.clinical?.height || "",
          age: newPatient.clinical?.age || "",
          gender: newPatient.clinical?.gender || "",
          notes: newPatient.clinical?.notes || "",
        },
        labValues: newPatient.labValues || {},
      },
      ...prev,
    ]);

  const removePatient = (id) =>
    setPatients((prev) => prev.filter((p) => p.id !== id));

  const updatePatient = (id, updates) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        return {
          ...p,
          name: updates.name !== undefined ? updates.name : p.name,
          avatar: updates.avatar !== undefined ? updates.avatar : p.avatar,

          clinical: {
            ...p.clinical,
            ...(updates.clinical || {}),
          },

          labValues: {
            ...p.labValues,
            ...(updates.labValues || {}),
          },

          ...(updates.riskLabel !== undefined && {
            riskLabel: updates.riskLabel,
          }),
          ...(updates.riskPct !== undefined && { riskPct: updates.riskPct }),
          ...(updates.riskColor !== undefined && {
            riskColor: updates.riskColor,
          }),
          ...(updates.predictedClass !== undefined && {
            predictedClass: updates.predictedClass,
          }),
          ...(updates.predictedProba !== undefined && {
            predictedProba: updates.predictedProba,
          }),
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
        updatePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}
