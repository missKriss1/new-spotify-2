import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchAdminArtists } from './artistAdminThunk.ts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Artists } from '../../types';
import { loading, selectArtistsAdmin } from './artistsAdminSlice.ts';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';

const AdminArtistsList = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtistsAdmin);
  const loadArtist = useAppSelector(loading)

  useEffect(() => {
    dispatch(fetchAdminArtists());
  }, [dispatch]);
  console.log(artists)

  const columns: GridColDef<Artists>[] = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: false,
    },
    {
      field: 'information',
      headerName: 'Information',
      width: 300,
      editable: false,
    },
    {
      field: 'isPublished',
      headerName: 'Published',
      width: 120,
      type: 'boolean',
      editable: false,
    },
  ];

  return (
    <>
      {loadArtist ? (
        <Spinner />
      ): (
        <div style={{height: 400, width: '100%'}}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={artists}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </>
  );
};

export default AdminArtistsList;
