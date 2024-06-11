// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import { IconEraser, IconSearch, IconRefresh } from '@tabler/icons-react';
import {
  Typography,
  TableHead,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  MenuItem,
  FormControlLabel,
  Tooltip,
  TableContainer,
  Fab,
  Pagination
} from '@mui/material';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import PageContainer from 'src/components/container/PageContainer';
import { CartContext } from "src/App";
// import { UserType } from 'src/types/auth/auth';

import { getAffiliated, getListSellers, getListTransporters, itensRequest, itensStock, getOrderPanel, getListSummary } from "../../services/user.service"
import BlankCard from 'src/components/shared/BlankCard';



const ListOrder = () => {
  let answer = useContext(CartContext)
  const [dataPage] = useState(answer);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [filialUsuario, setFilialUsuario] = useState(0);
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
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [parameter, setParameter] = useState('');
  // const [showOption, setShowOption] = useState(false);
  // const [listSummary, setListSummary] = useState([]);
  // const [pageFull, setPageFull] = useState(false);
  const [statusPendente, setStatusPendente] = useState(0);
  const [statusErro, setStatusErro] = useState(0);
  const [statusSeparado, setStatusSeparado] = useState(0);
  const [statusLiberado, setStatusLiberado] = useState(0);
  const [statusEtiqueta, setStatusEtiqueta] = useState(0);
  const [statusProtocolo, setStatusProtocolo] = useState(0);

  const [affiliated, setAffiliated] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [transporters, setTransporters] = useState([]);
  const [requests, setRequest] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [nameStatus] = useState(['Sem Filial', 'Sem Vendedor', 'Sem Transportadora', 'Sem Status', 'Sem Estoque'])
  const [valueTable, setValueTable] = useState([]);
  // const [search, setSearch] = useState(true)
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

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };


  useEffect(() => {



    getAffiliated().then(
      (response) => {

        setRequest(itensRequest)
        setStocks(itensStock)

        response.data.length > 0 ? setAffiliated(response.data) : null
        getListSellers().then(
          (response) => {
            console.log(response.data.length)
            response.data.length > 0 ? setSellers(response.data) : null
            getListTransporters().then(
              (response) => {
                response.data.length > 0 ? setTransporters(response.data) : null

                getListSummary(answer.user.filialUsuario, answer.user.userName).then(
                  (response) => {
                    console.log(response)



                    let resp = response.data.filter((val: any) => val.statusNome == 'Pendente')
                    setStatusPendente(resp[0]['statusRegistros'])
                    let resp2 = response.data.filter((val: any) => val.statusNome == 'Erro Autorização')
                    console.log(resp2)
                    setStatusErro(resp2[0]['statusRegistros'])
                    let resp3 = response.data.filter((val: any) => val.statusNome == 'Em Separação')
                    setStatusSeparado(resp3[0]['statusRegistros'])
                    let resp4 = response.data.filter((val: any) => val.statusNome == 'Liberado Expedição')
                    setStatusLiberado(resp4[0]['statusRegistros'])
                    let resp5 = response.data.filter((val: any) => val.statusNome == 'Etiqueta Liberada')
                    setStatusEtiqueta(resp5[0]['statusRegistros'])
                    let resp6 = response.data.filter((val: any) => val.statusNome == 'Sem XML Protocolo')
                    setStatusProtocolo(resp6[0]['statusRegistros'])

                    // setListSummary(response.data)


                    // setPage(true)
                    // setSearch(false)
                  },
                  //     (error) => {
                  //   const _content =
                  //     (error.response && error.response.data) ||
                  //     error.message ||
                  //     error.toString();
                  // }
                )
              },
              // (error) => {
              //   const _content =
              //     (error.response && error.response.data) ||
              //     error.message ||
              //     error.toString();
              // }
            );

          },
          // (error) => {
          //   const _content =
          //     (error.response && error.response.data) ||
          //     error.message ||
          //     error.toString();
          // }
        );

      },
      // (error) => {
      //   const _content =
      //     (error.response && error.response.data) ||
      //     error.message ||
      //     error.toString();
      // }
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

  const handleChangePedidos = () => {
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
    if (nameFilial == -1) {
      setError(true)
      return
    }
    // setErros(false)
    // setSearch(true)
    // setCurrentPage(1)

    let parameter = `codigoFilial=${nameFilial}`

    nameVendedor >= 0 ? parameter = parameter + `&codigoVendedor=${nameVendedor}` : null
    nameTransportador >= 0 ? parameter = parameter + `&codigoTransportadora=${nameTransportador}` : null
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
        response.data.map((value: any) => {
          let year = value.datahoraCadastro.substring(0, 4);
          let month = value.datahoraCadastro.substring(5, 7);
          let day = value.datahoraCadastro.substring(8, 10);

          let hours = value.datahoraCadastro.substring(11, 16);

          let data = `${day}/${month}/${year} ${hours}`
          value.datahoraCadastro = data
        })

        setValueTable(response.data)
        //  setAmount(response.data[0].totalRegistros)
        //  setSearch(false)
        //  setErros(false)

        setTotalPages(Math.ceil(response.data[0].totalRegistros / 7));
        //  const startIndex = (currentPage - 1) * 10;
        //  const endIndex = startIndex + 10;
        //  const currentItems = response.data.slice(startIndex, endIndex);
        reload()
      },
      //  (error) => {
      //    const _content =
      //      (error.response && error.response.data) ||
      //      error.message ||
      //      error.toString();
      //      setValueTable([])
      //     //  setSearch(false)
      //     //  setErros(true)
      //     //  setErrorMessage('Nenhum registro encontrado!')

      //  }
    );

  };

  const reload = () => {
    getListSummary(answer.user.filialUsuario, answer.user.userName).then(
      (response) => {
        console.log(response)
        let resp = response.data.filter((val: any) => val.statusNome == 'Pendente')
        setStatusPendente(resp[0]['statusRegistros'])
        let resp2 = response.data.filter((val: any) => val.statusNome == 'Erro Autorização')
        setStatusErro(resp2[0]['statusRegistros'])
        let resp3 = response.data.filter((val: any) => val.statusNome == 'Em Separação')
        setStatusSeparado(resp3[0]['statusRegistros'])
        let resp4 = response.data.filter((val: any) => val.statusNome == 'Liberado Expedição')
        setStatusLiberado(resp4[0]['statusRegistros'])
        let resp5 = response.data.filter((val: any) => val.statusNome == 'Etiqueta Liberada')
        setStatusEtiqueta(resp5[0]['statusRegistros'])
        let resp6 = response.data.filter((val: any) => val.statusNome == 'Sem XML Protocolo')
        setStatusProtocolo(resp6[0]['statusRegistros'])

        // setListSummary(response.data)


        // setPage(true)
        // setSearch(false)
      },
      //     (error) => {
      //   const _content =
      //     (error.response && error.response.data) ||
      //     error.message ||
      //     error.toString();
      // }
    )
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    let newPage = value
    event;
    // setErros(false)
    // setSearch(true)
    // setCurrentPage(newPage);

    let answer = parameter + `&numeroPagina=${newPage}&tamanhoPagina=7&usuario=${dataPage.user?.userName}`
    getOrderPanel(answer).then(
      (response) => {
        response.data.map((value: any) => {
          let year = value.datahoraCadastro.substring(0, 4);
          let month = value.datahoraCadastro.substring(5, 7);
          let day = value.datahoraCadastro.substring(8, 10);
          let hours = value.datahoraCadastro.substring(11, 16);
          let data = `${day}/${month}/${year} ${hours}`
          value.datahoraCadastro = data
        })
        setValueTable(response.data)
        // setAmount(response.data[0].totalRegistros)
        // setSearch(false)
        // setErros(false)
        setTotalPages(Math.ceil(response.data[0].totalRegistros / 7));
        // const startIndex = (currentPage - 1) * 10;
        // const endIndex = startIndex + 10;
        // const currentItems = response.data.slice(startIndex, endIndex);
      },
      // (error) => {
      //   const _content =
      //     (error.response && error.response.data) ||
      //     error.message ||
      //     error.toString();
      //     setValueTable([])
      //     setSearch(false)
      //     setErros(true)
      //     setErrorMessage('Nenhum registro encontrado!')

      // }
    );
  };

  const clean = () => {
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

  // const refresh = () =>{
  //   getListSummary(answer.user.filialUsuario, answer.user.userName).then(
  //     (response)=>{
  //       setListSummary(response.data)
  //       // setPage(true)
  //     },
  //     (error) => {
  //   const _content =
  //     (error.response && error.response.data) ||
  //     error.message ||
  //     error.toString();
  // }
  //   )
  // }


  const clickStatus = (name: any) => {

    console.log(name)
    if (nameFilial == -1) {
      setError(true)
      return
    }
    // setErros(false)
    // setSearch(true)
    // setCurrentPage(1)

    let parameter = `codigoFilial=${nameFilial}&statusPainel=${name}`

    setParameter(parameter)

    parameter = parameter + `&numeroPagina=1&tamanhoPagina=7&usuario=${dataPage.user?.userName}`

    getOrderPanel(parameter).then(
      (response) => {
        console.log(response.data);
        response.data.map((value: any) => {
          let year = value.datahoraCadastro.substring(0, 4);
          let month = value.datahoraCadastro.substring(5, 7);
          let day = value.datahoraCadastro.substring(8, 10);

          let hours = value.datahoraCadastro.substring(11, 16);

          let data = `${day}/${month}/${year} ${hours}`
          value.datahoraCadastro = data
        })

        console.log(response.data)
        setValueTable(response.data)
        // setAmount(response.data[0].totalRegistros)
        // setSearch(false)
        // setErros(false)

        setTotalPages(Math.ceil(response.data[0].totalRegistros / 7));
        // const startIndex = (currentPage - 1) * 10;
        // const endIndex = startIndex + 10;
        // const currentItems = response.data.slice(startIndex, endIndex);
        // refresh()
      },
      // (error) => {
      // const _content =
      //   (error.response && error.response.data) ||
      //   error.message ||
      //   error.toString();
      //   setValueTable([])
      //   setSearch(false)
      //   setErros(true)
      //   setErrorMessage('Nenhum registro encontrado!')

      // }
    );
  }

  return (
    <>
       {error ?
        <Welcome color='white' type='warning' title='Atenção' subtitle='Filial é obrigatório!' />
        : null}
 
        <Grid item xs={12} sm={8} style={{ marginBottom: '-20px' }}>
           <Box>
            <Grid container spacing={1} style={{ position: 'relative', top: '-30px' }}>

              <Grid item xs={12} sm={2}>
                <CustomFormLabel htmlFor="standard-select-currency">Filial</CustomFormLabel>
                <CustomSelect
                  value={nameFilial}
                  onChange={handleChangeFilial}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="-1">{nameStatus[0]}</MenuItem>
                  {affiliated.map((option: any) => (
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
                  {transporters.map((option: any) => (
                    <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                      {option.nomeTerceiro}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>  *
              <Grid item xs={12} sm={2}>
                <CustomFormLabel htmlFor="standard-select-currency">Transportadora</CustomFormLabel>
                <CustomSelect
                  value={nameTransportador}
                  onChange={handleChangetransportador}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="-1">{nameStatus[2]}</MenuItem>
                  {transporters.map((option: any) => (
                    <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
                      {option.nomeTerceiro}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              <Grid item xs={12} sm={1}>
                <FormControlLabel
                  style={{ position: 'relative', width: '100%', top: '40px' }}
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
                  {requests.map((option: any) => (
                    <MenuItem key={option.codigoTerceiro} value={option.nomeTerceiro}>
                      {option.nomeTerceiro}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>


              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px', textAlign: 'center' }}>
                <Tooltip title="Pesquisar" >
                  <Fab color="primary" onClick={() => handleSearch()} aria-label="send">
                    <IconSearch width={20} />
                  </Fab>
                </Tooltip>


              </Grid>

              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px', textAlign: 'center' }}>
                <Tooltip title="Carregar">
                  <Fab color="primary" onClick={() => reload()}>
                    <IconRefresh width={20} />
                  </Fab>
                </Tooltip>


              </Grid>

              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px', textAlign: 'center' }}>
                <Tooltip title="Limpar" onClick={() => clean()}>
                  <Fab color="error" >
                    <IconEraser width={20} />
                  </Fab>
                </Tooltip>
              </Grid>



            </Grid>

          </Box> 
          
          
          
          
          
          
          <Box>

            <Grid container spacing={1} style={{ position: 'relative', top: '-40px' }}>
              <Grid item xs={12} lg={1}>



                <CustomFormLabel htmlFor="standard-select-currency">Estoque</CustomFormLabel>
                <CustomSelect
                  value={nameEstoque}
                  onChange={handleChangeEstoque}
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem value="-1">{nameStatus[4]}</MenuItem>
                  {stocks.map((option: any) => (
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
                <CustomFormLabel style={{ fontSize: '10pt' }} htmlFor="standard-select-currency">Pedido Web</CustomFormLabel>
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
                <CustomTextField variant="outlined" fullWidth
                  value={nameDataFinal} onChange={handleChangeDataFinal}
                />
              </Grid>

              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px' }} >
                <BoxStyled

                  sx={{ backgroundColor: 'success.light', color: 'success.main' }}
                  onClick={() => clickStatus('Liberado para Expedição')}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600 }}>Expedição</Typography>
                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusLiberado}</Typography>
                </BoxStyled>
              </Grid>
              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px' }}>
                <BoxStyled
                  sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }}
                  onClick={() => clickStatus('Etiqueta Liberada')}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600 }}>Protocolos</Typography>
                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusProtocolo}</Typography>
                </BoxStyled>

              </Grid>


              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px' }}>
                <BoxStyled
                  sx={{ backgroundColor: 'secondary.light', color: 'secondary.main' }}
                  onClick={() => clickStatus('Etiqueta Liberada')}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600 }}>Etiquetas</Typography>
                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusEtiqueta}</Typography>
                </BoxStyled>

              </Grid>
              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px' }}>

                <BoxStyled
                  onClick={() => clickStatus('Pendente')}
                  sx={{ backgroundColor: 'warning.light', color: 'warning.main' }}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', fontWeight: 600 }}>Pendente</Typography>

                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusPendente}</Typography>
                </BoxStyled>

              </Grid>
              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px', }}>

                <BoxStyled
                  onClick={() => clickStatus('Erro Autorização')}
                  sx={{ backgroundColor: 'error.light', color: 'error.main' }}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600 }}>Erro</Typography>
                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusErro}</Typography>
                </BoxStyled>
              </Grid>

              <Grid item xs={12} sm={1} style={{ position: 'relative', top: '45px', }}>
                <BoxStyled
                  onClick={() => clickStatus('Em Separação')}
                  sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
                >
                  <Typography style={{ fontSize: '9pt', textAlign: 'center', width: '100%', fontWeight: 600 }}>Separação</Typography>
                  <Typography style={{ fontSize: '12pt', textAlign: 'center', fontWeight: 600 }}>{statusSeparado}</Typography>
                </BoxStyled>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <BlankCard>
          <TableContainer>
            {valueTable.length > 0 ?
              <>
                <Table
                  aria-label="custom pagination table"
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#5D87FF', borderRadius: '20px' }}>

                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>FILIAL</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>Nº DA NOTA</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>PEDIDO</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>DATA/HORA CADASTRO</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>PEDIDO WEB</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>CLIENTE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>VENDEDOR</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>TRANSPORTADORA</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>STATUS</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>ESTOQUE</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography style={{ fontSize: '9pt', fontWeight: '600', textAlign: 'center', }}>VALOR TOTAL</Typography>
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {valueTable.map((response: any, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.filial}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.numeroNF}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.pedido}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.datahoraCadastro}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.pedidoWeb}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.cliente}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.vendedor == "" ? 'Não tem' : response.vendedor}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.transportadora == "" ? 'Não tem' : response.transportadora}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.statusPainel}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.statusEstoque}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography style={{ fontSize: '8pt', textAlign: 'center' }}>{response.valortotalPedido}</Typography>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                  </TableFooter>
                </Table>
                <Pagination style={{ position: 'relative', top: '2px', marginBottom: '10px' }} count={totalPages} page={page} onChange={handlePageChange} color="primary" />

              </>
              : null}
          </TableContainer>
        </BlankCard>


    </>
  );
};

export default ListOrder;
