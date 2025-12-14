import { API_BASE_URL } from "./config";
import { getToken } from "./authApi";

interface PaymentItemPayload {
  productId: string;
  quantity: number;
}

export interface CreatePaymentOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    paymentIntentId: string;
  };
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    orderId?: string;
    alreadyProcessed?: boolean;
  };
}

export const createPaymentOrder = async (
  addressId: string,
  items: PaymentItemPayload[],
  token?: string
): Promise<CreatePaymentOrderResponse> => {
  const authToken = token || getToken();
  if (!authToken) {
    throw new Error("Authorization token missing");
  }

  const res = await fetch(`${API_BASE_URL}/payment/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ addressId, items }),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.message || "Failed to create payment order";
    throw new Error(message);
  }
  return data as CreatePaymentOrderResponse;
};

export const verifyPayment = async (
  payload: Record<string, string>,
  token?: string
): Promise<VerifyPaymentResponse> => {
  const authToken = token || getToken();
  if (!authToken) {
    throw new Error("Authorization token missing");
  }

  const res = await fetch(`${API_BASE_URL}/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.message || "Failed to verify payment";
    throw new Error(message);
  }
  return data as VerifyPaymentResponse;
};
