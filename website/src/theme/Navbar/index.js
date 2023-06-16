import React, { useEffect } from 'react';
import Navbar from '@theme-original/Navbar';

// this file is required, because otherwise react will discard changes done by the raw script on location change

export default function NavbarWrapper(props) {
  // only run the actual script once
  useEffect(() => {
    window['addVersions']();
  }, []);

  return (
    <>
      <Navbar {...props} />
    </>
  );
}
