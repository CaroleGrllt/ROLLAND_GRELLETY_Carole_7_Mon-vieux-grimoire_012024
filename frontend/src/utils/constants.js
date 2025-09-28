import { API_BASE_URL } from '../config';

export const API_ROUTES = {
  SIGN_UP: `${API_BASE_URL}/api/auth/signup`,
  SIGN_IN: `${API_BASE_URL}/api/auth/login`,
  BOOKS: `${API_BASE_URL}/api/books`,
  BEST_RATED: `${API_BASE_URL}/api/books/bestrating`,
};

export const APP_ROUTES = {
  SIGN_UP: '/Inscription',
  SIGN_IN: '/Connexion',
  ADD_BOOK: '/Ajouter',
  BOOK: '/livre/:id',
  UPDATE_BOOK: 'livre/modifier/:id',
};
