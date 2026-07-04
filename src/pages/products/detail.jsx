import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import products from "../../data/products";

const PAYMENT_OPTIONS = [
  { value: "alipay", label: "支付宝", icon: "/img/Alipay.svg" },
  { value: "wechat", label: "微信支付", icon: "/img/WeChatPay.svg" },
  { value: "usdt", label: "USDT (TRC20)", icon: "/img/USDT.svg" },
];

const DEFAULT_USD_CNY_RATE = 6.66;
const USDT_ADDRESS = "TSjahJNcovJtSMMx95HWSt1nn58LEfkHvn";

export default function ProductDetailPage() {
  const location = useLocation();
  const id = Number(new URLSearchParams(location.search).get("id"));

  const product = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    return products.find((item) => String(item.id) === String(id));
  }, [location.search]);

  const [contact, setContact] = useState({ email: "", wechat: "", telegram: "" });
  const [payment, setPayment] = useState("alipay");
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(5 * 60);
  const [emailError, setEmailError] = useState("");
  const [usdCnyRate, setUsdCnyRate] = useState(DEFAULT_USD_CNY_RATE);
  const [notice, setNotice] = useState({ open: false, type: "success", message: "" });

  const isUsdPayment = payment === "usdt";
  const displayPrice = useMemo(() => {
    if (!product) return "0.00";
    return isUsdPayment ? (product.price / usdCnyRate).toFixed(2) : product.price.toFixed(2);
  }, [isUsdPayment, product, usdCnyRate]);

  const displayCurrency = isUsdPayment ? "$" : "¥";
  const displayUnit = isUsdPayment ? "美元" : "元";

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        const rate = Number(data?.rates?.CNY);
        if (rate > 0) setUsdCnyRate(rate);
      })
      .catch(() => {
        showNotice("warning", "获取最新汇率失败，已使用默认汇率");
      });
  }, []);

  useEffect(() => {
    if (!open) {
      setCountdown(5 * 60);
      return undefined;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  const showNotice = (type, message) => {
    setNotice({ open: true, type, message });
  };

  const handleContactChange = (field, value) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateEmail = () => {
    if (!contact.email) return "请填写联系邮箱";
    if (!isValidEmail(contact.email)) return "请输入正确的邮箱地址";
    return "";
  };

  const handlePay = () => {
    const error = validateEmail();
    if (error) {
      setEmailError(error);
      showNotice("warning", error);
      return;
    }
    setOpen(true);
  };

  const handlePaid = async () => {
    try {
      const res = await fetch("https://wandering-waterfall-0ec4.680888.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: product.name,
          originalPriceCny: product.price,
          paidAmount: Number(displayPrice),
          currency: displayUnit,
          usdCnyRate,
          payment,
          contact,
          time: new Date().toLocaleString(),
        }),
      });

      if (!res.ok) throw new Error("提交失败");

      setOpen(false);
      showNotice("success", "付款信息已提交，请等待处理");
    } catch {
      showNotice("error", "提交失败，请联系管理员");
    }
  };

  const copyUsdtAddress = async () => {
    try {
      await navigator.clipboard.writeText(USDT_ADDRESS);
      showNotice("success", "USDT 地址已复制");
    } catch {
      showNotice("error", "复制失败，请手动复制");
    }
  };

  const renderPaymentContent = () => {
    if (payment === "alipay") {
      return <Box component="img" src="/img/alipay.png" alt="支付宝收款码" sx={qrStyle} />;
    }

    if (payment === "wechat") {
      return <Box component="img" src="/img/wechat_qrcode.jpg" alt="微信收款码" sx={qrStyle} />;
    }

    return (
      <>
        <Box component="img" src="/img/usdt_trc20.png" alt="USDT TRC20" sx={qrStyle} />
        <Card
          variant="outlined"
          sx={{
            mt: 2,
            borderRadius: 2,
            bgcolor: "grey.50",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ wordBreak: "break-all", fontWeight: 700 }}>
              TRC20 地址：{USDT_ADDRESS}
            </Typography>

            <Tooltip title="复制地址">
              <IconButton onClick={copyUsdtAddress} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Card>
      </>
    );
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

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
      <Box sx={pageStyle}>
        <Container maxWidth="md">
          <Button component={Link} to="/products" sx={{ mb: 4 }}>
            ← 返回产品列表
          </Button>

          <Paper elevation={0} sx={cardStyle}>
            <Box component="img" src={product.image} alt={product.name} sx={imageStyle} />

            <Typography variant="h3" fontWeight={900}>{product.name}</Typography>
            <Typography sx={{ mt: 2, color: "text.secondary", fontSize: 18 }}>{product.description}</Typography>
            <Typography sx={{ mt: 4, fontSize: 34, fontWeight: 900 }}>¥{product.price}</Typography>

            <Divider sx={{ my: 5 }} />

            <Typography variant="h5" fontWeight={800}>下单信息</Typography>

            <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
              <TextField
                label="联系邮箱"
                type="email"
                placeholder="example@email.com"
                required
                value={contact.email}
                error={Boolean(emailError)}
                helperText={emailError || "卡密会发送至此邮箱，请确认填写正确。"}
                onChange={(e) => {
                  handleContactChange("email", e.target.value);
                  setEmailError("");
                }}
                onBlur={() => setEmailError(validateEmail())}
                fullWidth
              />

              <TextField
                label="WeChat / 微信号"
                placeholder="微信号 | 手机号"
                helperText="若您希望添加我为好友。"
                value={contact.wechat}
                onChange={(e) => handleContactChange("wechat", e.target.value)}
                fullWidth
              />

              <TextField
                label="Telegram / 电报"
                placeholder="@yourname"
                helperText="建议填写以 @ 开头的 Telegram 用户名。"
                value={contact.telegram}
                onChange={(e) => handleContactChange("telegram", e.target.value)}
                fullWidth
              />
            </Box>

            <Typography sx={{ mt: 4, mb: 1, fontWeight: 700 }}>选择支付方式</Typography>

            <RadioGroup value={payment} onChange={(e) => setPayment(e.target.value)}>
              {PAYMENT_OPTIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        component="img"
                        src={item.icon}
                        alt={item.label}
                        sx={{ width: 28, height: 28, objectFit: "contain" }}
                      />
                      <Typography sx={{ fontSize: 20 }}>
                        {item.label}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>

            <Button variant="contained" size="large" onClick={handlePay} sx={payButtonStyle}>
              立即支付
            </Button>
          </Paper>
        </Container>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: dialogPaperStyle }}>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Chip label={`剩余支付时间 ${formatTime(countdown)}`} sx={countdownChipStyle(countdown)} />
          </Box>

          <Box sx={payInfoStyle}>
            <Box sx={{ mb: 1.8 }}>
              <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.5 }}>商品</Typography>
              <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{product.name}</Typography>
            </Box>

            <Box sx={amountRowStyle}>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>应付</Typography>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 0.2 }}>
                  {displayUnit}
                  {isUsdPayment ? `，汇率 1 USD = ${usdCnyRate.toFixed(4)} CNY` : ""}
                </Typography>
                <Typography sx={{ fontSize: 32, lineHeight: 1, fontWeight: 900, letterSpacing: -0.5 }}>
                  {displayCurrency}{displayPrice}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ p: 2, borderRadius: 4, textAlign: "center" }}>{renderPaymentContent()}</Box>
        </DialogContent>

        <DialogActions sx={dialogActionsStyle}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 999, px: 3 }}>关闭</Button>
          <Button variant="contained" onClick={handlePaid} disabled={countdown <= 0} sx={paidButtonStyle}>
            {countdown > 0 ? "我已付款" : "支付已超时"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notice.open}
        autoHideDuration={3000}
        onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotice((prev) => ({ ...prev, open: false }))}
          severity={notice.type}
          variant="filled"
          sx={{ width: "100%", borderRadius: 3 }}
        >
          {notice.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
}

