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
import { Box, Typography, TextField, Button } from "@mui/material";
import { updateAccX, updateAccY, updateAccZ, updateGyroX, updateGyroY, updateGyroZ } from "./axios.client";

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
  },
};

const labels = Array.from({ length: 4001 }, (_, index) => index).reverse();
const grayBG = "#BFBFBF";
const blueBG = "#0E1C36";
const whiteBG = "#FFF";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: grayBG,
  },

  sidebar: {
    width: "20%",
    background: blueBG,
    color: "#FFF",
    p: "1.3rem",
  },

  graphContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },

  graphBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  graphStyle: {
    height: "17rem",
    width: "40rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mb: "20px",
    p: "0.625rem",
    background: whiteBG,
    margin: "0.625rem auto",
  },

  limitsTitleAlign: {
    textAlign: "left",
  },

  limitsInput: {
    background: "white",
    border: "solid 1px",
    borderColor: "#000",
    width: "50%",
  },

  limitsBox: {
    display: "flex",
    mb: "0.4rem",
  },

  setLimitButton: {
    background: '#eb8334',
    color: '#FFF',
    fontWeight: 'bold',
    borderRadius: 0,
    width: '100%',
    mb: '1rem',
    "&:hover": {
      backgroundColor: '#eb995b'
    },
  },
};

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

  const [accXUpperLimit, setAccXUpperLimit] = useState('');
  const [accYUpperLimit, setAccYUpperLimit] = useState('');
  const [accZUpperLimit, setAccZUpperLimit] = useState('');

  const [accXInferiorLimit, setAccXInferiorLimit] = useState('');
  const [accYInferiorLimit, setAccYInferiorLimit] = useState('');
  const [accZInferiorLimit, setAccZInferiorLimit] = useState('');

  const [gyroXUpperLimit, setGyroXUpperLimit] = useState('');
  const [gyroYUpperLimit, setGyroYUpperLimit] = useState('');
  const [gyroZUpperLimit, setGyroZUpperLimit] = useState('');

  const [gyroXInferiorLimit, setGyroXInferiorLimit] = useState('');
  const [gyroYInferiorLimit, setGyroYInferiorLimit] = useState('');
  const [gyroZInferiorLimit, setGyroZInferiorLimit] = useState('');

  const maxLen = 10000;
  const removeLen = 20;

  useMemo(() => {
    setSocket(new WebSocket("ws://localhost:3001"));
  }, []);

  const updateData = (setData, newData) => {
    setData((currentData) => {
      const currentDataCopy = JSON.parse(JSON.stringify(currentData));
      currentDataCopy.datasets[0].data = [
        ...currentData.datasets[0].data,
        ...newData,
      ];
      if (currentDataCopy.datasets[0].data.length > maxLen) {
        currentDataCopy.datasets[0].data.slice(removeLen);
      }
      return currentDataCopy;
    });
  };

  const updateAccXLimits = async () => {
    const limits = {
      upperLimit: accXUpperLimit,
      inferiorLimit: accXInferiorLimit,
    }

    await updateAccX(limits);
  }

  const updateAccYLimits = async () => {
    const limits = {
      upperLimit: accYUpperLimit,
      inferiorLimit: accYInferiorLimit,
    }

    await updateAccY(limits);
  }

  const updateAccZLimits = async () => {
    const limits = {
      upperLimit: accZUpperLimit,
      inferiorLimit: accZInferiorLimit,
    }

    await updateAccZ(limits);
  }

  const updateGyroXLimits = async () => {
    const limits = {
      upperLimit: gyroXUpperLimit,
      inferiorLimit: gyroXInferiorLimit,
    }

    await updateGyroX(limits);
  }

  const updateGyroYLimits = async () => {
    const limits = {
      upperLimit: gyroYUpperLimit,
      inferiorLimit: gyroYInferiorLimit,
    }

    await updateGyroY(limits);
  }

  const updateGyroZLimits = async () => {
    const limits = {
      upperLimit: gyroZUpperLimit,
      inferiorLimit: gyroZInferiorLimit,
    }

    await updateGyroZ(limits);
  }

  useEffect(() => {
    socket.addEventListener("open", () => {
      console.log("Conexão estabelecida com sucesso.");
    });
    socket.addEventListener("message", (event) => {
      const info = JSON.parse(event.data);
      console.log("inf", info);

      updateData(setAccX, info.accX);
      updateData(setAccY, info.accY);
      updateData(setAccZ, info.accZ);
      updateData(setGyroX, info.gyroX);
      updateData(setGyroY, info.gyroY);
      updateData(setGyroZ, info.gyroZ);
    });

    socket.addEventListener("close", () => {
      console.log("Conexão fechada.");
      socket.close();
    });
  }, [socket]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              mb: "2rem",
            }}
          >
            Ajuste dos limiares de alertas
          </Typography>

          <Typography sx={styles.limitsTitleAlign}>ACCX</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccXInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccXUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateAccXLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>

          <Typography sx={styles.limitsTitleAlign}>ACCY</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccYInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccYUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateAccYLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>

          <Typography sx={styles.limitsTitleAlign}>ACCZ</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccZInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setAccZUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateAccZLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>

          <Typography sx={styles.limitsTitleAlign}>GYROX</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroXInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroXUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateGyroXLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>

          <Typography sx={styles.limitsTitleAlign}>GYROY</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroYInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroYUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateGyroYLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>

          <Typography sx={styles.limitsTitleAlign}>GYROZ</Typography>
          <Box sx={styles.limitsBox}>
            <TextField
              label="Limite Inferior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroZInferiorLimit(e.target.value);
              }}
            ></TextField>

            <Typography
              sx={{
                textAlign: "left",
              }}
            ></Typography>
            <TextField
              label="Limite Superior"
              variant="filled"
              color="warning"
              sx={styles.limitsInput}
              onChange={(e) => {
                setGyroZUpperLimit(e.target.value);
              }}
            ></TextField>
          </Box>
          <Button 
          onClick={() => updateGyroZLimits()}
          sx={styles.setLimitButton}>
            Definir
          </Button>
        </Box>
      </Box>

      <Box sx={styles.graphContainer}>
        <Box sx={styles.graphBox}>
          <Box sx={styles.graphStyle}>
            <Line options={options} data={accX} />
          </Box>

          <Box sx={styles.graphStyle}>
            <Line options={options} data={accY} />
          </Box>
        </Box>

        <Box sx={styles.graphBox}>
          <Box sx={styles.graphStyle}>
            <Line options={options} data={accZ} />
          </Box>

          <Box sx={styles.graphStyle}>
            <Line options={options} data={gyroX} />
          </Box>
        </Box>

        <Box sx={styles.graphBox}>
          <Box sx={styles.graphStyle}>
            <Line options={options} data={gyroY} />
          </Box>

          <Box sx={styles.graphStyle}>
            <Line options={options} data={gyroZ} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
