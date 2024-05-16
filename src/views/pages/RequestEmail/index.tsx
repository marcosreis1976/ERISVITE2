import { useContext, useEffect, useState } from 'react';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import {CartContext} from "src/App";
import {
  Grid,
  MenuItem,
  Button,
  Typography,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination
} from '@mui/material'
import BlankCard from 'src/components/shared/BlankCard';
import {getCorreios, getAffiliated} from "../../../services/user.service"


const RequestEmail = () => {
    let answer = useContext(CartContext)
    const [dataPage] = useState(answer);
    const [nameFilial, setNameFilial] = useState<any>(-1);
    const [nameStatus, setNameStatus] = useState<any>(-1);
    const [nameTitle, setNameTitle] = useState<any>('');
    const [affiliated, setAffiliated] = useState([]);
    const [valueTable, setValueTable] = useState([]);
    const [nameCliente, setNameCliente] = useState<any>('');
    const [namePedido, setNamePedido] = useState<any>('');
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [parameter, setParameter] = useState('');
    const [status] = useState([
        {value: 0, name: 'Pendente'},
{value:2, name:'Pré-Postado'},
{value: -9, name: 'Erro'}
    ])

    useEffect(() => {

      getAffiliated().then(
        (response) => {

          response.data.length > 0 ? setAffiliated(response.data): null
          },
        );
    }, []);

    const handleChangeFilial = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameFilial(event.target.value);
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameStatus(event.target.value);
      }

      const handleChangeCliente = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameCliente(event.target.value);
      };
    
      const handleChangePedido = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNamePedido(event.target.value);
      };

      const handleChangeStart = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length <= 2) {
      setDateStart(inputValue);
    } else if (inputValue.length <= 4) {
      setDateStart(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
    } else {
      setDateStart(`${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`);
    }
      }

      const handleChangeEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length <= 2) {
      setDateEnd(inputValue);
    } else if (inputValue.length <= 4) {
      setDateEnd(`${inputValue.slice(0, 2)}/${inputValue.slice(2)}`);
    } else {
      setDateEnd(`${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`);
    }
      }
    
      const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameTitle(event.target.value);
      }

      const search = () =>{
        let parameter = `codigoFilial=${nameFilial}`

        parameter = parameter + `&numeroPagina=1&tamanhoPagina=7&usuario=${dataPage.user?.userName}`
        nameCliente != '' ? parameter = parameter + `&cliente=${nameCliente}` : null
        namePedido != '' ? parameter = parameter + `&pedido=${namePedido}` : null
        dateStart != '' ? parameter = parameter + `&dataInicial=${dateStart}` : null
        dateEnd != '' ? parameter = parameter + `&dataFinal=${dateEnd}` : null
        parameter = parameter + `&codigoStatus=${nameStatus}`
        setParameter(parameter)
        getCorreios(parameter).then(
          (response:any) => {
            response.data.map((value:any)=>{
              let year =value.dataPedido.substring(0, 4);
              let month =value.dataPedido.substring(5, 7);
              let day =value.dataPedido.substring(8, 10);
              let hours = value.dataPedido.substring(11, 16);
              let data = `${day}/${month}/${year} ${hours}`
              value.dataPedido = data
            })
            setValueTable(response.data)
            setTotalPages(Math.ceil(response.data[0].totalRegistros / 7));
          },
     
             (error) => {
           const _content =
             (error.response && error.response.data) ||
             error.message ||
             error.toString();
             
             console.log(_content)
         }
          )
  
      }

      const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        let newPage = value
        event;
        // setErros(false)
        // setSearch(true)
        // setCurrentPage(newPage);
        let parameter = `codigoFilial=${nameFilial}`
        parameter = parameter + `&numeroPagina=${value}&tamanhoPagina=7&usuario=${dataPage.user?.userName}`
        nameCliente != '' ? parameter = parameter + `&cliente=${nameCliente}` : null
        namePedido != '' ? parameter = parameter + `&pedido=${namePedido}` : null
        dateStart != '' ? parameter = parameter + `&dataInicial=${dateStart}` : null
        dateEnd != '' ? parameter = parameter + `&dataFinal=${dateEnd}` : null
        parameter = parameter + `&codigoStatus=${nameStatus}`
        getCorreios(parameter).then(
          (response) => {
            response.data.map((value:any, i:any)=>{
              let year =value.dataPedido.substring(0, 4);
              let month =value.dataPedido.substring(5, 7);
              let day =value.dataPedido.substring(8, 10);
              let hours = value.dataPedido.substring(11, 16);
              let data = `${day}/${month}/${year} ${hours}`
              response.data[i].dataPedido = data
            })
            console.log(response.data)
            setValueTable(response.data)

            setTotalPages(Math.ceil(response.data[0].totalRegistros / 7));
 
           },
        );
      };

