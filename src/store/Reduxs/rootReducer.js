import { combineReducers } from 'redux';
import reducerSignInSignUp from "../../components/SignIn/Reducer/signInSignUpReducer";
import reducerProductsList from "../../components/ProductsList/Reducer/productsListReducer";
import reducerSubBar from "../../components/SubBar/Reducer/subBarReducer";
import reducerNavBar from "../../components/NavBar/Reducer/navBarReducer";
import reducerMainPage from "../../components/MainPage/Reducer/mainPageReducer";
import reducerPopUp from "../../components/PopUp/Reducer/popUpReducer";
import reducerModel from "../../components/Model/Reducer/modelReducer";
import reducerCheckOut from "../../components/CheckOut/Reducer/checkOutReducer";

const rootReducer = combineReducers({ 
    rSignInSignUp: reducerSignInSignUp,
    rProductsList: reducerProductsList,
    rSubBar: reducerSubBar,
    rNavBar: reducerNavBar,
    rMainPage : reducerMainPage,
    rPopUp : reducerPopUp,
    rModel : reducerModel,
    rCheckOut : reducerCheckOut
 });
 
export default rootReducer;