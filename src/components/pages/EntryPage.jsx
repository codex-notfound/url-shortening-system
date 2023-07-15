import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addShortenedUrl } from "../../reducers/urlReducer";
import AppHeader from "../AppHeader";
import CopyPaste from "../CopyPaste";
import InputField from "../InputField";

const EntryPage = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortedUrl, setShortedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  //   const shortUrls = useSelector((state) => state.urls);

  const originalUrlHandler = (url) => {
    setOriginalUrl(url);
  };
  const shortUrlHandler = (url) => {
    setShortedUrl(url);
  };
  const generateRandomId = (url) => {
    var lastFourChars = url.substring(url.length - 4);
    var randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    var id = lastFourChars + randomNumber;
    return id;
  };

  useEffect(() => {
    const shortedUrlHandler = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `https://api.shrtco.de/v2/shorten?url=${originalUrl}`
        );
        const shortUrl = res.data.result.full_short_link;
        setShortedUrl(shortUrl);
        const id = generateRandomId(shortUrl);
        console.log(`short`, id, " ", shortUrl);
        dispatch(addShortenedUrl({ id, originalUrl, shortUrl }));
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    shortedUrlHandler();
  }, [originalUrl]);

  return (
    <div className="entry-container">
      <AppHeader />
      <InputField urlHandler={originalUrlHandler} />
      <CopyPaste
        shortedUrl={shortedUrl}
        loading={loading}
        shortUrlHandler={shortUrlHandler}
      />
    </div>
  );
};

export default EntryPage;
