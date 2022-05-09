import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import './assets/css/App.css';

import Register from './components/functional/users/register';
import Modal from './components/functional/modal';
import Loader from './components/presentational/loader';

const App = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Toggle modal and clear status
  const handleModal = useCallback((errors = []) => {
    setErrors(errors);
  }, [setErrors]);

  const handleLoader = useCallback((loading = true) => {
    setIsLoading(loading);
  }, [setIsLoading]);

  // open Modal to show errors
  useEffect(() => {
    setShowModal(errors.length > 0);
  }, [errors]);

  return (
    <div className="App">
      {/* ...Some code not shown */}
      <main className="bg-navbar pt-1">
        {/* ...Some code not shown */}
        <Switch>
          <Route
            exact
            path="/sign_up"
            render={() => <Register handleModal={handleModal} handleLoader={handleLoader} />}
          />
        </Switch>
      </main>
      <div className="blend-main-footer" />
      <footer className="footer">
        {/* ...Some code not shown */}
      </footer>
      {showModal && <Modal errors={errors} handleModal={handleModal} />}
      {isLoading && <Loader />}
    </div>
  );
};

export default App;
