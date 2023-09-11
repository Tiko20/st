import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Button,
  Badge,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { myTheme } from "../../Themes/Themes";
import { Close, FilterList, Search } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../Schema/SchemaSearch";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import { MyChipe } from "../../MyCustumStyles/Chip";
import { SearchPartner } from "../../Interfaces/SearchPartner";

enum Status { // TO DO
  Active = 'active',
  DeActive = "deactive",
  All = "all"
}

enum FilterParams {
  status = "status",
  startDate = "startDate",
  endDate = "endDate"

}

const TableHeader: FC = () => {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("name") || "");
  const [badgeContent, setBadgeContent] = useState<number | string | undefined>(0);
  const entriesArray = Array.from(searchParams.entries());

  const searchForm = useForm({
    resolver: yupResolver(schema),
  });

  const handleChecked = () => {
    setChecked(!checked);
  };


  const handleDelete = (paramKey: string) => {
    const param = searchParams.get(paramKey);
    if (param) {
      searchParams.delete(paramKey);
      setSearchParams(searchParams);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const resetQuery = () => {
    setSearchValue("")
  }


  const onSearch: SubmitHandler<SearchPartner> = (data) => {

    if (data.status && data.status !== "all") {
      searchParams.set("status", data?.status) // status value is equal all to empty request
    }
    if (data.startDate) {
      searchParams.set("startDate", dayjs(data.startDate).format("DD.MM.YYYY")) // get  wanted format date
    }
    if (data.endDate) {
      searchParams.set("endDate", dayjs(data.endDate).format("DD.MM.YYYY")) // get  wanted format date
    }
    setSearchParams(searchParams)
  }

  const handleReset = () => {
    searchParams.delete("status")
    searchParams.delete("startDate")
    searchParams.delete("endDate")
    setSearchParams(searchParams)
  }

  useEffect(() => {
    const logValue = setTimeout(() => {
      if (searchValue) {
        searchParams.set("name", searchValue.trim())
      } else {
        searchParams.delete("name")
      }
      setSearchParams(searchParams)
    }, 1000)
    return () => clearTimeout(logValue)
  }, [searchValue])


  useEffect(() => { // TO CHANGE
    const calculatedContent = entriesArray.filter(([key, value]) => key === FilterParams.startDate || key == FilterParams.status || key == FilterParams.endDate).length;
    setBadgeContent(calculatedContent);
  }, [searchParams]);

  return (
    <Box px={2}>
      <ThemeProvider theme={myTheme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            minHeight: "36px",
            alignItems: "center",
            borderRadius: 1,
            paddingBottom: 1,
            paddingTop: 2,
          }}
        >
          <div>
            <TextField
              size="small"
              placeholder="Search..."
              sx={{
                backgroundColor: "#F3F4F6",
                boxSizing: "border-box",
                "&:hover": {
                  backgroundColor: "#EBEBEB",
                  borderColor: "transparent",

                },
                "& fieldset": { borderColor: "transparent" },

              }}
              value={searchValue}
              onChange={onChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <Search
                        sx={{
                          color: "black",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      style={{
                        visibility: searchValue ? 'visible' : 'hidden',
                      }}
                      onClick={resetQuery}
                    >
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Badge overlap="circular" badgeContent={badgeContent} sx={{
            ".MuiBadge-badge": {
              color: "#fff",
              bgcolor: "#5048E5"
            }
          }}>
            <IconButton onClick={handleChecked}>
              <FilterList htmlColor="#5048E5" />
            </IconButton>
          </Badge>
        </Box>
        <form onSubmit={searchForm.handleSubmit(onSearch)}>
          <Collapse in={checked}>
            <Box sx={{ display: !badgeContent ? "flex" : "none", flexDirection: "row", marginTop: "8px" }}>
              <div>
                <FormControl sx={{ minWidth: "220px", marginRight: 2 }}>
                  <InputLabel id="demo-simple-select-label" size="small">Status</InputLabel>
                  <Controller
                    name="status"
                    control={searchForm.control}
                    defaultValue="all"
                    render={({ field }) => (
                      <Select
                        size="small"
                        {...field}
                        label="status"
                        labelId="demo-simple-select-label"
                      >
                        <MenuItem value={Status.All}>All</MenuItem>
                        <MenuItem value={Status.Active}>Active</MenuItem>
                        <MenuItem value={Status.DeActive}>Deactive</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="startDate"
                    control={searchForm.control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="DD.MM.YYYY"
                        label="Start Date"
                        sx={{ marginRight: 2 }}
                        slotProps={{
                          textField: { size: 'small' }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Controller
                    name="endDate"
                    control={searchForm.control}
                    defaultValue={null}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="DD.MM.YYYY"
                        label="End Date"
                        slotProps={{ textField: { size: 'small' } }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: 1 }}>
              <div>
                {

                  !!badgeContent &&
                  <Stack direction="row" spacing={1}>
                    {searchParams.get(FilterParams.status) && <MyChipe sx={{ textTransform: "capitalize" }} onDelete={() => handleDelete(FilterParams.status)} label={searchParams.get(FilterParams.startDate)} />}
                    {searchParams.get(FilterParams.startDate) && <MyChipe label={"Start creation date " + searchParams.get(FilterParams.startDate)} onDelete={() => handleDelete(FilterParams.startDate)} />}
                    {searchParams.get(FilterParams.endDate) && <MyChipe label={"End creation date " + searchParams.get(FilterParams.endDate)} onDelete={() => handleDelete(FilterParams.startDate)} />}
                  </Stack>
                }
              </div>
              <div>
                <Button variant="text" size="small" sx={{ marginLeft: 2, borderRadius: "100px" }} type="reset" onClick={() => {
                  searchForm.reset()
                  handleReset()
                }}>
                  Reset all
                </Button>
                {
                  !badgeContent &&
                  <Button
                    variant="contained"
                    sx={{ borderRadius: "100px" }}
                    size="small"
                    type="submit"
                  >
                    Apply
                  </Button>
                }
              </div>
            </Box>
          </Collapse>
        </form>
      </ThemeProvider >
    </Box>
  );
};

export default TableHeader;

