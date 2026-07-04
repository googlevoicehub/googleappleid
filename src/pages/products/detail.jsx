import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { Box, Container, Typography, Button } from "@mui/material";
import products from "../../data/products";

export default function ProductDetailPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = Number(searchParams.get("id"));

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <Layout title="商品不存在">
        <Container sx={{ py: 10 }}>
          <Typography variant="h4">商品不存在</Typography>
          <Button component={Link} to="/products" sx={{ mt: 3 }}>
            返回产品列表
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout title={product.name} description={product.brief}>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="md">
          <Button component={Link} to="/products" sx={{ mb: 4 }}>
            ← 返回产品列表
          </Button>

          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              borderRadius: 6,
              mb: 4,
            }}
          />

          <Typography variant="h3" fontWeight={900}>
            {product.name}
          </Typography>

          <Typography sx={{ mt: 2, color: "text.secondary", fontSize: 18 }}>
            {product.description}
          </Typography>

          <Typography sx={{ mt: 4, fontSize: 32, fontWeight: 900 }}>
            ¥{product.price}
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
}