import WholeMouth from "./components/WholeMouth";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { LowerLeftCentralIncisor } from "./components/Teeth/LowerLeftCentralIncisor";
import { LowerLeftFirstMolar } from "./components/Teeth/LowerLeftFirstMolar";
import { LowerLeftWisdomTooth } from "./components/Teeth/LowerLeftWisdomTooth";
import { LowerLeftSecondMolar } from "./components/Teeth/LowerLeftSecondMolar";
import { LowerLeftFirstPremolar } from "./components/Teeth/LowerLeftFirstPremolar";
import { LowerLeftSecondPremolar } from "./components/Teeth/LowerLeftSecondPremolar";
import { LowerLeftCanine } from "./components/Teeth/LowerLeftCanine";
import { LowerLeftLateralIncisor } from "./components/Teeth/LowerLeftLateralIncisor";
import { LowerRightCentralIncisor } from "./components/Teeth/LowerRightCentralIncisor";
import { LowerRightFirstMolar } from "./components/Teeth/LowerRightFirstMolar";
import { LowerRightWisdomTooth } from "./components/Teeth/LowerRightWisdomTooth";
import { LowerRightSecondMolar } from "./components/Teeth/LowerRightSecondMolar";
import { LowerRightFirstPremolar } from "./components/Teeth/LowerRightFirstPremolar";
import { LowerRightSecondPremolar } from "./components/Teeth/LowerRightSecondPremolar";
import { LowerRightCanine } from "./components/Teeth/LowerRightCanine";
import { LowerRightLateralIncisor } from "./components/Teeth/LowerRightLateralIncisor";

export default function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path="/" element={<WholeMouth />} />
            <Route
              path="/lower-left-central-incisor"
              element={<LowerLeftCentralIncisor />}
            />
            <Route
              path="/lower-left-first-molar"
              element={<LowerLeftFirstMolar />}
            />
            <Route
              path="/lower-left-wisdom-tooth"
              element={<LowerLeftWisdomTooth />}
            />
            <Route
              path="/lower-left-second-molar"
              element={<LowerLeftSecondMolar />}
            />
            <Route
              path="/lower-left-first-premolar"
              element={<LowerLeftFirstPremolar />}
            />
            <Route
              path="/lower-left-second-premolar"
              element={<LowerLeftSecondPremolar />}
            />
            <Route path="/lower-left-canine" element={<LowerLeftCanine />} />
            <Route
              path="/lower-left-lateral-incisor"
              element={<LowerLeftLateralIncisor />}
            />
            <Route
              path="/lower-right-central-incisor"
              element={<LowerRightCentralIncisor />}
            />
            <Route
              path="/lower-right-first-molar"
              element={<LowerRightFirstMolar />}
            />
            <Route
              path="/lower-right-wisdom-tooth"
              element={<LowerRightWisdomTooth />}
            />
            <Route
              path="/lower-right-second-molar"
              element={<LowerRightSecondMolar />}
            />
            <Route
              path="/lower-right-first-premolar"
              element={<LowerRightFirstPremolar />}
            />
            <Route
              path="/lower-right-second-premolar"
              element={<LowerRightSecondPremolar />}
            />
            <Route path="/lower-right-canine" element={<LowerRightCanine />} />
            <Route
              path="/lower-right-lateral-incisor"
              element={<LowerRightLateralIncisor />}
            />
          </Routes>
          <div
            style={{
              marginBottom: 105 /* temp fix until I figure out a way to accurately represent 100vh on mobile */,
            }}
          ></div>
        </div>
      </Router>
    </div>
  );
}
