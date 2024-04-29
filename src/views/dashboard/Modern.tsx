// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState } from 'react';
import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import * as AuthService from "src/services/auth.service";
const Modern = () => {

  const [user] = useState(AuthService.getCurrentUser());

  return (
    <PageContainer title="Eris" description="this is Modern Dashboard page">
      <Box>
        {/* <Grid container spacing={3}>
   
          <Grid item xs={12} lg={12}>
            <TopCards />
          </Grid>
   
          <Grid item xs={12} lg={8}>
            <RevenueUpdates />
          </Grid>
   
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12} sm={6} lg={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
   
          <Grid item xs={12} lg={4}>
            <EmployeeSalary />
          </Grid>
   
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Customers />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Projects />
              </Grid>
              <Grid item xs={12}>
                <Social />
              </Grid>
            </Grid>
          </Grid>
   
          <Grid item xs={12} lg={4}>
            <SellingProducts />
          </Grid>
   
          <Grid item xs={12} lg={4}>
            <WeeklyStats />
          </Grid>
   
          <Grid item xs={12} lg={8}>
            <TopPerformers />
          </Grid> 
        </Grid> */}
 
        <Welcome color='white' type='info' title={user.userName} subtitle='Bem vindo ao sistema'/>
      </Box>
    </PageContainer>
  );
};

export default Modern;
