import { useEffect } from "react";
import axios from "axios";

const useDynamicMeta = (pageType) => {
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await axios.get("https://www.metricwaveinsights.com/admin/api/metas");
        const metaList = res.data?.metas || [];

        const meta = metaList.find((item) => item.type === pageType);
        if (!meta) return;

        // Set Title
        if (meta.title) {
          document.title = meta.title;
        }

        // Set Description
        let metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
          metaDesc.setAttribute("content", meta.description);
        } else {
          const newDesc = document.createElement("meta");
          newDesc.name = "description";
          newDesc.content = meta.description;
          document.head.appendChild(newDesc);
        }

        // Set Keywords
        let metaKeywords = document.querySelector("meta[name='keywords']");
        if (metaKeywords) {
          metaKeywords.setAttribute("content", meta.keywords);
        } else {
          const newKeywords = document.createElement("meta");
          newKeywords.name = "keywords";
          newKeywords.content = meta.keywords;
          document.head.appendChild(newKeywords);
        }

      } catch (err) {
        console.error("Meta loading error:", err);
      }
    };

    if (pageType) fetchMeta();
  }, [pageType]);
};

export default useDynamicMeta;