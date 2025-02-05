import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectTracksAdmin, selectTracksLoading } from "./tracksAdminSlice.ts";
import { useEffect } from "react";
import { fetchAdminTracks } from "./tracksAdminThunk.ts";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Track } from "../../types";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";

const AdminTracksList = () => {
  const dispatch = useAppDispatch();
  const track = useAppSelector(selectTracksAdmin);
  const loadTrack = useAppSelector(selectTracksLoading);

  useEffect(() => {
    dispatch(fetchAdminTracks());
  }, [dispatch]);

  const columns: GridColDef<Track>[] = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: false,
    },
    {
      field: "continuance",
      headerName: "Continuance",
      width: 150,
      editable: false,
    },
    {
      field: "isPublished",
      headerName: "Published",
      width: 120,
      type: "boolean",
      editable: false,
    },
    {
      field: "number",
      headerName: "Number",
      width: 120,
      type: "number",
      editable: false,
    },
  ];
  return (
    <>
      {loadTrack ? (
        <Spinner />
      ) : (
        <div>
          <DataGrid
            getRowId={(row) => row._id}
            rows={track}
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

export default AdminTracksList;
