// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  MenuItem
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { loginType } from 'src/types/auth/auth';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import AuthSocialButtons from './AuthSocialButtons';
import { useNavigate } from 'react-router-dom';
import {getAffiliated} from "../../../services/user.service"
import { useFormik } from 'formik';
import * as Yup from "yup";
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import { login } from "../../../services/auth.service"
// title="Bem vindo ao Eris"
// affiliated={affiliated}
// // subtext={
// //   <Typography variant="subtitle1" color="textSecondary" mb={1}>
// //     Your Admin Dashboard
// //   </Typography>
// // }

const SubTitle = () =>{

  return (
  <Stack direction="row" spacing={1} mt={3}>
       <Typography color="textSecondary" variant="h6" fontWeight="500">
         Novo na Eris?
       </Typography>
       <Typography
         component={Link}
         to="/auth/register"
         fontWeight="500"
         sx={{
           textDecoration: 'none',
           color: 'primary.main',
         }}
       >
         Criar sua conta
       </Typography>
     </Stack>
  )
}

// subtitle={
//   <Stack direction="row" spacing={1} mt={3}>
//     <Typography color="textSecondary" variant="h6" fontWeight="500">
//       Novo na Eris?
//     </Typography>
//     <Typography
//       component={Link}
//       to="/auth/register"
//       fontWeight="500"
//       sx={{
//         textDecoration: 'none',
//         color: 'primary.main',
//       }}
//     >
//       Criar sua conta
//     </Typography>
//   </Stack>
// }




const AuthLogin = () => {
  const navigate = useNavigate();
  const [filialUsuario, setFilialUsuario] = useState(0);
  const [nameFilial, setNameFilial] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const filiais:any  = [];
  const [apiCalled, setApiCalled] = useState(false);
  const [affiliated, setAffiliated] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const title="Bem vindo ao Eris"
  const [country, setCountry] = useState('');
  const [error, setError] = useState(false);
  const [nameStatus, setNameStatus] = useState(['Filial', 'Vendedor', 'Transportador', 'Status', 'Estoque'])
  
  useEffect(() => {
    // const userLocal = getUserLocalStorage();

    getAffiliated().then(
      (response) => {
        
        response.data.length > 0 ? (setAffiliated(response.data), setFilialUsuario(response.data[0].codigoTerceiro)): null


      setNameFilial(response.data[0].codigoTerceiro)
        console.log(response.data[0].codigoTerceiro)

      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    

    // if (userLocal) {
    //   window.location.assign("/home");
    // }
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilial(event.target.value);

  };


  const validationSchema = yup.object({
    
    userName: yup
      .string()
      .min(2, 'Muito curto!')
      .max(50, 'Muito Long!')
      .required('Usuário obrigátorio'),
    password: yup
      .string()
      .min(2, 'Muito curto')
      .required('Password é obrigatório'),
  });
  
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleLogin(values.userName, values.password)
    // console.log(nameFilial)
    //   alert(JSON.stringify(values, null, 2));
    },
    
  });



  const handleLogin = (username:any, password:any) => {

    setError(false)



    setMessage("");
    setLoading(true);


     login(username, password, nameFilial).then(
      
       (res:any) => {

        console.log('ok')
          navigate("/dashboards/modern");
          // window.location.reload();
       },
       (error:any) => {
        setError(true)

        //  const resMessage =
        //    (error.response &&
        //      error.response.data &&
        //      error.response.data.message) ||
        //    error.message ||
        //    error.toString();

        //  setLoading(false);
        //  setMessage(resMessage);
       }
     );
  };


  return (
  
<>
{error ? 
  <Welcome color='white' type='warning' title='Atenção' subtitle='Senha incorreta!'/>
: null}

    
    <Typography fontWeight="700" variant="h3" mb={1}>
      {title}
    </Typography>

    <form onSubmit={formik.handleSubmit}

    >
  <Stack>
  <Box>
  <CustomFormLabel htmlFor="standard-select-currency">Filial</CustomFormLabel>

  <CustomSelect
                      value={nameFilial}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    >
                        <MenuItem selected>{nameStatus[0]}</MenuItem>
                      {affiliated.map((option:any) => (
                        <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                          {option.nomeTerceiro}
                        </MenuItem>
                      ))}
                    </CustomSelect>
  </Box>


    <Box>
      <CustomFormLabel htmlFor="username">Usuário</CustomFormLabel>
      <CustomTextField id="username" variant="outlined" fullWidth 
       name="userName"
       value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
      />
    </Box>
    <Box>
      <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
      <CustomTextField id="password" type="password" variant="outlined" fullWidth
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.password && Boolean(formik.errors.password)}
      helperText={formik.touched.password && formik.errors.password}
      />
    </Box>
    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
      <FormGroup>
        <FormControlLabel
          control={<CustomCheckbox defaultChecked />}
          label="Me lembrar"
        />
      </FormGroup>
      <Typography
        component={Link}
        to="/auth/forgot-password"
        fontWeight="500"
        sx={{
          textDecoration: 'none',
          color: 'primary.main',
        }}
      >
        Perdeu senha?
      </Typography>
    </Stack>
  </Stack>
  <Box>
    <Button
      color="primary"
      variant="contained"
      fullWidth
      type="submit"
    >
      Login
    </Button> 
  
  </Box>
  </form>

<SubTitle />
  </>
  )
};

export default AuthLogin;
