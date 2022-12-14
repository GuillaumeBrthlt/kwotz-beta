/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import PropTypes from "prop-types";

import { Grid } from "@mui/material";
import {Divider} from "@mui/material";
// Soft UI Dashboard PRO React components
import SoftBox from "@components/SoftBox";
import SoftTypography from "@components/SoftTypography";
import FormField from "@components/NewColdRoom/components/FormField";

function Dimensions({formData}) {
  const { formField, values } = formData;
  const {width, CFlength, height, volume} = formField
  const { 
    width: widthV, 
    CFlength: CFlengthV,
    height: heightV,
    volume: volumeV
  } = values;

  return (
    <SoftBox>
      <SoftTypography variant="h5" fontWeight="bold">
        Dimensions
      </SoftTypography>
      <SoftBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField 
              name={CFlength.name}
              type={CFlength.type}
              label={CFlength.label}
              value={CFlengthV}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField 
              name={width.name}
              type={width.type}
              label={width.label}
              value={widthV}
            />
          </Grid>
          <Grid item xs={12}>
            <FormField 
              name={height.name}
              type={height.type}
              label={height.label}
              value={heightV}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox position="relative" py={3}>
        <Divider />
        <SoftBox
          bgColor="white"
          position="absolute"
          top="50%"
          left="50%"
          px={1.5}
          lineHeight={1}
          sx={{ transform: "translate(-50%, -60%)" }}
        >
          <SoftTypography variant="button" fontWeight="medium" color="secondary">
            ou
          </SoftTypography>
        </SoftBox>
      </SoftBox>
      <SoftBox>
        <Grid container mb={4}>
          <Grid item xs={12}>
            <FormField 
              name={volume.name}
              type={volume.type}
              label={volume.label}
              value={volumeV}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

Dimensions.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default Dimensions;
