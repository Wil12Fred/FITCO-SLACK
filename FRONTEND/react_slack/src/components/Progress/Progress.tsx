import React from "react";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

const Progress = () => {
  return (
    <Box sx={{ position: "relative", display: "flex" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: theme =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={18}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: theme =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={18}
        thickness={4}
      />
    </Box>
  );
};

export default Progress;
