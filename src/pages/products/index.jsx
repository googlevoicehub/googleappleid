import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import {
    Box,
    Container,
    Typography,
    Stack,
    Button,
    Paper,
} from "@mui/material";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("全部");
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        let lastSticky = false;

        const onScroll = () => {
            const nextSticky = window.scrollY > 80;

            if (nextSticky !== lastSticky) {
                lastSticky = nextSticky;
                setIsSticky(nextSticky);
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const categories = useMemo(() => {
        return ["全部", ...new Set(products.map((item) => item.category))];
    }, []);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "全部") return products;
        return products.filter((item) => item.category === activeCategory);
    }, [activeCategory]);

    return (
        <Layout title="旗舰店" description="高端商品展示页面">
            <Box
                sx={{
                    minHeight: "100vh",
                    background:
                        "linear-gradient(180deg, #f8f9fb 0%, #ffffff 45%, #f5f5f7 100%)",
                    pb: { xs: 8, md: 12 },
                }}
            >
                <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 3 } }}>
                    <Paper
                        elevation={0}
                        sx={{
                            position: "sticky",
                            top: "var(--ifm-navbar-height)",
                            zIndex: 30,

                            mx: "auto",
                            mb: { xs: 4, md: 6 },
                            p: { xs: 1, md: 1.2 },

                            maxWidth: 760,
                            width: "100%",

                            borderRadius: 99,

                            backgroundColor: isSticky
                                ? "rgba(255,255,255,0.68)"
                                : "rgba(255,255,255,0.86)",

                            borderBottom: isSticky ? "1px solid rgba(0,0,0,0.08)" : "none",
                            boxShadow: "none",

                            overflowX: "auto",
                            overflowY: "hidden",

                            transition: "all .28s ease",
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                width: "max-content",
                                minWidth: { xs: "max-content", md: "100%" },
                                mx: "auto",
                                justifyContent: "center",
                            }}
                        >
                            {categories.map((category) => {
                                const active = activeCategory === category;

                                return (
                                    <Button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        variant={active ? "contained" : "text"}
                                        sx={{
                                            borderRadius: 99,
                                            px: 3,
                                            py: 1,
                                            fontWeight: 700,
                                            color: active ? "#fff" : "#333",
                                            bgcolor: active ? "#111" : "transparent",
                                            whiteSpace: "nowrap",
                                            "&:hover": {
                                                bgcolor: active ? "#222" : "rgba(0,0,0,.06)",
                                            },
                                        }}
                                    >
                                        {category}
                                    </Button>
                                );
                            })}
                        </Stack>
                    </Paper>

                    <Box
                        sx={{
                            display: "grid",
                            gap: { xs: 3, md: 3.5 },
                            gridTemplateColumns: {
                                xs: "minmax(0, 340px)",
                                sm: "repeat(2, minmax(0, 340px))",
                                md: "repeat(3, minmax(0, 340px))",
                            },
                            justifyContent: "center",
                        }}
                    >
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Box>
                </Container>
            </Box>
        </Layout>
    );
}