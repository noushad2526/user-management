import { alpha } from "@mui/material";

// ----------------------------------------------------------------------

export default function DataGrid(theme) {
    return {
        MuiDataGrid: {
            styleOverrides: {
                // header
                columnHeaders: {
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.grey[500], 0.15),
                },
                // footer
                footerContainer: {
                    color: theme.palette.text.secondary,
                    backgroundColor: alpha(theme.palette.grey[500], 0.15),
                },
                // root: {
                //     border: 'none',
                // }
                // .MuiDataGrid-root .MuiDataGrid-cell:focus-within {
                //     outline: none !important;
                // }
            },
        },
    };
}
