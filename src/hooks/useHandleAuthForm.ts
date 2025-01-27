import React, { useState, useMemo } from 'react'
import { Location } from "react-router-dom";
import { templateForRequest } from '@/assets/data/templateOfRequest'

import { FormData } from "@/types";

type useHandleAuthFormReturn = [FormData, (e: React.ChangeEvent<HTMLInputElement>) => void]

export default function useHandleAuthForm(location: Location, type?: string): useHandleAuthFormReturn {

    const initialData = useMemo(() => {
        const path = location.pathname.split("/").at(-1) || ""
        return templateForRequest[path] || {}
    }, [location.pathname])

    const [data, setData] = useState<FormData>(initialData);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value, id} = e.target;
        setData((prev: FormData) => ({...prev, [id]: value}))
    }

    return [data, handleChange];
}

