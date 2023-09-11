import React, { FC, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_DATA_PARTNER } from "../../Keys/Keys";
import { GetPersonsData, chahgePersonStatus } from "../../Api/Api";
import {
  DataGrid,
  DataGridProps,
  GridActionsCellItem,
  GridApi,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridRowApi,
  GridRowParams,
  MuiEvent,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Button,
  ButtonGroup,
  Hidden,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Container } from "@mui/material";
import {
  FindInPage,
  MoreVert,
  Edit,
  AddComment,
  Comment,
  HistoryEdu,
  PendingActions,
  SentimentDissatisfied,
} from "@mui/icons-material";
import StatusSwitch from "../Switch/Switch";
import EditPartner from "../EditPartner/EditPartner";
import EmptyDataOverlay from "../NoRowsOverlay/NoRowsOverlay";
import { useNavigate, useSearchParams } from "react-router-dom";
import DataGridPageination from "../DataGridPageination/DataGridPageination";
import { myTheme } from "../../Themes/Themes";
import { QueryModel } from "../../Interfaces/QueryModel";

const Table: FC = () => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [paramsData, setParamsData] = useState<GridRowParams | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigator = useNavigate();

  const paramsModel: QueryModel = useMemo(() => {
    // TO DO
    const queryParams = {
      name: searchParams.get("name"),
      status: searchParams.get("status"),
      startDate: searchParams.get("startDate"),
      endDate: searchParams.get("endDate"),
      id: searchParams.get("id"),
      tabs: searchParams.get("tabs"),
      page: searchParams.get("page"),
      pageSize: searchParams.get("pageSize"),
    };
    return queryParams;
  }, [searchParams]);

  const personsData = useQuery({
    queryKey: [GET_DATA_PARTNER, paramsModel],
    queryFn: () => GetPersonsData(searchParams.toString()),
  });

  const rows: GridRowApi[] = personsData.data?.data ?? [];

  const handleEditPartners = (params: GridRowParams) => {
    setParamsData(params);
    setIsOpenEdit(true);
  };

  const closeEditDialog = () => {
    setIsOpenEdit(false);
  };

  const handleCellClick = (params: GridCellParams, event: React.MouseEvent) => {
    if (params.field === "name") {
      navigator(`/${params.id}/general`);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      // in useMemo for optimization little rendering
      {
        field: "id",
        headerName: "ID",
        minWidth: 90,
        disableColumnMenu: true,
        headerAlign: "center",
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "personName",
        headerName: "Person Name",
        minWidth: 200,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "email",
        headerName: "Contact Information",
        minWidth: 340,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "creationDate",
        headerName: "Creation Date",
        minWidth: 140,
        disableColumnMenu: true,
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 82,
        disableColumnMenu: true,
        headerAlign: "center",
        renderCell: (params) => (
          <StatusSwitch
            id={params.id}
            value={params.value === "active" ? true : false}
          />
        ),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "",
        minWidth: 100,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<FindInPage color="action" />}
            label="find"
          />,
          <GridActionsCellItem
            icon={<Edit color="action" />}
            showInMenu
            label="Edit"
            onClick={() => handleEditPartners(params)}
          />,
          <GridActionsCellItem
            icon={<PendingActions color="action" />}
            label="Log History"
            showInMenu
            onClick={() => setIsOpenEdit(false)}
          />,
          <GridActionsCellItem
            icon={<AddComment color="action" />}
            label="Add Note"
            showInMenu
            onClick={() => setIsOpenEdit(false)}
          />,
          <GridActionsCellItem
            icon={<Comment color="action" />}
            label="View notes"
            showInMenu
          />,
        ],
      },
    ],
    []
  );

  if (personsData.isError) {
    return <>Error: {personsData?.error}</>;
  }

  return (
    <div className="table">
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          height: personsData.data?.data.length > 0 ? "100%" : "600px",
        }}
      >
        <ThemeProvider theme={myTheme}>
          <DataGrid
            onCellClick={handleCellClick}
            sx={{
              width: "100%",
              height: personsData.data?.data.length > 0 ? "auto" : "100%",
              borderColor: "transparent",
              ".MuiDataGrid-columnHeaders.MuiDataGrid-withBorderColor.css-1iyq7zh-MuiDataGrid-columnHeaders":
              {
                backgroundColor: "#F3F4F6",
                borderColor: "transparent",
              },
            }}
            columns={columns}
            rows={rows}
            slots={{
              noRowsOverlay: EmptyDataOverlay,
            }}
            hideFooter={true}
            loading={personsData.isLoading}
          />
        </ThemeProvider>
      </Container>
      {
        <DataGridPageination
          dataLength={
            personsData.data?.data.length ? personsData.data?.data.length : 0
          }
        />
      }
      {isOpenEdit && (
        <EditPartner
          params={paramsData}
          onClose={closeEditDialog}
          key={paramsData?.row.id}
        />
      )}
    </div>
  );
};

export default Table;
