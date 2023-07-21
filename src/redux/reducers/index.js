import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import profile from "./profile";
import transfer from "./transfer";
import transaction from "./transaction";

const reducer = combineReducers({
    auth,
    profile,
    transfer,
    transaction
});

export default reducer;