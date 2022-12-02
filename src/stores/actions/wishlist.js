import axios from '../../utils/axios';

export const getAllWishlishtByUserId = (userId, page) => {
  return {
    type:
      page === 1
        ? 'GET_ALL_WISHLIST_BY_USER_ID'
        : 'ADD_ALL_WISHLIST_BY_USER_ID',
    payload: axios.get(`/wishlist/userId/${userId}?page=${page}`),
  };
};

// export const getWishlistById = (wishlistId) => {
//   return {
//     type: "GET_WISHLIST_BY_ID",
//     payload: axios.get(`/wishlist/wishlistId/${wishlistId}`),
//   };
// };

export const deleteWishlist = wishlistId => {
  return {
    type: 'DELETE_WISHLIST',
    payload: axios.delete(`/wishlist/${wishlistId}`),
  };
};
