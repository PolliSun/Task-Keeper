import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/index";
import { CreateNote } from "../pages/create";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element= {<Home />} />
            <Route path="/create" element= {<CreateNote />} />
        </Routes>
    )
}
