"use client"

import Dashboard from "@/features/dashboard/components/Dashboard";
import { getImptInfo, getLogsSummary, getPendingActions, getPresetPrompt } from "@/service/dashboard";
import { useEffect, useState } from "react";

// const pendingActions = 4;

// const logsSummary = "test";

// const presetPrompt = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, 
// a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through 
// the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 
// "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
//  comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by 
//  Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
// `

// const imptInfo = [
//   {
//     id: "1",
//     metadata: {
//       header: "OSHE Number",
//       content: "88888888",
//     }
//   },
//   {
//     id: "2",
//     metadata: {
//       header: "Rape Number",
//     content: "88888888",
//     }
//   },
//   {
//     id: "3",
//     metadata: {
//       header: "Mingyuan Number",
//       content: "83152835",
//     }
    
//   },
//   {
//     id: "4",
//     metadata: {
//       header: "Admissions Enquiry",
//       content: "88888888",
//     }
//   },
// ]

export default function Home() {
  const [presetPrompt, setPresetState] = useState(null)
  const [imptInfo, setImptInfoState] = useState(null)
  const [logsSummary, setLogsSummaryState] = useState(null)
  const [pendingActions, setPendingActionsState] = useState(null)

  useEffect(() => {
    getImptInfo().then(
      (res) => {
        setImptInfoState(res);
      }, (err) => {
        console.error(err.message)
      }
    )

    getPresetPrompt().then(
      (res) => {
        setImptInfoState(res);
      }, (err) => {
        console.error(err.message)
      }
    )

    getLogsSummary().then(
      (res) => {
        setImptInfoState(res);
      }, (err) => {
        console.error(err.message)
      }
    )

    getPendingActions().then(
      (res) => {
        setImptInfoState(res);
      }, (err) => {
        console.error(err.message)
      }
    )
  },[])

  return (
    <main className="flex flex-col mx-auto max-w-7xl h-[calc(100vh-100px)]">
      <div className="flex flex-col justify-start px-16 py-4 space-y-2">
        <h1 className="font-bold text-4xl">Dashboard</h1>
        <p className="text-gray-400">Quick insights to important information about Luna</p>
        {imptInfo && presetPrompt && logsSummary && pendingActions &&
          <Dashboard imptInfo={imptInfo} presetPrompt={presetPrompt} logsSummary={logsSummary} pendingActions={pendingActions} />
        }
      </div>
    </main>
  );
}
