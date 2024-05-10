import { useState } from 'react';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import {
  Grid,
  MenuItem,
  Button
} from '@mui/material'

const RequestEmail = () => {
    const [nameTemplate, setNameTemplate] = useState<any>(-1);
    const [nameStatus] = useState(['Sem Filial', 'Sem Vendedor', 'Sem Transportadora', 'Sem Status', 'Sem Estoque'])
    const [nameTitle, setNameTitle] = useState<any>('');
    const [status] = useState([{
        value: 0, name: 'Pendente'},
{value:2, name:'Pré-Postado'},
{value: -9, name: 'Erro'}
    ])

    const handleChangeTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameTemplate(event.target.value);
      }
    
      const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameTitle(event.target.value);
      }

return (
<>

  <Grid container spacing={1} style={{position: 'relative', top: '0px'}}>
 <Grid item xs={12} sm={2}>
 <CustomFormLabel htmlFor="standard-select-currency">Filial</CustomFormLabel>
     <CustomSelect
           value={nameTemplate}
           onChange={handleChangeTemplate}
           fullWidth
           variant="outlined"
         >
           <MenuItem value="-1">{nameStatus[0]}</MenuItem>
           {/* {affiliated.map((option:any) => (
             <MenuItem key={option.codigoTerceiro} value={option.codigoTerceiro}>
               {option.nomeTerceiro}
             </MenuItem>
           ))} */}
         </CustomSelect>

  </Grid>

  <Grid item xs={12} sm={2}>
  <CustomFormLabel htmlFor="standard-select-currency">Cliente</CustomFormLabel>

<CustomTextField id="password" value={nameTitle} onChange={handleChangeTitle} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={2}>
  <CustomFormLabel htmlFor="standard-select-currency">Pedido</CustomFormLabel>

<CustomTextField id="password" value={nameTitle} onChange={handleChangeTitle} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={1}>
  <CustomFormLabel htmlFor="standard-select-currency">Data Inicial</CustomFormLabel>

<CustomTextField id="password" value={nameTitle} onChange={handleChangeTitle} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={1}>
  <CustomFormLabel htmlFor="standard-select-currency">Data final</CustomFormLabel>

<CustomTextField id="password" value={nameTitle} onChange={handleChangeTitle} type="text" variant="outlined" fullWidth />

  </Grid>

  <Grid item xs={12} sm={2}>
 <CustomFormLabel htmlFor="standard-select-currency">Status</CustomFormLabel>
     <CustomSelect
           value={nameTemplate}
           onChange={handleChangeTemplate}
           fullWidth
           variant="outlined"
         >
           <MenuItem value="-1">{nameStatus[3]}</MenuItem>
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
style={{position: 'relative', top: '55px', height: '43px', width: '100px'}}

>
Pesquisar
</Button>
  </Grid>

  </Grid>
  {/* <Grid container spacing={1} style={{position: 'relative', top: '-100px'}}>

<Grid item xs={12} sm={4}>
<CustomFormLabel htmlFor="standard-select-currency">Título</CustomFormLabel>
<CustomTextField id="password" value={nameTitle} onChange={handleChangeTitle} type="text" variant="outlined" fullWidth />
</Grid>

<Grid item xs={12} sm={2}>
<Button
variant="contained"
color="primary"
type="submit"
style={{position: 'relative', top: '55px', height: '43px', width: '120px'}}

>
Pesquisar
</Button>
</Grid>

<Grid item xs={12} sm={3}>

</Grid>
<Grid item xs={12} sm={3} style={{display: 'flex' ,justifyContent: 'space-between', position: 'relative'}}>
<Button
variant="contained"
color="secondary"
type="submit"
style={{position: 'relative', top: '55px', height: '43px', width: '100px'}}

>
Novo
</Button>
<Button
variant="contained"
color="error"
type="submit"
style={{position: 'relative', top: '55px', height: '43px', width: '100px'}}

>
Limpar
</Button>
</Grid>

</Grid> */}
  </>

);
};
  
export default RequestEmail;