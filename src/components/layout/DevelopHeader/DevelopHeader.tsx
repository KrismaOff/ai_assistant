import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './DevelopHeader.css';

import { ROUTES, buildPath } from '@/assets/data/paths'
import { constats } from '@/assets/data/constants';

const DevelopHeader = () => {

  const { LOGIN, REGISTER, VERIFY } = ROUTES.AUTH.child
  const { EMAIL, CODE } = ROUTES.AUTH.child.FORGOTPASSWORD.child
  const PROFILE = ROUTES.PROFILE.root
  const HOME = ROUTES.HOME.root

  const [visible, setVisible] = useState<boolean>(true)

  const clearLocalStorage = () => {
    localStorage.clear()
    window.location.reload()
  }

  const handleVisible = () => setVisible((prev: boolean) => !prev)

  const handleToken = (type: string) => {
    if (localStorage.getItem(constats[type])) localStorage.removeItem(constats[type])
    else localStorage.setItem(constats[type], "test")
    window.location.reload()
  }

  return (
    <div className="DevelopHeader">
      <button onClick={handleVisible}>{visible ? "Скрыть" : "Показать"} DevelopHeader</button>
      {visible && <>
        <button onClick={() => handleToken(constats.tempToken)}>tempToken</button>
        <button onClick={() => handleToken(constats.token)}>token</button>
        <button onClick={clearLocalStorage}>Очистить localStorage</button>
        <div className="DevelopHeader_main_cont">
          <div className="DevelopHeader_Cont"> {/* AUTH */}
            <p>AUTH</p><hr />
            <p>
              <Link to={buildPath(ROUTES.AUTH.root, LOGIN)}>{LOGIN}</Link>{" "}
              <span className="red">token</span>{" "}
              <span className="red">tempToken</span>
            </p>
            <p>
              <Link to={buildPath(ROUTES.AUTH.root, REGISTER)}>{REGISTER}</Link>{" "}
              <span className="red">token</span>{" "}
              <span className="red">tempToken</span>
            </p>
            <p>
              <Link to={buildPath(ROUTES.AUTH.root, VERIFY)}>{VERIFY}</Link>{" "}
              {/* <span className="red">token</span>{" "} */}
              <span className="green">tempToken</span>
            </p>
          </div>

          <div className="DevelopHeader_Cont"> {/* Forgot Password */}
            <p>Forgot Password</p><hr />
            <p>
              <Link to={buildPath(ROUTES.AUTH.root, ROUTES.AUTH.child.FORGOTPASSWORD.root, EMAIL)}>{EMAIL} (EMAIL)</Link>{" "}
              <span className="red">resetPassword</span>{" "}
              <span className="red">token</span>{" "}
              <span className="red">tempToken</span>
            </p>
            <p>
              <Link to={buildPath(ROUTES.AUTH.root, ROUTES.AUTH.child.FORGOTPASSWORD.root, CODE)}>{CODE} (CODE)</Link>{" "}
              <span className="green">resetPassword</span>{" "}
              {/* <span className="red">token</span>{" "} */}
              {/* <span className="red">tempToken</span> */}
            </p>
          </div>

          <div className="DevelopHeader_Cont"> {/* Other */}
            <p>Other</p><hr />
            <p>
              <Link to={buildPath(PROFILE)}>{PROFILE}</Link>{" "}
              <span className="green">token</span>{" "}
              {/* <span className="red">tempToken</span> */}
            </p>
            <p>
              <Link to={buildPath("")}>{HOME}</Link>{" "}
              <span className="green">token</span>{" "}
              {/* <span className="red">tempToken</span> */}
            </p>
          </div>
        </div>
        <div className="DevelopHeader_common_cont">
          <table className="DevelopHeader_common_cont_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(localStorage).map(id => <tr key={id}>
                <td>{id}</td>
                <td>{localStorage.getItem(id)}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </>}
    </div>
  );
};

export default DevelopHeader;

// с / - с начала 
// без / - к конца 
