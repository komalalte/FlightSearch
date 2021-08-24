import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import { validateSearch } from "../../utils/global-services";
import FlightListOneWay from "../FlightList";

import CityJSON from "../../mocks/cities.json";
import { useSesssionList } from "./hooks";
import { loadList, loadUsers } from "../../redux/actions";

const cities = [...CityJSON];

const useStyles = makeStyles(() => ({
  filterContainer: {
    marginBottom: 25,
  },
}));

const FlightSearch = (props) => {
  const [source, setSource] = useState("");
  const [dest, setDest] = useState("");
  const [deptDate, setDeptDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectTrip, setSelectTrip] = useState("one");
  const [searchDone, setSearchDone] = useState(false);
  const [inputSource, setInputSource] = useState("");
  const [inputDest, setInputDest] = useState("");
  const [cityError, setCityError] = useState(false);
  const { users } = useSesssionList();

  const flightList = users;
  const classes = useStyles();

  useEffect(() => {
    // Reset Flight List
    loadList();
  }, []);

  /**
   * @function handleSource
   * @param {object} newVal
   * @description get source city details
   */
  const handleSource = (newVal) => {
    setSource(newVal);
  };

  /**
   * @function handleDestination
   * @param {object} newVal
   * @description get destination city details
   */
  const handleDestination = (newVal) => {
    setDest(newVal);
  };

  /**
   * @function handleDeparture
   * @param {object} e
   * @description get departure time
   */
  const handleDeparture = (e) => {
    setDeptDate(e.target.value);
  };

  /**
   * @function handleSelectTrip
   * @param {object} e
   * @description get selected trip one way or round
   */
  const handleSelectTrip = (e) => {
    setSelectTrip(e.target.value);
  };

  /**
   * @function handleReturn
   * @param {object} e
   * @description get return date
   */
  const handleReturn = (e) => {
    setReturnDate(e.target.value);
  };

  /**
   * @function handleSearchFlight
   * @description Search Flight
   */
  const handleSearchFlight = () => {
    const payload = {};

    payload.source = source?.name;
    payload.destination = dest?.name;
    payload.deptDate = deptDate;
    payload.returnDate = returnDate;
    payload.tripType = selectTrip;
    if (
      payload?.source?.toLowerCase() === payload?.destination?.toLowerCase()
    ) {
      setCityError(true);
      setSearchDone(false);
      return;
    } else {
      setCityError(false);
    }
    setSearchDone(true);
  };

  /**
   * @function handleBookNow
   * @param {object} bookingVal
   * @description book now
   */
  const handleBookNow = (bookingVal) => {
    let timer;

    clearTimeout(timer);
  };
  return (
    <Grid container>
      <Grid item xs={12} md={12} className={classes.filterContainer}>
        <RadioGroup row onChange={handleSelectTrip} value={selectTrip}>
          <FormControlLabel
            value="one"
            control={<Radio color="primary" />}
            label="One Way"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={source}
          inputValue={inputSource}
          onChange={(event, newValue) => {
            handleSource(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputSource(newInputValue);
          }}
          getOptionLabel={(option) => option.name}
          options={cities}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Source City" variant="outlined" />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <Autocomplete
          value={dest}
          inputValue={inputDest}
          onChange={(event, newValue) => {
            handleDestination(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputDest(newInputValue);
          }}
          getOptionLabel={(option) => option.name}
          options={cities}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination City"
              variant="outlined"
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={6} className={classes.filterContainer}>
        <TextField
          label="Journey Date"
          type="date"
          value={deptDate}
          onChange={handleDeparture}
          variant="outlined"
          style={{ width: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      {selectTrip?.toUpperCase() === "BOTH" && (
        <Grid item xs={12} md={6} className={classes.filterContainer}>
          <TextField
            label="Return Date"
            type="date"
            value={returnDate}
            onChange={handleReturn}
            variant="outlined"
            style={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.filterContainer}
          onClick={handleSearchFlight}
          disabled={validateSearch(
            source,
            dest,
            deptDate,
            returnDate,
            selectTrip
          )}
        >
          {`Search Flight`}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {cityError && (
          <Typography
            variant="body1"
            color="error"
          >{`Source and Destination City can not be same`}</Typography>
        )}
        {searchDone && (
          <FlightListOneWay flightList={flightList} bookNow={handleBookNow} />
        )}
      </Grid>
    </Grid>
  );
};

FlightSearch.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  // flightList: PropTypes.object,
};

export default FlightSearch;
