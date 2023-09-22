import { call, put } from "redux-saga/effects";
import RequestGestUser from "../Request/RequestUser";
import { setUser } from "../../Action/action";

export function* handelergetuser() {
  try {
    const response = yield call(RequestGestUser);
    const {data} = response; 
    yield put(setUser(data)); 
  } catch (error) {
    console.log("errore");
  }
}
