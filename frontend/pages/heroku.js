import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const queryString = require("query-string");
import AuthorizeIntegration from "./api/integrations/authorizeIntegration";

export default function Heroku() {
  console.log('HEROKU PAGE');
  const router = useRouter();
  const parsedUrl = queryString.parse(router.asPath.split("?")[1]);
  const code = parsedUrl.code;
  const state = parsedUrl.state;

  /**
   * Here we forward to the default workspace if a user opens this url
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      console.log('A');
      console.log(state);
      console.log(localStorage.getItem('latestCSRFToken'));
      if (state == localStorage.getItem("latestCSRFToken")) {
        console.log('B');
        await AuthorizeIntegration({
          workspaceId: localStorage.getItem("projectData.id"),
          code,
          integration: "heroku",
        });
        router.push("/integrations/" + localStorage.getItem("projectData.id"));
      }
    } catch (error) {
      console.error(error);
      console.log("Error - Not logged in yet");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

Heroku.requireAuth = true;
