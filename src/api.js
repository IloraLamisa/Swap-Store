// src/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://fitback.shop';

// Helper to build headers (with optional token)
async function getHeaders() {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Generic GET
async function apiGet(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error(`GET ${endpoint} failed`);
  return res.json();
}

// Generic POST
async function apiPost(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST ${endpoint} failed`);
  return res.json();
}

// ----------------------
// USER PROFILE
// ----------------------
export const getUserProfiles = () => apiGet('/demo1UserProfile/');
export const getUserProfile = (id) => apiGet(`/demo1UserProfile/${id}`);
export const createUserProfile = (data) => apiPost('/demo1UserProfile/new', data);

// ----------------------
// ADMIN PROFILE
// ----------------------
export const getAdminProfiles = () => apiGet('/demo1AdminProfile/');
export const getAdminProfile = (id) => apiGet(`/demo1AdminProfile/${id}`);
export const createAdminProfile = (data) => apiPost('/demo1AdminProfile/new', data);

// ----------------------
// PROMO OFFERS
// ----------------------
export const getPromoOffers = () => apiGet('/demo1PromoOffers/');
export const getPromoOffer = (id) => apiGet(`/demo1PromoOffers/${id}`);
export const createPromoOffer = (data) => apiPost('/demo1PromoOffers/new', data);

// ----------------------
// CATEGORIES
// ----------------------
export const getCategories = () => apiGet('/demo1Category/');
export const getCategory = (id) => apiGet(`/demo1Category/${id}`);
export const createCategory = (data) => apiPost('/demo1Category/new', data);

// ----------------------
// PRODUCTS
// ----------------------
export const getProducts = () => apiGet('/demo1Product/');
export const getProduct = (id) => apiGet(`/demo1Product/${id}`);
export const createProduct = (data) => apiPost('/demo1Product/new', data);

// ----------------------
// ORDERS
// ----------------------
export const getOrders = () => apiGet('/demo1Order/');
export const getOrder = (id) => apiGet(`/demo1Order/${id}`);
export const createOrder = (data) => apiPost('/demo1Order/new', data);

// ----------------------
// OTP
// ----------------------
export const sendOtpApi = (phone) =>
apiPost('/send-otp', { phone_number: phone });
export const verifyOtpApi = (phone, otp) =>
  apiPost('/verify-otp', { phone_number: phone, code: otp });

async function apiPut(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: await getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT ${endpoint} failed`);
  return res.json();
}
export const updateUserProfile = (id, data) =>
  apiPut(`/demo1UserProfile/${id}`, data);
