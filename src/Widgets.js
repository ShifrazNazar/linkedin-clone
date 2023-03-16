import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle(
        "OpanAI announces ChatGPT successor GPT-4",
        "Top news - 9998 readers"
      )}
      {newsArticle(
        "Real-Madrid Win against Liverpool 1-0",
        "Football news - 5026 readers"
      )}
      {newsArticle("Is Redux too good?", "Code news - 4153 readers")}
      {newsArticle(
        "What is the best Crypto to But now? ",
        "Crypto news - 846 readers"
      )}
      {newsArticle(
        "Meta lay-off: Facebook owner to cut 10,000 staff",
        "Meta news- 5643 readers"
      )}
      {newsArticle(
        "Google Pixel 7a image surface",
        "Google news- 1235 readers"
      )}
    </div>
  );
}

export default Widgets;
