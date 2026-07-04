import React from "react";
import Link from "@docusaurus/Link";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

const regionMap = {
  US: { flag: "🇺🇸", name: "美国地区" },
  CN: { flag: "🇨🇳", name: "中国地区" },
  HK: { flag: "🇭🇰", name: "香港地区" },
};

export default function ProductCard({ product }) {
  const region = regionMap[product.region] || { flag: "🌐", name: "全球地区" };

  return (
    <Card
      sx={{
        borderRadius: "28px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(255,255,255,0.82)",
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        transition: "all .28s ease",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-3px)",
        },
        "&:hover .product-img": {
          transform: "scale(1.06)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #ffffff 0%, #f5f6f8 48%, #eceef2 100%)",
        }}
      >
        {product.tag && (
          <Chip
            label={product.tag}
            size="small"
            sx={{
              position: "absolute",
              top: 18,
              left: 18,
              height: 28,
              borderRadius: 99,
              bgcolor: "rgba(255,255,255,.78)",
              backdropFilter: "blur(12px)",
              fontWeight: 700,
              color: "#222",
            }}
          />
        )}

        <CardMedia
          className="product-img"
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            width: 135,
            height: 135,
            objectFit: "contain",
            transition: "transform .28s ease",
          }}
        />
      </Box>

      <CardContent
        sx={{
          p: 2.8,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", gap: 1, mb: 1.8, flexWrap: "wrap" }}>
          <Chip
            label={product.category}
            size="small"
            sx={{
              height: 28,
              borderRadius: 99,
              bgcolor: "#f2f2f4",
              color: "#444",
              fontWeight: 700,
            }}
          />

          {product.region && (
            <Chip
              label={`${region.flag} ${region.name}`}
              size="small"
              sx={{
                height: 28,
                borderRadius: 99,
                bgcolor: "rgba(0,113,227,.08)",
                color: "#0066cc",
                fontWeight: 700,
              }}
            />
          )}
        </Box>

        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 900,
            lineHeight: 1.28,
            mb: 1.2,
            color: "#1d1d1f",
          }}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "#666",
            minHeight: 48,
          }}
        >
          {product.brief}
        </Typography>

        <Box sx={{ mt: "auto", pt: 2.4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              mb: 2.4,
            }}
          >
            <Typography
              component="span"
              sx={{
                fontSize: 28,
                fontWeight: 900,
                color: "#111",
              }}
            >
              ¥{product.price}
            </Typography>

            {product.originalPrice && (
              <Typography
                component="span"
                sx={{
                  ml: 1,
                  fontSize: 15,
                  color: "#999",
                  textDecoration: "line-through",
                }}
              >
                ¥{product.originalPrice}
              </Typography>
            )}
          </Box>

          <Button
            component={Link}
            to={`/products/detail?id=${product.id}`}
            variant="contained"
            fullWidth
            disableElevation
            sx={{
              borderRadius: 99,
              py: 1.15,
              fontWeight: 800,
              fontSize: 15,
              bgcolor: "#111",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#2a2a2a",
              },
            }}
          >
            查看详情
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}