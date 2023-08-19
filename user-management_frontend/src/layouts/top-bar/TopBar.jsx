import { Outlet } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const StyledBar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2),
  borderRadius: Number(theme.shape.borderRadius) * 1,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
  marginBottom: "40px"
}));

// ----------------------------------------------------------------------

export default function TopBar() {
  return (
    <>
      <StyledBar>
        <Typography variant='h4'>
          USER MANAGEMENT
        </Typography>
      </StyledBar>

      <Outlet />
    </>
  );
}
