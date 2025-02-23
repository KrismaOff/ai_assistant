import { useState, useEffect } from 'react'

import { sendRequest } from "@/utils/sendRequest";
import { tokenCheck } from '@/utils/tokenCheck';
import { ProfileDataInterface } from "@/types";

export default function useHandleProfileRequest(path: string): ProfileDataInterface {
    
    const [profileData, setProfileData] = useState<ProfileDataInterface>()

    useEffect(() => {
          sendRequest({
            method: "get",
            path: path,
            token: tokenCheck(),
            callback: (res: ProfileDataInterface) => setProfileData(res)
          });
    }, [path])
    
    return profileData

}
