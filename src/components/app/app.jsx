import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useWindowSize } from "../../hooks/resize.js";
import { Switch, Route } from "react-router-dom";
import { fetchAllIngredients } from "../../services/action-creators/ingredients-action-creators";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import appStyles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  SET_IFMOBILE,
  REMOVE_CURRENT,
  CLEAR_ORDERDATA,
  SET_IFMOBILEORDERED,
  REMOVE_MODALINGREDIENTS,
  CLOSE_MOBILEMENU,
  SET_WINDOWDATA,
  CLEAR_BUN,
  CLEAR_STUFFINGLIST,
  SET_LOGGED,
} from "../../services/actions";

import Main from "../../pages/main";
import { Login } from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound from "../../pages/not-found";
import Orders from "../../pages/profile/orders/orders";
import Feed from "../../pages/feed";
import OrdersId from "../../pages/profile/orders-id/orders-id";
import IngredientData from "../ingredient-data/ingredient-data";
import ProtectedRouteLogged from "../protected-route-logged/protected-route-logged";
import ProtectedRouteNotLogged from "../protected-route-not-logged/protected-route-not-logged";
import ProtectedPass from "../protected-pass/protected-pass";

const { page } = appStyles;

function App() {
  const [width, height] = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    handleSetMobile();

    handleSetWindowData();
  }, [width, height]);

  useEffect(() => {
    const tokenExists = localStorage.getItem("refreshToken");
    if (tokenExists) {
      dispatch({
        type: SET_LOGGED,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllIngredients());
  }, []);

  const isPerformed = useSelector((state) => state.order.isPerformed);

  const areIngredientsShown = useSelector(
    (state) => state.ingredients.areIngredientsShown
  );

  const isMobileMenuOpened = useSelector(
    (store) => store.mobile.isMobileMenuOpened
  );

  function closeIsPerformed() {
    dispatch({
      type: CLEAR_ORDERDATA,
    });

    dispatch({
      type: CLEAR_BUN,
    });

    dispatch({
      type: CLEAR_STUFFINGLIST,
    });
  }

  function closeModalIngredientsShown() {
    dispatch({
      type: REMOVE_CURRENT,
    });

    dispatch({
      type: REMOVE_MODALINGREDIENTS,
    });
  }

  const handleSetMobile = () => {
    if (width < 790) {
      dispatch({
        type: SET_IFMOBILE,

        payload: true,
      });
    } else {
      dispatch({
        type: SET_IFMOBILE,

        payload: false,
      });

      dispatch({
        type: SET_IFMOBILEORDERED,

        payload: false,
      });

      if (isMobileMenuOpened) {
        dispatch({
          type: CLOSE_MOBILEMENU,
        });
      }
    }
  };

  function setFormValidation(e, setValue, setValueValidity, setValueError) {
    e.preventDefault();
    setValue(e.target.value);
    setValueValidity(e.target.validity.valid);
    setValueError(e.target.validationMessage);
  }

  const handleSetWindowData = () => {
    dispatch({
      type: SET_WINDOWDATA,
      payload: {
        width: width,
        height: height,
      },
    });
  };

  return (
    <>
      <div className={page}>
        <AppHeader />

        <Switch>
          <Route path="/" exact>
            <Main />{" "}
          </Route>

          <ProtectedRouteNotLogged exact path="/login">
            <Login setFormValidation={setFormValidation} />{" "}
          </ProtectedRouteNotLogged>

          <ProtectedRouteNotLogged path="/register" exact>
            <Register setFormValidation={setFormValidation} />{" "}
          </ProtectedRouteNotLogged>

          <ProtectedRouteNotLogged path="/forgot-password" exact>
            <ForgotPassword setFormValidation={setFormValidation} />
          </ProtectedRouteNotLogged>

          <ProtectedPass path="/reset-password">
            <ResetPassword setFormValidation={setFormValidation} />
          </ProtectedPass>

          <ProtectedRouteLogged exact path="/profile">
            <Profile setFormValidation={setFormValidation} />
          </ProtectedRouteLogged>

          <Route path="/ingredients/:id" exact>
            <IngredientData />
          </Route>

          <ProtectedRouteLogged path="/feed" exact>
            <Feed />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path="/profile/orders" exact>
            <Orders />
          </ProtectedRouteLogged>

          <ProtectedRouteLogged path="/profile/orders/:id" exact>
            <OrdersId />
          </ProtectedRouteLogged>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>{" "}
      {isPerformed ? (
        <Modal
          closeModal={closeIsPerformed}
          type="orderPerformed"
          isOpen={true}
        >
          <OrderDetails />
        </Modal>
      ) : (
        <></>
      )}
      {areIngredientsShown && (
        <Modal closeModal={closeModalIngredientsShown} isOpen={true}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

export default App;
