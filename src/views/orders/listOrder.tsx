// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { forwardRef, useCallback, useContext, useEffect, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { IconEraser, IconSearch, IconRefresh } from '@tabler/icons-react';
import * as yup from "yup";
import {
  Typography,
  TableHead,
  Avatar,
  Chip,
  Box,
  Button,
  TextField,
  FormLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tooltip,
  TableContainer,
  Stack,
  Fab,
  Pagination
} from '@mui/material';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import PageContainer from 'src/components/container/PageContainer';
import { useFormik } from 'formik';
import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import img4 from 'src/assets/images/profile/user-4.jpg';
import img5 from 'src/assets/images/profile/user-5.jpg';
import {CartContext} from "src/App";
import { UserType } from 'src/types/auth/auth';

import {getAffiliated, getListSellers, getListTransporters, itensRequest, itensStock, getOrderPanel, getListSummary} from "../../services/user.service"
import BlankCard from 'src/components/shared/BlankCard';

import { InputMask, type InputMaskProps } from '@react-input/mask';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}



function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: any) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: any) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: any) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}


interface OrderType {
  orderno: string;
  items: string;
  imgsrc: any;
  customer: string;
  total: string;
  status: string;
  date: string;
}


const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Painel de Pedidos',
  },
];

const ListOrder = () => {
  let answer = useContext(CartContext)
  const [dataPage, setDataPage] = useState(answer);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filialUsuario, setFilialUsuario] = useState(0);
  const [nameFilial, setNameFilial] = useState<any>(-1);
  const [nameVendedor, setNameVendedor] = useState<any>(-1);
  const [nameTransportador, setNameTransportador] = useState<any>(-1);
  const [namePedidos, setNamePedidos] = useState<any>(false);
  const [nameStatuss, setNameStatuss] = useState<any>('');
  const [nameEstoque, setNameEstoque] = useState<any>('');
  const [nameCliente, setNameCliente] = useState<any>('');
  const [namePedido, setNamePedido] = useState<any>('');
  const [namePedidoWeb, setNamePedidoWeb] = useState<any>('');
  const [nameDataInicial, setNameDataInicial] = useState<any>('');
  const [nameDataFinal, setNameDataFinal] = useState<any>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [parameter, setParameter] = useState('');
  const [showOption, setShowOption] = useState(false);
  const [listSummary, setListSummary] = useState([]);
  const [pageFull, setPageFull] = useState(false);
  const [statusPendente, setStatusPendente] = useState(0);
  const [statusErro, setStatusErro] = useState(0);
  const [statusSeparado, setStatusSeparado] = useState(0);
  const [statusLiberado, setStatusLiberado] = useState(0);
  const [statusEtiqueta, setStatusEtiqueta] = useState(0);

  const [affiliated, setAffiliated] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [requests, setRequest] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [nameStatus, setNameStatus] = useState(['Sem Filial', 'Sem Vendedor', 'Sem Transportadora', 'Sem Status', 'Sem Estoque'])
  const [valueTable, setValueTable] = useState([]);
  const [search, setSearch] = useState(true)
  const [page, setPage] = useState(0);

  const [error, setError] = useState(false);

  const BoxStyled = styled(Box)(() => ({
    padding: '7px',
    transition: '0.1s ease-in',
    cursor: 'pointer',
    color: 'inherit',
    '&:hover': {
      transform: 'scale(1.03)',
    },
  }));

  
  const [errors, setErros] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState<UserType>()
  const [amount, setAmount] = useState(0)
  const [opened, setOpened] = useState(false)
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
 

  const ForwardedInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props:any, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask=""  {...props} />;
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any,) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {

    

    getAffiliated().then(
      (response) => {
        
        setRequest(itensRequest)
        setStocks(itensStock)
        
        response.data.length > 0 ? setAffiliated(response.data): null
        getListSellers().then(
          (response) => {
            response.data.length > 0 ? setSellers(response.data): null
            getListTransporters().then(
              (response) => {
                response.data.length > 0 ? setTransporters(response.data): null
      
                getListSummary(answer.user.filialUsuario, answer.user.userName).then(
                  (response)=>{
                    console.log(response)

          

                    let resp = response.data.filter((val:any)=>val.statusNome == 'Pendente')
                    setStatusPendente(resp[0]['statusRegistros'])
                    let resp2 = response.data.filter((val:any)=>val.statusNome == 'Erro Autorização')
                    console.log(resp2)
                    setStatusErro(resp2[0]['statusRegistros'])
                    let resp3 = response.data.filter((val:any)=>val.statusNome == 'Em Separação')
                    setStatusSeparado(resp3[0]['statusRegistros'])
                    let resp4 = response.data.filter((val:any)=>val.statusNome == 'Liberado Expedição')
                    setStatusLiberado(resp4[0]['statusRegistros'])
                    let resp5 = response.data.filter((val:any)=>val.statusNome == 'Etiqueta Liberada')
                    setStatusEtiqueta(resp5[0]['statusRegistros'])
                    
                    setListSummary(response.data)

  
                    // setPage(true)
                    setSearch(false)
                  },
                  (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
                )
              },
              (error) => {
                const _content =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
              }
            );

          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );

      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
   
  }, []);



  React.useCallback

  const handleChangeFilial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilial(event.target.value);
  };

  const handleChangeVendedor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameVendedor(event.target.value);
  };

  const handleChangetransportador = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameTransportador(event.target.value);
  };

  const handleChangePedidos = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePedidos(!namePedidos)
 };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameStatuss(event.target.value);
  };

  const handleChangeEstoque = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameEstoque(event.target.value);
  };

  const handleChangeCliente = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameCliente(event.target.value);
  };

  const handleChangePedido = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePedido(event.target.value);
  };

  const handleChangePedidoWeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePedidoWeb(event.target.value);
  }

  const handleChangeDataInicial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameDataInicial(event.target.value);
  };

  const handleChangeDataFinal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameDataFinal(event.target.value);
  };


  const handleSearch = () => {
 
    console.log(nameFilial)
    if (nameFilial == -1){
      setError(true)
      return
    }
    setErros(false)
    setSearch(true)
    setCurrentPage(1)
    
     let parameter = `codigoFilial=${nameFilial}`

    nameVendedor >= 0 ? parameter = parameter + `&codigoVendedor=${nameVendedor}` : null
    nameTransportador >= 0 ? parameter = parameter + `&codigoTransportadora=${nameTransportador}`: null
    namePedidos != false ? parameter = parameter + `&soPedidosInternet=${1}` : parameter = parameter + `&soPedidosInternet=${0}`
    nameStatuss >= '' ? parameter = parameter + `&statusPainel=${nameStatuss}` : null
    nameEstoque >= 0 ? parameter = parameter + `&statusEstoque=${nameEstoque}` : null
    nameCliente != '' ? parameter = parameter + `&cliente=${nameCliente}` : null
    namePedido != '' ? parameter = parameter + `&pedido=${namePedido}` : null
    namePedidoWeb != '' ? parameter = parameter + `&pedidoWeb=${namePedidoWeb}` : null
    nameDataInicial != '' ? parameter = parameter + `&dataInicial=${nameDataInicial}` : null
    nameDataFinal != '' ? parameter = parameter + `&dataFinal=${nameDataFinal}` : null

    console.log(nameStatuss)
     setParameter(parameter)

     parameter = parameter + `&numeroPagina=1&tamanhoPagina=7&usuario=${dataPage.user?.userName}`

     getOrderPanel(parameter).then(
       (response) => {
        console.log(response.data);
         response.data.map((value:any)=>{
           let year =value.datahoraCadastro.substring(0, 4);
           let month =value.datahoraCadastro.substring(5, 7);
           let day =value.datahoraCadastro.substring(8, 10);

           let hours = value.datahoraCadastro.substring(11, 16);

           let data = `${day}/${month}/${year} ${hours}`
           value.datahoraCadastro = data
         })

         setValueTable(response.data)
         setAmount(response.data[0].totalRegistros)
         setSearch(false)
         setErros(false)

         setTotalPages(Math.ceil(response.data[0].totalRegistros / 10));
         const startIndex = (currentPage - 1) * 10;
         const endIndex = startIndex + 10;
         const currentItems = response.data.slice(startIndex, endIndex);
         refresh()
        },
       (error) => {
         const _content =
           (error.response && error.response.data) ||
           error.message ||
           error.toString();
           setValueTable([])
           setSearch(false)
           setErros(true)
           setErrorMessage('Nenhum registro encontrado!')

       }
     );

  };

  const reload = () =>{
    getListSummary(answer.user.filialUsuario, answer.user.userName).then(
      (response)=>{
        console.log(response)
        let resp = response.data.filter((val:any)=>val.statusNome == 'Pendente')
        setStatusPendente(resp[0]['statusRegistros'])
        let resp2 = response.data.filter((val:any)=>val.statusNome == 'Erro Autorização')
        setStatusErro(resp2[0]['statusRegistros'])
        let resp3 = response.data.filter((val:any)=>val.statusNome == 'Em Separação')
        setStatusSeparado(resp3[0]['statusRegistros'])
        let resp4 = response.data.filter((val:any)=>val.statusNome == 'Liberado Expedição')
        setStatusLiberado(resp4[0]['statusRegistros'])
        let resp5 = response.data.filter((val:any)=>val.statusNome == 'Etiqueta Liberada')
        setStatusEtiqueta(resp5[0]['statusRegistros'])
        
        setListSummary(response.data)


        // setPage(true)
        setSearch(false)
      },
      (error) => {
    const _content =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
  }
    )
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    let newPage = value
    setErros(false)
    setSearch(true)
    setCurrentPage(newPage);

    let answer = parameter + `&numeroPagina=${newPage}&tamanhoPagina=10&usuario=${dataPage.user?.userName}`
    getOrderPanel(answer).then(
      (response) => {
        response.data.map((value:any)=>{
          let year =value.datahoraCadastro.substring(0, 4);
          let month =value.datahoraCadastro.substring(5, 7);
          let day =value.datahoraCadastro.substring(8, 10);
          let hours = value.datahoraCadastro.substring(11, 16);
          let data = `${day}/${month}/${year} ${hours}`
          value.datahoraCadastro = data
        })
        setValueTable(response.data)
        setAmount(response.data[0].totalRegistros)
        setSearch(false)
        setErros(false)
        setTotalPages(Math.ceil(response.data[0].totalRegistros / 10));
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const currentItems = response.data.slice(startIndex, endIndex);
       },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
          setValueTable([])
          setSearch(false)
          setErros(true)
          setErrorMessage('Nenhum registro encontrado!')

      }
    );
  };

  const clean = () =>{
    setNameFilial(-1);
    setNameVendedor(-1);
    setNameTransportador(-1);
    setNamePedidos(false);
    setNameStatuss(-1);
    setNameEstoque(-1);
    setNameCliente('');
    setNamePedido('');
    setNamePedidoWeb('');
    setNameDataInicial('');
    setNameDataFinal('');
     setTimeout(() => {
      //  setPage(true)
     }, 10);
  }

  const refresh = () =>{
    getListSummary(answer.user.filialUsuario, answer.user.userName).then(
      (response)=>{
        setListSummary(response.data)
        // setPage(true)
      },
      (error) => {
    const _content =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
  }
    )
  }


  const clickStatus = (name:any) =>{

    if (nameFilial == -1){
      setError(true)
      return
    }
    setErros(false)
    setSearch(true)
    setCurrentPage(1)
    
     let parameter = `codigoFilial=${nameFilial}&statusPainel=${name}`

      setParameter(parameter)

      parameter = parameter + `&numeroPagina=1&tamanhoPagina=7&usuario=${dataPage.user?.userName}`

      getOrderPanel(parameter).then(
        (response) => {
         console.log(response.data);
          response.data.map((value:any)=>{
            let year =value.datahoraCadastro.substring(0, 4);
            let month =value.datahoraCadastro.substring(5, 7);
            let day =value.datahoraCadastro.substring(8, 10);

            let hours = value.datahoraCadastro.substring(11, 16);

            let data = `${day}/${month}/${year} ${hours}`
            value.datahoraCadastro = data
          })

          console.log(response.data)
          setValueTable(response.data)
          setAmount(response.data[0].totalRegistros)
          setSearch(false)
          setErros(false)

          setTotalPages(Math.ceil(response.data[0].totalRegistros / 10));
          const startIndex = (currentPage - 1) * 10;
          const endIndex = startIndex + 10;
          const currentItems = response.data.slice(startIndex, endIndex);
          refresh()
         },
        (error) => {
          const _content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            setValueTable([])
            setSearch(false)
            setErros(true)
            setErrorMessage('Nenhum registro encontrado!')

        }
      );
  }

  return (
    <>
      {error ? 
      <Welcome color='white' type='warning' title='Atenção' subtitle='Filial é obrigatório!'/>
    : null}
 
    <PageContainer title="Painel de Pedidos" description="this is Pagination Table page">
      {/* breadcrumb */}
      {/* <Breadcrumb title="Pagination Table" items={BCrumb} /> */}
      {/* end breadcrumb */}
 
    
 
      <Grid item xs={12} sm={8}>

      <Box>
      <Grid container spacing={1} style={{position: 'relative', top: '-30px'}}>

      <Grid item xs={12} sm={2}>
            <CustomFormLabel htmlFor="standard-select-currency">Filial</CustomFormLabel>
                <CustomSelect
                      value={nameFilial}
                      onChange={handleChangeFilial}
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="-1">{nameStatus[0]}</MenuItem>
                      {affiliated.map((option:any) => (
                        <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                          {option.nomeTerceiro}
                        </MenuItem>
                      ))}
                    </CustomSelect>

             </Grid>
             <Grid item xs={12} sm={2}>
              
              <CustomFormLabel htmlFor="standard-select-currency">Vendedor</CustomFormLabel>
                <CustomSelect
                      value={nameVendedor}
                      onChange={handleChangeVendedor}
                      fullWidth
                      variant="outlined"
                    >
                       <MenuItem value="-1">{nameStatus[1]}</MenuItem>
                      {sellers.map((option:any) => (
                        <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                          {option.nomeTerceiro}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                <CustomFormLabel htmlFor="standard-select-currency">Transportadora</CustomFormLabel>
                <CustomSelect
                      value={nameTransportador}
                      onChange={handleChangetransportador}
                      fullWidth
                      variant="outlined"
                    >
                      <MenuItem value="-1">{nameStatus[2]}</MenuItem>
                      {transporters.map((option:any) => (
                        <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                          {option.nomeTerceiro}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={1}>
                <FormControlLabel
                style={{position: 'relative', width: '100%', top: '40px'}}
      control={
        <CustomCheckbox
          onChange={handleChangePedidos}
          defaultChecked={namePedidos}
          color="primary"
          inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
      }
      label="Só Pedidos Internet"
    />
                </Grid>
                <Grid item xs={12} sm={2}>
                <CustomFormLabel htmlFor="standard-select-currency">Status</CustomFormLabel>
                <CustomSelect
                      value={nameStatuss}
                      onChange={handleChangeStatus}
                      fullWidth
                      variant="outlined"
                    >
                <MenuItem value="-1">{nameStatus[3]}</MenuItem>
                      {requests.map((option:any) => (
                        <MenuItem key={option.codigoTerceiro} value={option.nomeTerceiro}>
                          {option.nomeTerceiro}
                        </MenuItem>
                      ))}
                    </CustomSelect>
                  </Grid>


                  <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px', textAlign: 'center'}}>
              <Tooltip  title="Pesquisar" >
        <Fab  color="primary" onClick={()=>handleSearch()} aria-label="send">
          <IconSearch width={20} />
        </Fab>
      </Tooltip>


    </Grid>

    <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px', textAlign: 'center'}}>
    <Tooltip title="Carregar">
        <Fab color="primary" onClick={()=>reload()}>
          <IconRefresh width={20} />
        </Fab>
      </Tooltip>


    </Grid>

    <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px', textAlign:'center'}}>
    <Tooltip title="Limpar" onClick={()=> clean()}>
        <Fab color="error" >
          <IconEraser width={20} />
        </Fab>
      </Tooltip>
    </Grid>
                  

         
                </Grid>

       </Box>
       <Box>
      
       <Grid container spacing={1} style={{position: 'relative', top: '-40px'}}>
       <Grid item xs={12} lg={1}>



<CustomFormLabel htmlFor="standard-select-currency">Estoque</CustomFormLabel>
<CustomSelect
      value={nameEstoque}
      onChange={handleChangeEstoque}
      fullWidth
      variant="outlined"
    >
      <MenuItem value="-1">{nameStatus[4]}</MenuItem>
      {stocks.map((option:any) => (
        <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
          {option.nomeTerceiro}
        </MenuItem>
      ))}
    </CustomSelect>
</Grid>
<Grid item xs={12} lg={2}>
                <CustomFormLabel htmlFor="standard-select-currency">Cliente</CustomFormLabel>
                <CustomTextField id="password" value={nameCliente} onChange={handleChangeCliente} type="text" variant="outlined" fullWidth
      
      />
                </Grid>
                <Grid item xs={12} lg={1}>
                <CustomFormLabel htmlFor="standard-select-currency">Pedido</CustomFormLabel>
                <CustomTextField id="password" value={namePedido} onChange={handleChangePedido} type="text" variant="outlined" fullWidth
      
      />
                </Grid>
                <Grid item xs={12} lg={1}>
                <CustomFormLabel style={{fontSize: '10pt'}} htmlFor="standard-select-currency">Pedido Web</CustomFormLabel>
                <CustomTextField id="password" value={namePedidoWeb} onChange={handleChangePedidoWeb} type="text" variant="outlined" fullWidth
      
      />
                </Grid>
                <Grid item xs={12} lg={1}>
                <CustomFormLabel htmlFor="standard-select-currency">Data Inicial</CustomFormLabel>
                <CustomTextField id="password" type="text" value={nameDataInicial} onChange={handleChangeDataInicial} variant="outlined" fullWidth
      
      />
                </Grid>

                <Grid item xs={12} lg={1}>
                <CustomFormLabel htmlFor="standard-select-currency">Data Final</CustomFormLabel>
                <CustomTextField  variant="outlined" fullWidth
      value={nameDataFinal} onChange={handleChangeDataFinal}
      />
                </Grid>

                <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px'}} >
                <BoxStyled

// onClick={() => dispatch(setVisibilityFilter('Open'))}
sx={{ backgroundColor: 'success.light', color: 'success.main' }}
onClick={()=>clickStatus('Liberado Expedição')}
>
<Typography style={{fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600}}>Expedição</Typography>
<Typography style={{fontSize: '12pt', textAlign: 'center',fontWeight: 600}}>{statusLiberado}</Typography>
</BoxStyled>   
</Grid>
<Grid item xs={12} sm={1} style={{position: 'relative', top: '45px'}}>
<BoxStyled
// onClick={() => dispatch(setVisibilityFilter('Open'))}
sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }}
onClick={()=>clickStatus('Etiqueta Liberada')}
>
<Typography style={{fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600}}>Etiquetas</Typography>
<Typography style={{fontSize: '12pt', textAlign: 'center', fontWeight: 600}}>{statusEtiqueta}</Typography>
</BoxStyled> 
             
              </Grid> 
              <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px'}}>

<BoxStyled
// onClick={() => dispatch(setVisibilityFilter('Open'))}
onClick={()=>clickStatus('Pendente')}
sx={{ backgroundColor: 'warning.light', color: 'warning.main' }}
>
<Typography style={{fontSize: '9pt', textAlign: 'center', fontWeight: 600}}>Pendente</Typography>

<Typography style={{fontSize: '12pt', textAlign: 'center', fontWeight: 600}}>{statusPendente}</Typography>
</BoxStyled>

</Grid>
<Grid item xs={12} sm={1} style={{position: 'relative', top: '45px', }}>

<BoxStyled
// onClick={() => dispatch(setVisibilityFilter('Open'))}
onClick={()=>clickStatus('Erro Autorização')}
sx={{ backgroundColor: 'error.light', color: 'error.main' }}
>
<Typography style={{fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600}}>Erro</Typography>
<Typography style={{fontSize: '12pt', textAlign: 'center', fontWeight: 600}}>{statusErro}</Typography>
</BoxStyled>      
 </Grid>

 <Grid item xs={12} sm={1} style={{position: 'relative', top: '45px', }}>

<BoxStyled
// onClick={() => dispatch(setVisibilityFilter('Open'))}
onClick={()=>clickStatus('Em Separação')}
sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
>
<Typography style={{fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600}}>Separação</Typography>
<Typography style={{fontSize: '12pt', textAlign: 'center', fontWeight: 600}}>{statusSeparado}</Typography>
</BoxStyled>      
</Grid>
    

        </Grid>
       </Box>
  </Grid>

          
              
                {/* <Grid item xs={12} lg={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                    type="submit"
                 
                  >
                    Pesquisar
                  </Button>
                  <Button variant="contained" color="error">
      
                  </Button>
                </Grid>
       */}




         <BlankCard>
          <TableContainer>
          {valueTable.length > 0  ?
            <>
            <Table
              aria-label="custom pagination table"
              sx={{
                whiteSpace: 'nowrap',
              }}
            >
              <TableHead>
                <TableRow>

                <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>FILIAL</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>Nº DA NOTA</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>PEDIDO</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>DATA/HORA CADASTRO</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>PEDIDO WEB</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>CLIENTE</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>VENDEDOR</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>TRANSPORTADORA</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>STATUS</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>ESTOQUE</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '8pt', fontWeight: '600', textAlign: 'center'}}>VALOR TOTAL</Typography>
                  </TableCell>
          
                </TableRow>
              </TableHead>
              <TableBody>
              {valueTable.map((response:any, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.filial}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.numeroNF}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.pedido}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.datahoraCadastro}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.pedidoWeb}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.cliente}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.vendedor == "" ? 'Não tem' : response.vendedor}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.transportadora == "" ? 'Não tem' : response.transportadora}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.statusPainel}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.statusEstoque}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.valortotalPedido}</Typography>
                    </TableCell>
                  {/*  <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        {row.items}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6" fontWeight="400">
                        ${row.total}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{row.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          row.status === 'Completed'
                            ? 'success'
                            : row.status === 'Pending'
                              ? 'warning'
                              : row.status === 'Cancel'
                                ? 'error'
                                : 'secondary'
                        }
                        sx={{
                          borderRadius: '6px',
                        }}
                        size="small"
                        label={row.status}
                      />
                    </TableCell> */}
                  </TableRow>
                ))}

                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody> 
              <TableFooter>
                {/* <TableRow> 
                {valueTable.map((row) => (
                
                <TableCell scope="row">
                  <Typography variant="subtitle1" color="textPrimary" fontWeight={600}>
                    
                  </Typography>
                </TableCell>
                ))}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={valueTable.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  /> 
                </TableRow> */}
              </TableFooter> 
            </Table>
            <Pagination style={{position: 'relative', top: '2px', marginBottom: '10px'}}  count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        
            </>
            : null}
          </TableContainer>
        </BlankCard>  
     
  
    </PageContainer>
    </>
  );
};

export default ListOrder;