const pageStyle = {
  py: 10,
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f5f5f7 0%, #ffffff 100%)",
};

const cardStyle = {
  p: { xs: 3, md: 5 },
  borderRadius: 6,
  backgroundColor: "rgba(255,255,255,0.86)",
  boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.06)",
};

const imageStyle = {
  width: "100%",
  maxWidth: 200,
  height: "auto",
  display: "block",
  mx: "auto",
  mb: 4,
  objectFit: "contain",
};

const qrStyle = {
  width: "100%",
  maxWidth: 220,
  mt: 1.5,
  borderRadius: 3,
};

const payButtonStyle = {
  mt: 3,
  px: 4,
  py: 1.4,
  borderRadius: 999,
  fontWeight: 800,
  boxShadow: "0 12px 30px rgba(25,118,210,0.25)",
};

const dialogPaperStyle = {
  borderRadius: 5,
  p: 0,
  overflow: "hidden",
};

const countdownChipStyle = (countdown) => ({
  px: 1.5,
  py: 2.2,
  borderRadius: 999,
  fontSize: 15,
  fontWeight: 800,
  backgroundColor: countdown <= 60 ? "#fff2f0" : "#f0f7ff",
  color: countdown <= 60 ? "#d93025" : "#1677ff",
});

const payInfoStyle = {
  mb: 2,
  p: 2.2,
  borderRadius: 4,
  backgroundColor: "#f7f8fa",
};

const amountRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  pt: 1.8,
  borderTop: "1px dashed rgba(0,0,0,0.12)",
};

const dialogActionsStyle = {
  px: 3,
  pb: 3,
  pt: 0,
  display: "flex",
  justifyContent: "flex-end",
  gap: 1,
};

const paidButtonStyle = {
  borderRadius: 999,
  px: 4,
  py: 1.1,
  fontWeight: 800,
};
