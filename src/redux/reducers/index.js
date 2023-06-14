import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import profile from "./profile";
import transfer from "./transfer";

const reducer = combineReducers({
    auth,
    profile,
    transfer
});

export default reducer;