import "@fontsource/poppins";
import DataTable from '../../components/DataTable/DataTable'
import { Container, Typography } from '@mui/material'


const Home: React.FC = () => {
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
<DataTable />
</Container>
)
}


export default Home