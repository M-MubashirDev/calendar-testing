import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { eachDayOfInterval, parse, parseISO, format } from "date-fns";
// import { format } from "date-fns/fp";

function App() {
  // sampleData.js
  const [notAvail, setnotAvail] = useState([]);
  // const data = [];
  function CalcUnavalibility(manual, notAvalible) {
    if (!manual || !notAvalible) return;

    const acutalArray = notAvalible.map((val) => {
      if (
        !val.from ||
        !val.to ||
        isNaN(Date.parse(val.from)) ||
        isNaN(Date.parse(val.to))
      ) {
        console.warn("Invalid date range", val);
        return []; // Skip this entry if invalid
      }
      const end = parseISO(val.to);
      const start = parseISO(val.from);
      const notDate = eachDayOfInterval({ start: start, end: end });
      const stingArray = notDate.map((val) => {
        return format(val, "yyyy-MM-dd");
      });
      return stingArray;
    });
    const unique = [...new Set(acutalArray.flat())];
    console.log(unique);
    const notObjArray = unique.map((val) => {
      return {
        date: val,
        startTime: "00:00",
        endTime: "23:59",
        notAvalable: true,
      };
    });
    setnotAvail([...manual, ...notObjArray]);
  }

  useEffect(() => {
    setnotAvail([]);
    CalcUnavalibility(
      [
        {
          date: "2024-12-28",
          endTime: "11:16",
          startTime: "10:09",
        },
        {
          date: "2024-12-30",
          endTime: "15:00",
          startTime: "13:00",
        },
      ],
      [
        {
          from: "2024-12-22",
          to: "2024-12-27",
        },
        {
          from: "2024-12-28",
          to: "2024-12-30",
        },
      ]
    );
  }, []);
  console.log(notAvail);
  return (
    <div className="h-[100vh] max-w-[90%] w-full mx-auto flex flex-col justify-center  items-center">
      <Calendar />
    </div>
  );
}

export default App;

// const sampleData = [
//   {
//     manualBookingDetails: {
//       date: "2024-12-28",
//       endTime: "11:16",
//       startTime: "10:09",
//     },
//     professional: {
//       availability: false,
//       name: "jay W",
//       notAvailable: [
//         {
//           from: "2024-12-25",
//           to: "2024-12-28",
//         },
//       ],
//     },
//   },
//   {
//     manualBookingDetails: {
//       date: "2024-12-30",
//       endTime: "15:00",
//       startTime: "13:00",
//     },
//     professional: {
//       availability: true,
//       name: "John D",
//       notAvailable: [],
//     },
//   },
// ];
