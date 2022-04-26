import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HallerDenPage from "./components/pages/HallerDenPage";
import HallerDenEpisodePage from "./components/pages/HallerDenEpisodePage";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route exact path={"/"} element={<HallerDenPage/>}/>
                    <Route exact path={"/:id"} element={<HallerDenEpisodePage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
