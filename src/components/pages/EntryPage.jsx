import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShortenedUrl } from "../../reducers/urlReducer";
import AppHeader from "../AppHeader";
import CopyPaste from "../CopyPaste";
import InputField from "../InputField";
import AlertDialog from "../AlertDialog";

const EntryPage = () => {
  const { urls } = useSelector((state) => state.urls);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const loadingHandler = (loading) => {
    setLoading(loading);
  };

  const urlHandler = (long, short) => {
    setLongUrl(long);
    setShortUrl(short);
  };

  const generateRandomId = (url) => {
    var lastFourChars = url.substring(url.length - 4);
    var randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    var id = lastFourChars + randomNumber;
    return id;
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
    const id = generateRandomId(shortUrl);
    if (longUrl && shortUrl) {
      addToLocalStorage(id, longUrl, shortUrl);
      // urlObjectHandler(null);
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    const specificUrl = urls.findIndex((url) => url.longUrl === longUrl);
    if (specificUrl !== -1) {
      setOpenDialog(true);
    } else {
      confirmToAddUrl();
    }
  }, [longUrl, shortUrl]);

  return (
    <div className="entry-container">
      <AppHeader />
      <InputField urlHandler={urlHandler} loadingHandler={loadingHandler} />
      <CopyPaste shortedUrl={shortUrl} loading={loading} />
      {openDialog && (
        <AlertDialog
          openDialog={openDialog}
          dialogClose={() => setOpenDialog(false)}
          confirmToAdd={confirmToAddUrl}
          message="Oops! The URL you entered already exists. Would you like to create a new short URL?"
        />
      )}
    </div>
  );
};

export default EntryPage;
