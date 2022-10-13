import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignCover from "../shared/components/SignCover";
import { carouselData } from "../utils/DataArray";
import ClanePay from "../shared/assets/logo2.svg";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";

/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

function Login() {
  const [form] = Form.useForm();
  const ref = useRef(null);
  const navigate = useNavigate();
  const INITIALVALUES = {
    email: "",
    password: "",
  };

  const {
    Auth: { login },
  } = useDispatch();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const onFinish = async (values) => {
    const res = await login(values);

    if (res.code === 200) {
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen lg:w-[600px] lg:m-auto md:w-full ">
      <div className="flex-1 px-[100px] lg:px-6 py-[86px] overflow-y-scroll scrollbar-hide">
        <div className="mb-[60px]">
          <img src={ClanePay} alt="clanelogo" />
        </div>

        <div className="w-full">
          <Form
            form={form}
            initialValues={INITIALVALUES}
            layout="vertical"
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <input autocomplete="on" type="hidden" value="something" />

            <Form.Item
              label="Business Email"
              style={{ marginBottom: "24px" }}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                type="email"
                autocomplete="nope"
                ref={ref}
                placeholder="Enter your business email address"
                className="h-[50px] w-full rounded-[5px] bg-[#FFFFFF] border border-solid border-[#EAEAEC] pl-[20px]"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
                { min: 6 },
                // {
                // 	validator: (_, value) =>
                // 		value && value.includes('A')
                // 			? Promise.resolve()
                // 			: Promise.reject('Password does not match criteria.'),
                // },
              ]}
            >
              <Input.Password
                placeholder="choose a passcode"
                autocomplete="new-password"
                className="h-[50px] w-full rounded-[5px] bg-[#FFFFFF] border border-solid border-[#EAEAEC] pl-[20px]"
              />
            </Form.Item>
            <Form.Item shouldUpdate style={{ marginTop: "40px" }}>
              {() => (
                <button
                  type="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length > 0
                  }
                  className="w-full h-[48px] border text-white rounded-lg border-none bg-[#7655DA] disabled:bg-[#9893A5]"
                >
                  Proceed
                </button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="flex-1 lg:hidden">
        <SignCover carouselData={carouselData} />
      </div>
    </div>
  );
}

export default Login;
