import React, { useEffect, useState } from "react";

import Layout from "./Layout";
import { readVideoFile } from "./ApiCore";

import ReactPlayer from "react-player";

const ReadVideo = (props) => {
  const [video, setVideo] = useState({});

  const [error, setError] = useState(false);

  const loadSingleVideo = (videoId) => {
    readVideoFile(videoId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setVideo(data);
      }
    });
  };

  useEffect(() => {
    const videoId = props.match.params.videoId;
    loadSingleVideo(videoId);
  }, [props]);

  return (
    <Layout
      title={video && video.title}
      description={video && video.description}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          <ReactPlayer
            onContextMenu={(e) => e.preventDefault()}
            config={{ file: { attributes: { controlsList: "nodownload" } } }}
            playing
            controls
            url={video.videoUrl}
           
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReadVideo;
