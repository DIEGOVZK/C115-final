import React, { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: "Chart.js Line Chart",
    // },
  },
};

const labels = Array.from({ length: 21 }, (_, index) => index).reverse();

const accXdata = {
  labels,
  datasets: [
    {
      label: "accX",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const accYdata = {
  labels,
  datasets: [
    {
      label: "accY",
      data: [],
      borderColor: "rgb(87, 153, 189)",
      backgroundColor: "rgba(87, 153, 189, 0.5)",
    },
  ],
};

const accZdata = {
  labels,
  datasets: [
    {
      label: "accZ",
      data: [],
      borderColor: "rgb(87, 153, 189)",
      backgroundColor: "rgba(87, 153, 189, 0.5)",
    },
  ],
};

const gyroXdata = {
  labels,
  datasets: [
    {
      label: "gyroX",
      data: [],
      borderColor: "rgb(122, 222, 155)",
      backgroundColor: "rgba(122, 222, 155, 0.5)",
    },
  ],
};

const gyroYdata = {
  labels,
  datasets: [
    {
      label: "gyroY",
      data: [],
      borderColor: "rgb(86, 48, 110)",
      backgroundColor: "rgba(86, 48, 110, 0.5)",
    },
  ],
};

const gyroZdata = {
  labels,
  datasets: [
    {
      label: "gyroZ",
      data: [],
      borderColor: "rgb(181, 181, 62)",
      backgroundColor: "rgba(181, 181, 62, 0.5)",
    },
  ],
};

function App() {
  const [socket, setSocket] = useState();

  const [accX, setAccX] = useState(accXdata);
  const [accY, setAccY] = useState(accYdata);
  const [accZ, setAccZ] = useState(accZdata);
  const [gyroX, setGyroX] = useState(gyroXdata);
  const [gyroY, setGyroY] = useState(gyroYdata);
  const [gyroZ, setGyroZ] = useState(gyroZdata);
  useMemo(() => {
    setSocket(new WebSocket("ws://localhost:3001"));
  }, []);

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.log("Conexão estabelecida com sucesso.");
    });
    socket.addEventListener("message", (event) => {
      const info = JSON.parse(event.data);
      console.log('inf', info)

      
      const accXcopy = JSON.parse(JSON.stringify(accX));
      const accYcopy = JSON.parse(JSON.stringify(accY));
      const accZcopy = JSON.parse(JSON.stringify(accZ));
      const gyroXcopy = JSON.parse(JSON.stringify(gyroX));
      const gyroYcopy = JSON.parse(JSON.stringify(gyroY));
      const gyroZcopy = JSON.parse(JSON.stringify(gyroZ));

      accXcopy.datasets[0].data = info.accX
      accYcopy.datasets[0].data = info.accY
      accZcopy.datasets[0].data = info.accZ
      gyroXcopy.datasets[0].data = info.gyroX
      gyroYcopy.datasets[0].data = info.gyroY
      gyroZcopy.datasets[0].data = info.gyroZ

      setAccX(accXcopy);
      setAccY(accYcopy);
      setAccZ(accZcopy);
      setGyroX(gyroXcopy);
      setGyroY(gyroYcopy);
      setGyroZ(gyroZcopy);
    });

    socket.addEventListener("close", () => {
      console.log("Conexão fechada.");
      socket.close();
    });
  }, [socket]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "#000",
        display: "flex",
        margin: "0 auto",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={accX} />
        </Box>

        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={accY} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={accZ} />
        </Box>

        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={gyroX} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={gyroY} />
        </Box>

        <Box
          sx={{
            height: "300px",
            width: "100%",
          }}
        >
          <Line options={options} data={gyroZ} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
