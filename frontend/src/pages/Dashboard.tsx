import React from 'react';
import { Container, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Library Management System - Admin Dashboard
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Reports and statistics will be displayed here.
      </Typography>
      {/* Placeholder for reports */}
      <Typography variant="body2" align="center" color="textSecondary">
        (Reports feature coming soon)
      </Typography>
    </Container>
  );
};

export default Dashboard;
