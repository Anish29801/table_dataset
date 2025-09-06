import React from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import data from '../../data/data.json'
import { PersonRow } from '../../types'
import { Box } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200, sortable: true },
  { field: 'position', headerName: 'Position', width: 180 },
  { field: 'office', headerName: 'Office', width: 140 },
  { field: 'age', headerName: 'Age', type: 'number', width: 100 },
  { field: 'startDate', headerName: 'Start Date', width: 140 },
]

const DataTable: React.FC = () => {
  const rows: PersonRow[] = (data as any[]).map((row, index) => ({
    id: index + 1,
    name: row['Name'],
    position: row['Position'],
    office: row['Office'],
    age: row['Age'],
    startDate: row['Start date'],
  }))

  return (
    <Box sx={{ height: 600, width: '100%', mt: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  )
}

export default DataTable
