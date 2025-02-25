import React, { useState } from "react";
import "./Profile.css";

import useHandleProfileRequest from "@/hooks/useHandleProfileRequest";
import Loading from "@/components/templates/Loading/Loading";
import TogglePanel from "@/components/templates/TogglePanel/TogglePanel";
import Banner from "@/components/templates/Banner/Banner";

import { buildPath, ROUTES } from "@/assets/data/paths";

import logoutIcon from "@/assets/icons/profile/logout.svg";
import supportIcon from "@/assets/icons/profile/support.svg";
import personalIcon from "@/assets/icons/profile/personal.svg";
import telegramIcon from "@/assets/icons/profile/telegram.svg";
import vkIcon from "@/assets/icons/profile/vk.svg";

import useHandleAuthResponse from "@/hooks/useHandleAuthResponse";

import { constats } from "@/assets/data/constants";

interface Props {
  type: string;
}

const Profile = ({ type }: Props) => {

  const [openToggle, setOpenToggle] = useState(null)

  const forgotPassword = ROUTES.AUTH.child.FORGOTPASSWORD.root;

  const [submit] = useHandleAuthResponse(forgotPassword);

  const profileData = useHandleProfileRequest(type);

  const logoutFromAccount = () => {
    localStorage.removeItem(constats.token);
    window.location.reload();
  };

  const openForgotPassword = (): void => {
    const type = forgotPassword;
    const email = profileData.email;
    localStorage.setItem(constats.resetPassword, email);
    submit({ email: email }, type);
  };

  return (
    <div className="profile-container">
      <div className="profile">
        <Banner/>

        <div className="profile-section">
          <div className="profile-info">
            <h1>Profile</h1>
            <div className="profile-info-user">
              {profileData ? (
                <p>
                  {profileData.first_name} {profileData.last_name}
                </p>
              ) : (
                <Loading size={50} />
              )}
            </div>
          </div>

          <div className="profile-settings">
            <h2>Settings</h2>
            <div className="profile-settings-container">
              <TogglePanel
                id={1}
                toggle={[openToggle, setOpenToggle]}
                first
                text="Мы в соц сетях"
                links={[
                  { href: "https://t.me/Law_GPT ", icon: telegramIcon, text: "" },
                  { href: "https://vk.ru/lawgptru", icon: vkIcon, text: "" },
                ]}
                radius={["15px 15px 0 0", "0"]}
              />
              <TogglePanel
                id={2}
                toggle={[openToggle, setOpenToggle]}
                first
                text="Support"
                links={[{ href: "#", icon: telegramIcon, text: "" }]}
              />
              <TogglePanel
                id={3}
                toggle={[openToggle, setOpenToggle]}
                click={openForgotPassword}
                text="Customer service"
                links={[
                  {
                    href: buildPath(
                      ROUTES.AUTH.root,
                      ROUTES.AUTH.child.FORGOTPASSWORD.root,
                      ROUTES.AUTH.child.FORGOTPASSWORD.child.EMAIL
                    ),
                    text: "Сменить пароль",
                  },
                ]}
                radius={["0 0 15px 15px", "0 0 15px 15px"]}
              />
            </div>
          </div>

          <div className="profile-more">
            <h2>More</h2>
            <div className="profile-more-button" onClick={logoutFromAccount}>
              <p>Log out</p>
              <img src={logoutIcon} alt="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
