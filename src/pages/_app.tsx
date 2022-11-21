import "../styles/reset.css";
import "../styles/globals.scss";

import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";

import { trpc } from "../utils/trpc";

const MyApp: AppType = ({
  Component,
  pageProps,
}) => {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
