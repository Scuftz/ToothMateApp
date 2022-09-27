import WholeMouth from './components/WholeMouth'
import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { LowerLeftCentralIncisor } from './components/Teeth/LowerLeftCentralIncisor'
import { LowerLeftFirstMolar } from './components/Teeth/LowerLeftFirstMolar'
import { LowerLeftWisdomTooth } from './components/Teeth/LowerLeftWisdomTooth'
import { LowerLeftSecondMolar } from './components/Teeth/LowerLeftSecondMolar'
import { LowerLeftFirstPremolar } from './components/Teeth/LowerLeftFirstPremolar'
import { LowerLeftSecondPremolar } from './components/Teeth/LowerLeftSecondPremolar'
import { LowerLeftCanine } from './components/Teeth/LowerLeftCanine'
import { LowerLeftLateralIncisor } from './components/Teeth/LowerLeftLateralIncisor'
import { LowerRightCentralIncisor } from './components/Teeth/LowerRightCentralIncisor'
import { LowerRightFirstMolar } from './components/Teeth/LowerRightFirstMolar'
import { LowerRightWisdomTooth } from './components/Teeth/LowerRightWisdomTooth'
import { LowerRightSecondMolar } from './components/Teeth/LowerRightSecondMolar'
import { LowerRightFirstPremolar } from './components/Teeth/LowerRightFirstPremolar'
import { LowerRightSecondPremolar } from './components/Teeth/LowerRightSecondPremolar'
import { LowerRightCanine } from './components/Teeth/LowerRightCanine'
import { LowerRightLateralIncisor } from './components/Teeth/LowerRightLateralIncisor'
import { UpperRightFirstPremolar } from './components/Teeth/UpperRightFirstPremolar'
import { UpperLeftWisdomTooth } from './components/Teeth/UpperLeftWisdomTooth'
import { UpperRightSecondPremolar } from './components/Teeth/UpperRightSecondPremolar'
import { UpperLeftLateralIncisor } from './components/Teeth/UpperLeftLateralIncisor'
import { UpperRightFirstMolar } from './components/Teeth/UpperRightFirstMolar'
import { UpperRightSecondMolar } from './components/Teeth/UpperRightSecondMolar'
import { UpperRightCanine } from './components/Teeth/UpperRightCanine'
import { UpperLeftCentralIncisor } from './components/Teeth/UpperLeftCentralIncisor'
import { UpperRightCentralIncisor } from './components/Teeth/UpperRightCentralIncisor'
import { UpperRightWisdomTooth } from './components/Teeth/UpperRightWisdomTooth'
import { UpperRightLateralIncisor } from './components/Teeth/UpperRightLateralIncisor'
import { UpperLeftFirstPremolar } from './components/Teeth/UpperLeftFirstPremolar'
import { UpperLeftSecondPremolar } from './components/Teeth/UpperLeftSecondPremolar'
import { UpperLeftCanine } from './components/Teeth/UpperLeftCanine'
import { UpperLeftFirstMolar } from './components/Teeth/UpperLeftFirstMolar'
import { UpperLeftSecondMolar } from './components/Teeth/UpperLeftSecondMolar'

import Login from './pages/Login'

