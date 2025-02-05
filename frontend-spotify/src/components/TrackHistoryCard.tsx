import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import { TrackHistory } from "../types";

interface Props {
  trackHistory: TrackHistory;
}

const TrackHistoryCard: React.FC<Props> = ({ trackHistory }) => {
  const formattedDate = dayjs(trackHistory.datetime).format("YYYY-MM-DD HH:mm");

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 2,
        width: "100%",
        maxWidth: "100%",
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" component="div">
              Music: {trackHistory.track.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Singer: {trackHistory.track.album.artist.name}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrackHistoryCard;
