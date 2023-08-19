import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme, cursorDisable }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        cursor: cursorDisable ? "text" : 'pointer',
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

export default function BreadCrumb() {
    return (
        <div role="presentation" style={{ marginBottom: "10px", marginTop: "-30px" }}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">
                    <StyledBreadcrumb
                        label="Manage Users"
                        icon={<HomeIcon fontSize="small" />}
                    />
                </Link>
                <StyledBreadcrumb
                    label="User"
                    icon={<PersonIcon fontSize='small' />}
                    cursorDisable
                />
            </Breadcrumbs>
        </div>
    );
}
