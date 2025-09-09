import "@fontsource/poppins";
import { useState } from 'react';
import { GridPaginationModel } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable/DataTable';
import { Container, Typography } from '@mui/material';
import data from "../../data/data.json";
import { RawPersonData,PersonRow } from "../../types";
import { columns } from './columns';


const Home = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });

  const rows: PersonRow[] = (data as RawPersonData[]).map((row, index) => ({
    id: index + 1,
    name: row["Name"],
    position: row["Position"],
    office: row["Office"],
    age: row["Age"],
    startDate: row["Start date"],
  }));

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{ fontFamily: "Poppins, sans-serif" }}
      >
        DealAmaze Project 1 - Data Table
      </Typography>

      <DataTable
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Container>
  );
};

export default Home;
