import { toast } from "react-toastify";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// @mui
import {
    Card,
    Stack,
    InputAdornment,
    IconButton,
    Container,
    Typography,
    Box,
    Button,
    TextField,
    useMediaQuery,
    MenuItem
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// formIk
import { Formik } from "formik";
import * as yup from "yup";
// components
import BreadCrumb from "../../../components/breadcrumb/Breadcrumb";
// services
import { ROLE_ADMIN, ROLE_USER } from "../../../services/constants"
import { registerUser, updateUser } from "../../../services/api-service";

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function User() {

    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const location = useLocation();
    const userDetails = location.state;
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const [role, setRole] = useState(userDetails ? userDetails.role : "");

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    const roleList = [
        {
            value: ROLE_ADMIN,
            label: 'Admin'
        },
        {
            value: ROLE_USER,
            label: 'User'
        }
    ];

    const initialValues = {
        userId: userDetails ? userDetails.userId : "",
        fullName: userDetails ? userDetails.fullName : "",
        email: userDetails ? userDetails.email : "",
        mobileNumber: userDetails ? userDetails.mobileNumber : "",
        password: userDetails ? userDetails.password : "",
        role: userDetails ? userDetails.role : "",
    };

    const handleFormSubmit = async (formDetails) => {
        try {
            if (formDetails.userId && validateValues(formDetails)) {
                const updateUserResponse = await updateUser(formDetails);
                toast.success(updateUserResponse);
                navigate(-1);
            } else if (!formDetails.userId) {
                const registerUserResponse = await registerUser(formDetails);
                toast.success(registerUserResponse);
                navigate(-1);
            }
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const validateValues = (formValues) => {
        if (
            initialValues.fullName === formValues.fullName
            && initialValues.mobileNumber === formValues.mobileNumber
            && initialValues.email === formValues.email
            && initialValues.password === formValues.password
            && initialValues.role === formValues.role
        ) {
            toast.warn("Nothing to Update")
            return false;
        }
        return true;
    }

    const handleSelectRole = (event) => {
        setRole(event.target.value);
    };


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Helmet>
                <title>{userDetails ? "Update User" : "Create User"}</title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {userDetails ? "Update User" : "Create User"}
                    </Typography>
                </Stack>
                <BreadCrumb />
                <Stack spacing={3}>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => {
                            return (
                                <form onSubmit={handleSubmit} id="addUser">
                                    <Card>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 3" },
                                                margin: "25px",
                                            }}
                                        >
                                            <TextField
                                                required
                                                fullWidth
                                                variant="outlined"
                                                type="text"
                                                id="fullName"
                                                label="Full Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="fullName"
                                                value={values.fullName}
                                                error={!!touched.fullName && !!errors.fullName}
                                                helperText={touched.fullName && errors.fullName}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                required
                                                fullWidth
                                                autoComplete='true'
                                                variant="outlined"
                                                type="text"
                                                id="email"
                                                label="Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="email"
                                                value={values.email}
                                                error={!!touched.email && !!errors.email}
                                                helperText={touched.email && errors.email}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                fullWidth
                                                required
                                                variant="outlined"
                                                type="text"
                                                id="mobileNumber"
                                                label="Mobile Number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                name="mobileNumber"
                                                value={values.mobileNumber}
                                                error={!!touched.mobileNumber && !!errors.mobileNumber}
                                                helperText={touched.mobileNumber && errors.mobileNumber}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                fullWidth
                                                required
                                                name="password"
                                                label="Password"
                                                value={values.password}
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                variant="outlined"
                                                autoComplete="current-password"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}
                                                sx={{ gridColumn: "span 1" }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                select
                                                id="role"
                                                name="role"
                                                label="Select role *"
                                                value={role}
                                                onBlur={handleBlur}
                                                onChange={(e) => { handleChange(e); handleSelectRole(e) }}
                                                error={!!touched.role && !!errors.role}
                                                helperText={touched.role && errors.role}
                                                variant="outlined"
                                            >
                                                {roleList.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Box>
                                    </Card>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            {userDetails ? "Update" : "Create"}
                                        </Button>
                                    </Box>

                                </form>
                            );
                        }}
                    </Formik>
                </Stack>
            </Container>
        </>
    );
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const phoneRegExp = "[6-9]{1}[0-9]{9}";
const NameRegex = "^[a-zA-Z]{2,40} [a-zA-Z]{2,40}$";
const EmailRegex = /^[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("required").matches(NameRegex, "Enter last name"),
    email: yup.string().email("invalid email").required("required").matches(EmailRegex, "Email is not valid"),
    mobileNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .length(10, "Mobile number must be 10 digits long")
        .required("required"),
    password: yup.string().required("required")
        .min(8, "Minimum length of 8 is required")
        .max(12, "Maximum length of 12 is required")
        .matches(/[a-zA-Z]/, "Must contain alphabet")
        .matches(/\d/, "Must contain digit")
        .matches(/[!@#$%^&*]/, "Must contain special character"),
    role: yup.string()
        .required('Please assign role')
});
