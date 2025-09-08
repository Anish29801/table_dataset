import "@fontsource/poppins";
import DataTable from '../../components/DataTable/DataTable';
import { Container, Typography } from '@mui/material';
import data from "../../data/data.json";
import { PersonRow } from "../../types";
import { columns } from './columns';  

const Home = () => {
  const rows: PersonRow[] = (data as any[]).map((row, index) => ({
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
      <DataTable rows={rows} columns={columns} />
    </Container>
  );
};

export default Home;