return (
<>

  <Grid container spacing={1} style={{position: 'relative', top: '0px', marginBottom: '30px'}}>
 <Grid item xs={12} sm={2}>
 <CustomFormLabel htmlFor="standard-select-currency">Filial</CustomFormLabel>
     <CustomSelect
            value={nameFilial}
           onChange={handleChangeFilial}
           fullWidth
           variant="outlined"
         >
           <MenuItem value="-1">Sem Filial</MenuItem>
            {affiliated.map((option:any) => (
             <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
               {option.nomeTerceiro}
             </MenuItem>
           ))}
         </CustomSelect>

  </Grid>

  <Grid item xs={12} sm={2}>
  <CustomFormLabel htmlFor="standard-select-currency">Cliente</CustomFormLabel>

<CustomTextField id="password" value={nameCliente} onChange={handleChangeCliente} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={2}>
  <CustomFormLabel htmlFor="standard-select-currency">Pedido</CustomFormLabel>

<CustomTextField id="password" value={namePedido} onChange={handleChangePedido} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={1}>
  <CustomFormLabel htmlFor="standard-select-currency">Data Inicial</CustomFormLabel>

<CustomTextField id="password" value={dateStart} onChange={handleChangeStart} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={1}>
  <CustomFormLabel htmlFor="standard-select-currency">Data final</CustomFormLabel>
  End
<CustomTextField id="password" value={dateEnd} onChange={handleChangeEnd} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={2}>
 <CustomFormLabel htmlFor="standard-select-currency">Status</CustomFormLabel>
     <CustomSelect
           value={nameStatus}
           onChange={handleChangeStatus}
           fullWidth
           variant="outlined"
         >
           <MenuItem value="-1">Sem Status</MenuItem>
           {status.map((option:any) => (
             <MenuItem key={option.value} value={option.value}>
               {option.name}
             </MenuItem>
           ))} 
         </CustomSelect>

  </Grid>

  <Grid item xs={12} sm={2}>
  <Button
variant="contained"
color="secondary"
type="submit"
onClick={()=>search()}
style={{position: 'relative', top: '55px', height: '43px', width: '100px'}}

>
Pesquisar
</Button>
  </Grid>

  </Grid>
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
                <TableRow style={{backgroundColor: '#5D87FF', borderRadius: '20px'}}>

                <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>FILIAL</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>PEDIDO</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>CLIENTE</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>DATA PEDIDO</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>CIDADE</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>UF</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>CÓDIGO SERVIÇO</Typography>
                  </TableCell>
      <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>CÓDIGO CORREIO</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{fontSize: '9pt', fontWeight: '600', textAlign: 'center',}}>STATUS</Typography>
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
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.dataPedido}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.cliente}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.data}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.cidade}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.uf}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.codigoServico}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.codigoStatusCorreios}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography style={{fontSize: '8pt', textAlign: 'center'}}>{response.descricaoStatus}</Typography>
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
  </>

);
};
  
export default RequestEmail;