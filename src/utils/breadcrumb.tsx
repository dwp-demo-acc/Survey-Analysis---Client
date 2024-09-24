import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";

interface IIconBreadcrumbs {
  currentPage?: string;
  homePage: string;
}

export default function IconBreadcrumbs(props: IIconBreadcrumbs) {
  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        style={{ marginLeft: "3rem", marginBottom: "1rem" }}
      >
        <Link
          href={`/survey/${props.homePage}`}
          passHref
          style={{ color: "gray" }}
        >
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: "inherit", // Same color as the second item
              textDecoration: "none", // Remove default underline
            }}
            component="a"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {decodeURIComponent(props.homePage)}
          </Typography>
        </Link>
        {props.currentPage && (
          <div
            className="non-clickable-link"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              cursor: "default",
            }}
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {props.currentPage}
          </div>
        )}
      </Breadcrumbs>
    </div>
  );
}
