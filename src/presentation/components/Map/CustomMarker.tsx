import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { Paper, Typography } from '@mui/material';

interface CustomMarkerProps {
  position: LatLng;
  type: 'selected' | 'pbo' | 'splitter' | 'pole';
  title: string;
  description?: string;
  onClick?: () => void;
}

const markerIcons = {
  selected: new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2RjMDA0ZSIgZD0iTTEyIDJDOC4xMyAyIDUgNS4xMyA1IDljMCA1LjI1IDcgMTMgNyAxM3M3LTcuNzUgNy0xM2MwLTMuODctMy4xMy03LTctN3ptMCA5LjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41IDIuNS0yLjUgMi41IDEuMTIgMi41IDIuNS0xLjEyIDIuNS0yLjUgMi41eiIvPjwvc3ZnPg==',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }),
  pbo: new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzE5NzZkMiIgZD0iTTE5IDVoLTJWM0g3djJINWMtMS4xIDAtMiAuOS0yIDJ2MTJjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMlY3YzAtMS4xLS45LTItMi0yem0wIDE0SDVWNyhoMnYyaDEwVjdoMnYxMnoiLz48L3N2Zz4=',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  }),
  splitter: new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzRjYWY1MCIgZD0iTTQgMTh2LTNoMTB2M2gyVjNoLTJ2M0g0VjNIMnYxNWgyeiIvPjwvc3ZnPg==',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  }),
  pole: new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzc5NTU0OCIgZD0iTTE3IDE2bC00LTRWOGg2VjZIOFY0SDZ2MTZoMnYtOGw0IDR2NGg2di0ySDEydi0yaDV6Ii8+PC9zdmc+',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  })
};

export const CustomMarker: React.FC<CustomMarkerProps> = ({
  position,
  type,
  title,
  description,
  onClick
}) => {
  return (
    <Marker 
      position={position} 
      icon={markerIcons[type]}
      eventHandlers={{
        click: onClick
      }}
    >
      <Popup>
        <Paper elevation={0}>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Paper>
      </Popup>
    </Marker>
  );
};