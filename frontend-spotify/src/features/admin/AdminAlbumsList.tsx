import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import {  fetchAdminAlbums } from './albumsAdminthunk.ts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Album } from '../../types';
import { selectAlbumAdmin, selectAlbumsLoading } from './albumsAdminSlice.ts';;
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const AdminAlbumsList = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbumAdmin);
  const loadAlbums = useAppSelector(selectAlbumsLoading)

  useEffect(() => {
      dispatch(fetchAdminAlbums());
  }, [dispatch]);

  const columns: GridColDef<Album>[] = [
    { field: '_id', headerName: 'ID', width: 150 },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Release Date',
      width: 150,
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
      {loadAlbums ? (
        <Spinner/>
      ): (
        <div style={{height: 400, width: '100%'}}>
          <DataGrid
            getRowId={(row) => row._id}
            rows={albums}
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

export default AdminAlbumsList;
