import React, { useEffect, useState } from "react";
import InputField from "../InputField";
import CopyPaste from "../CopyPaste";
import { useDispatch, useSelector } from "react-redux";
import { addShortenedUrl } from "../../reducers/urlReducer";
import AlertDialog from "../AlertDialog";

function EditPage({ urlObject, urlObjectHandler }) {
  const { id, longUrl, shortUrl } = urlObject;
  const { urls } = useSelector((state) => state.urls);
  const [editedLongUrl, setEditedLongUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const loadingHandler = (loading) => {
    setLoading(loading);
  };

  const editUrlhandler = (long, short) => {
    setEditedLongUrl(long);
    setShortedUrl(short);
  };

  const addToLocalStorage = async (id, longUrl, shortUrl) => {
    try {
      setLoading(true);
      dispatch(addShortenedUrl({ id, longUrl, shortUrl, flag }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const confirmToAddUrl = () => {
    if (editedLongUrl && shortedUrl) {
      addToLocalStorage(id, editedLongUrl, shortedUrl);
      // urlObjectHandler(null);
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const specificUrl = urls.findIndex((url) => url.longUrl === editedLongUrl);
    if (specificUrl !== -1) {
      setOpenDialog(true);
    } else {
      confirmToAddUrl();
    }
  }, [editedLongUrl, shortedUrl]);

  return (
    <div className="entry-container ">
      <div className="back" onClick={() => urlObjectHandler(null)}></div>
      <h2>Edit long URL</h2>
      <InputField
        urlHandler={editUrlhandler}
        longUrl={longUrl}
        loadingHandler={loadingHandler}
      />
      <CopyPaste shortedUrl={shortedUrl} loading={loading} />
      {openDialog && (
        <AlertDialog
          openDialog={openDialog}
          dialogClose={() => setOpenDialog(false)}
          confirmToAdd={confirmToAddUrl}
          message="The URL you entered already exists. Do you still want to proceed?"
        />
      )}
    </div>
  );
}

export default EditPage;
