import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "@/redux/hooks";
import Categories from "./Categories/Categories";
import SubCategories from "./SubCategories/SubCategories";
import Products from "./Products/Products";
import Stocks from "./Stocks/Stocks";
import ProductImages from "./ProductImages/ProductImages";
import ProductVideos from "./ProductVideos/ProductVideos";
import ComingSoon from "../ComingSoon/ComingSoon";

const MainContent = () => {
  const selectedSection = useAppSelector(
    (state) => state?.sidebarReducer?.selectedSection
  );

  if (selectedSection === "categories") {
    return <Categories />;
  }
  if (selectedSection === "subCategories") {
    return <SubCategories />;
  }
  if (selectedSection === "products") {
    return <Products />;
  }
  if (selectedSection === "stocks") {
    return <Stocks />;
  }
  if (selectedSection === "productImages") {
    return <ProductImages />;
  }
  if (selectedSection === "productVideos") {
    return <ProductVideos />;
  }
  return <ComingSoon />;
};

export default MainContent;