const PrivateRoute = props => {
  const { children } = props
  const isLoggedIn = localStorage.getItem('id') !== null;
  const location = useLocation()

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/login"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}

export default function App() {
  return (
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route exact path="/" element={<PrivateRoute><WholeMouth /></PrivateRoute>} />

            {/* LOWER LEFT */}

            <Route path="/lower-left-wisdom" element={<PrivateRoute><LowerLeftWisdomTooth /></PrivateRoute>} />
            <Route path="/lower-left-second-molar" element={<PrivateRoute><LowerLeftSecondMolar /></PrivateRoute>} />
            <Route path="/lower-left-first-molar" element={<PrivateRoute><LowerLeftFirstMolar /></PrivateRoute>} />
            <Route path="/lower-left-second-premolar" element={<PrivateRoute><LowerLeftSecondPremolar /></PrivateRoute>} />
            <Route path="/lower-left-first-premolar" element={<PrivateRoute><LowerLeftFirstPremolar /></PrivateRoute>} />
            <Route path="/lower-left-canine" element={<PrivateRoute><LowerLeftCanine /></PrivateRoute>} />
            <Route path="/lower-left-lateral-incisor" element={<PrivateRoute><LowerLeftLateralIncisor /></PrivateRoute>} />
            <Route path="/lower-left-central-incisor" element={<PrivateRoute><LowerLeftCentralIncisor /></PrivateRoute>} />

            {/* LOWER RIGHT */}

            <Route path="/lower-right-wisdom" element={<PrivateRoute><LowerRightWisdomTooth /></PrivateRoute>} />
            <Route path="/lower-right-second-molar" element={<PrivateRoute><LowerRightSecondMolar /></PrivateRoute>} />
            <Route path="/lower-right-first-molar" element={<PrivateRoute><LowerRightFirstMolar /></PrivateRoute>} />
            <Route path="/lower-right-second-premolar" element={<PrivateRoute><LowerRightSecondPremolar /></PrivateRoute>} />
            <Route path="/lower-right-first-premolar" element={<PrivateRoute><LowerRightFirstPremolar /></PrivateRoute>} />
            <Route path="/lower-right-canine" element={<PrivateRoute><LowerRightCanine /></PrivateRoute>} />
            <Route path="/lower-right-lateral-incisor" element={<PrivateRoute><LowerRightLateralIncisor /></PrivateRoute>} />
            <Route path="/lower-right-central-incisor" element={<PrivateRoute><LowerRightCentralIncisor /></PrivateRoute>} />

            {/* UPPER LEFT */}

            <Route path="/upper-left-wisdom" element={<PrivateRoute><UpperLeftWisdomTooth /></PrivateRoute>} />
            <Route path="/upper-left-second-molar" element={<PrivateRoute><UpperLeftSecondMolar /></PrivateRoute>} />
            <Route path="/upper-left-first-molar" element={<PrivateRoute><UpperLeftFirstMolar /></PrivateRoute>} />
            <Route path="/upper-left-second-premolar" element={<PrivateRoute><UpperLeftSecondPremolar /></PrivateRoute>} />
            <Route path="/upper-left-first-premolar" element={<PrivateRoute><UpperLeftFirstPremolar /></PrivateRoute>} />
            <Route path="/upper-left-canine" element={<PrivateRoute><UpperLeftCanine /></PrivateRoute>} />
            <Route path="/upper-left-lateral-incisor" element={<PrivateRoute><UpperLeftLateralIncisor /></PrivateRoute>} />
            <Route path="/upper-left-central-incisor" element={<PrivateRoute><UpperLeftCentralIncisor /></PrivateRoute>} />

            {/* UPPER RIGHT */}

            <Route path="/upper-right-wisdom" element={<PrivateRoute><UpperRightWisdomTooth /></PrivateRoute>} />
            <Route path="/upper-right-second-molar" element={<PrivateRoute><UpperRightSecondMolar /></PrivateRoute>} />
            <Route path="/upper-right-first-molar" element={<PrivateRoute><UpperRightFirstMolar /></PrivateRoute>} />
            <Route path="/upper-right-second-premolar" element={<PrivateRoute><UpperRightSecondPremolar /></PrivateRoute>} />
            <Route path="/upper-right-first-premolar" element={<PrivateRoute><UpperRightFirstPremolar /></PrivateRoute>} />
            <Route path="/upper-right-canine" element={<PrivateRoute><UpperRightCanine /></PrivateRoute>} />
            <Route path="/upper-right-lateral-incisor" element={<PrivateRoute><UpperRightLateralIncisor /></PrivateRoute>} />
            <Route path="/upper-right-central-incisor" element={<PrivateRoute><UpperRightCentralIncisor /></PrivateRoute>} />
          </Routes>
          <div
            style={{
              marginBottom: 105 /* temp fix until I figure out a way to accurately represent 100vh on mobile */,
            }}
          ></div>
        </div>
      </Router>
  )
}
