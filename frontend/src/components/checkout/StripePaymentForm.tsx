import { 
  CardNumberElement, 
  CardExpiryElement, 
  CardCvcElement, 
  useStripe, 
  useElements 
} from "@stripe/react-stripe-js";

import type { 
  StripeCardNumberElementChangeEvent, 
  StripeCardExpiryElementChangeEvent, 
  StripeCardCvcElementChangeEvent 
} from "@stripe/stripe-js";

import { 
  Box, 
  Button, 
  Typography, 
  Alert, 
  TextField, 
  Stack, 
   Grid 
} from "@mui/material";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react"; 

import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { confirmPaymentOnServer } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

const stripeInputStyles = {
  p: "18px 12px", 
  bgcolor: "#f3f4f6", 
  borderRadius: "4px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
  transition: "all 0.2s ease-in-out",
  "&:hover": { bgcolor: "#e5e7eb" },
  "&:focus-within": {
    bgcolor: "#e5e7eb",
    borderBottom: "2px solid #0047ab", 
  }
};

const labelStyles = {
  fontSize: "0.75rem",
  fontWeight: "900", 
  color: "#666",
  mb: 1,
  textTransform: "uppercase",
  letterSpacing: "0.05em"
};

const elementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#1a1a1a",
      fontFamily: "'Inter', sans-serif",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#d32f2f" },
  },
};

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { clientSecret, currentOrder } = useSelector((state: RootState) => state.orders);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");

  if (!currentOrder || !clientSecret) return null;

  const handleStripeChange = (
    event: StripeCardNumberElementChangeEvent | StripeCardExpiryElementChangeEvent | StripeCardCvcElementChangeEvent
  ) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!name.trim()) {
      setCardError("Cardholder name is required.");
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: { name },
      },
    });

    if (error) {
      setCardError(error.message || "Payment Failed");
      setIsProcessing(false);
    } else if (paymentIntent?.status === "succeeded") {
      try {
        await confirmPaymentOnServer({ orderId: currentOrder._id });
        navigate("/order/success", { state: { order: currentOrder } });
      } catch (err) {
        const error = err as ApiError;
        setCardError(error.response?.data?.message || "Order update failed. Please contact support.");
        setIsProcessing(false);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <Box>
          <Typography sx={labelStyles}>Cardholder Name</Typography>
          <TextField
            fullWidth
            variant="filled"
            placeholder="YOUR NAME"
            value={name}
         
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
              if (cardError === "Cardholder name is required.") setCardError(null);
            }}
            error={!!cardError && !name}
            InputProps={{
              disableUnderline: true,
              sx: { 
                borderRadius: "4px", 
                bgcolor: "#f3f4f6",
                "& input": { pt: "18px", pb: "18px" },
                "&:hover": { bgcolor: "#e5e7eb" }
              }
            }}
          />
        </Box>

        <Box>
          <Typography sx={labelStyles}>Card Number</Typography>
          <Box sx={stripeInputStyles}>
            <CardNumberElement options={elementOptions} onChange={handleStripeChange} />
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography sx={labelStyles}>Expiry Date</Typography>
            <Box sx={stripeInputStyles}>
              <CardExpiryElement options={elementOptions} onChange={handleStripeChange} />
            </Box>
          </Grid>
          
          <Grid size={4}>
            <Typography sx={labelStyles}>CVC</Typography>
            <Box sx={stripeInputStyles}>
              <CardCvcElement options={elementOptions} onChange={handleStripeChange} />
            </Box>
          </Grid>
        </Grid>

        {cardError && (
          <Alert severity="error" sx={{ borderRadius: 1, fontWeight: 600 }}>
            {cardError}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          type="submit"
          disabled={!stripe || isProcessing}
          sx={{ 
            py: 2.2, 
            fontWeight: "900", 
            bgcolor: "#0047ab", 
            borderRadius: 1,
            mt: 2,
            "&:hover": { bgcolor: "#003580" }
          }}
        >
          {isProcessing ? "PROCESSING..." : `PAY $${currentOrder.totalPrice.toLocaleString()}`}
        </Button>
      </Stack>
    </Box>
  );
};

export default StripePaymentForm;