import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

  
import MapIframe from './components/GoogleMapComponent';



import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';



/**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  
  function RequestProfileData() {
      // Silently acquires an access token which is then attached to a request for MS Graph data
      instance
          .acquireTokenSilent({
              ...loginRequest,
              account: accounts[0],
          })
          .then((response) => {
              callMsGraph(response.accessToken).then((response) => setGraphData(response));
          });
  }
  
  return (
      <>
          <h5 className="card-title">Welcome {accounts[0].name}</h5>
          <br/>
          {graphData ? (
              <ProfileData graphData={graphData} />
          ) : (
              <Button variant="secondary" onClick={RequestProfileData}>
                  Request Profile Information
              </Button>
          )}
      </>
  );
};





/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
  return (
      <div className="App">
          <AuthenticatedTemplate>
              <ProfileContent />
          </AuthenticatedTemplate>
  
          <UnauthenticatedTemplate>
              <h5>
                  <center>
                      Please sign-in to see your profile information.
                  </center>
              </h5>
          </UnauthenticatedTemplate>
      </div>
  );
};
  
function App() {
    return (
      <Router>
        <PageLayout>
          <center>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/map">Map</Link>
                </li>
              </ul>
            </nav>
            <Routes>
    <Route path="/map" element={<MapIframe />} />
    <Route path="/" element={<MainContent />} />
</Routes>

          </center>
        </PageLayout>
      </Router>
    );
  }
  

export default App
