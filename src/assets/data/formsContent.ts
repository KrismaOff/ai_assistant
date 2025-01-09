import { ROUTES, buildPath } from "@/assets/data/paths";
import { constats } from "@/assets/data/constants";

const commonInputs = {
  first_name: {
    type: "text",
    id: "first_name",
    name: "first_name",
    placeholder: "Имя",
    required: true,
  },
  last_name: {
    type: "text",
    id: "last_name",
    name: "last_name",
    placeholder: "Фамилия",
    required: true,
  },
  email: {
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Email",
    autoComplete: "off",
    required: true,
  },
  password: {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Пароль",
    autoComplete: "off",
    required: true,
  },
};

const commonButtonStyles = {
  style: {
    background: "#007bff",
    color: "#ffffff",
  },
  hover: { background: "#0056b3" },
};

const {
  AUTH: {
    root,
    child: {
      LOGIN,
      REGISTER,
      VERIFY,
      FORGOTPASSWORD,
    },
  }
} = ROUTES;

export const formsContent = {
  [LOGIN]: {
    path: LOGIN,
    content: {
      title: "Вход в систему",
      button: "Зарегистрируйтесь",
      redirectText: "Ещё нет аккаунта?",
      redirectLink: buildPath(root, REGISTER),
      forgotPasswordText: "Забыли пароль?",
      forgotPasswordLink: buildPath(root, FORGOTPASSWORD.root, FORGOTPASSWORD.child.EMAIL)
    },
    inputs: {
      email: commonInputs.email,
      password: commonInputs.password,
    },
    buttons: {
      submit: {
        text: "Войти",
        ...commonButtonStyles,
      },
    }
  },
  [REGISTER]: {
    path: REGISTER,
    content: {
      title: "Регистрация",
      button: "Войти",
      redirectText: "Уже есть аккаунт?",
      redirectLink: buildPath(ROUTES.AUTH.root, ROUTES.AUTH.child.LOGIN),
    },
    inputs: {
      ...commonInputs,
    },
    buttons: {
      submit: {
        text: "Зарегистрироваться",
        ...commonButtonStyles,
      },
    },
  },
  [FORGOTPASSWORD.root]: {
    path: FORGOTPASSWORD.root,
    content: {
      title: "Забыли пароль?",
    },
    inputs: {
      email: commonInputs.email,
    },
    buttons: {
      submit: {
        text: "Отправить код на почту",
        ...commonButtonStyles,
      },
    },
  },
  [FORGOTPASSWORD.child.CODE]: {
    path: FORGOTPASSWORD.child.CODE,
    content: {
      title: "Забыли пароль?",
    },
    inputs: {
      code: {
        type: "number",
        id: "code",
        name: "code",
        placeholder: "Code",
        autoComplete: "off",
        required: true,
      },
      password: commonInputs.password,
      _password: {
        type: "password",
        id: "check",
        name: "password",
        placeholder: "Повторите пароль",
        autoComplete: "off",
        required: true,
      },

    },
    buttons: {
      submit: {
        text: "Отправить данные",
        type: "submit",
        ...commonButtonStyles,
      },
      cancel: {
        text: "Вернуться назад",
        type: "button",
        click: () => {
          localStorage.removeItem(constats.resetPassword)
          window.location.reload()
        },
        ...commonButtonStyles,
      }
    },
  }
};

export const verifyContent = {
  [VERIFY]: {
    path: VERIFY,
    content: {
      title: "Введите код",
    },
    buttons: {
      submit: {
        text: "Проверить код",
        ...commonButtonStyles,
      },
    }
  },
  // [FORGOTPASSWORD.child.CODE]: {
  //   path: FORGOTPASSWORD.child.CODE,
  //   content: {
  //     title: "Введите код",
  //   },
  //   buttons: {
  //     submit: {
  //       text: "Проверить код",
  //       ...commonButtonStyles,
  //     },
  //   }
  // },
};