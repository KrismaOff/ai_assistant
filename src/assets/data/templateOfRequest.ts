import { FormData } from "@/types";

interface TemplateForRequest {
    [key: string]: FormData; // Каждое значение — объект `FormData`
}

export const templateForRequest: TemplateForRequest = {
    login: {
        email: "",
        password: ""    
    },
    register: {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    },
    verify: {
        code: ""
    }
}