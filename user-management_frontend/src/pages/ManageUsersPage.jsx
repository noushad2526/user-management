import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
// @mui
import {
    MenuItem,
    Card,
    Stack,
    Button,
    Container,
    Typography,
    Tooltip,
} from '@mui/material';
// datagrid
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport
} from '@mui/x-data-grid';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// components
import Iconify from '../components/iconify';
import ConfirmationDialog from '../components/dialog';
// services
import { deleteUserById, getUsers } from '../services/api-service';

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default function ManageUsersPage() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [reload, setReload] = useState(true);
    const [userId, setUserId] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [userName, setUserName] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers = await getUsers();
                setUsers(allUsers);
                setReload(false);
            } catch (error) {
                setReload(false);
                console.log(error);
            }
        }
        fetchData();
    }, [reload]);

    const handleAddUser = () => {
        navigate('user');
    }

    const handleEdit = (row) => {
        console.log(row);
        navigate('user', { state: row });
    }

    const handleDialog = (user) => {
        setUserId(user.userId);
        setUserName(user.fullName);
        setOpenDialog(true);
    }

    const handleConfirmation = async (confirmed) => {
        try {
            if (confirmed) {
                const deleteUserResponse = await deleteUserById(userId);
                toast.success(`${deleteUserResponse} --${userName}`);
                setReload(true);
                setOpenDialog(false);
            }
            setOpenDialog(false);
        } catch (error) {
            setOpenDialog(false);
            toast.error(error.response.data);
        }
    };



    const columns = [
        {
            field: 'fullName',
            headerName: "Name",
            width: 280,
            renderCell: ({ row: { fullName } }) => {
                return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {fullName}
                        </Typography>
                    </Stack>
                );
            },
        },
        { field: 'mobileNumber', headerName: 'Mobile Number', width: 200 },
        { field: 'email', headerName: 'E-mail', width: 300 },
        {
            field: "role",
            headerName: "Role",
            width: 180,
            renderCell: ({ row: { role } }) => {
                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {role === "ADMIN" && <SecurityOutlinedIcon />}
                        {role === "USER" && <PersonOutlineOutlinedIcon />}
                        {/* <PermMediaOutlinedIcon /> */}
                        <Typography variant="subtitle2" noWrap>
                            {role}
                        </Typography>
                    </Stack>
                );
            },
        },
        {
            field: "Actions",
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <MenuItem>
                            <Tooltip title="Manage">
                                <Iconify icon={'eva:settings-outline'} onClick={() => handleEdit(params.row)} />
                            </Tooltip>
                        </MenuItem>

                        <MenuItem sx={{ color: 'error.main' }}>
                            <Tooltip title="Delete">
                                <Iconify icon={'eva:trash-2-outline'} onClick={() => handleDialog(params.row)} />
                            </Tooltip>
                        </MenuItem>
                    </>
                )
            }
        }
    ];

    return (
        <>
            <Helmet>
                <title> Manage Users </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Manage Users
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddUser}>
                        Create User
                    </Button>
                </Stack>
                <Card style={{ height: 522, width: '100%' }}>
                    <DataGrid
                        rows={users}
                        checkboxSelection
                        getRowId={(row) => row.userId}
                        disableRowSelectionOnClick
                        rowHeight={75}
                        columns={columns}
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />
                </Card>
                {openDialog && (
                    <ConfirmationDialog
                        DialogContent={
                            <div>
                                Pressing 'Yes' will delete&nbsp;
                                <Typography variant="subtitle1" display="inline">
                                    {userName}
                                </Typography>
                                . Are you sure you want to proceed?
                            </div>
                        }
                        onClose={handleConfirmation}
                    />
                )}
            </Container>
        </>
    );
}
