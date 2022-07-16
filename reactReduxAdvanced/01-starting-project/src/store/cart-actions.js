import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    async function fetchData() {
      const response = await fetch(
        "https://react-http-7b980-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("COuld not fetch cart data");
      }
      const data = await response.json();
      return data;
    }

    try {
        const cartData = await fetchData();
        dispatch(cartActions.replaceCart({
            items: cartData.items || [],    // ako je prazna baza, items ce biti undefined , pa ako je to slucaj vratimo []
            totalQuantity: cartData.totalQuantity
        }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

// pravimo action creator
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data",
      })
    );

    async function sendRequest() {
      const response = await fetch(
        "https://react-http-7b980-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    }
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
