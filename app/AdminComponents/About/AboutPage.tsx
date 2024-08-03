"use client";
import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../TextInput";
import Tiptap from "./Tiptap";
import Network from "@/utils/Network";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {};

const AboutPage = (props: Props) => {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  const [dataOk, setDataOk] = useState(true);
  const [openIconList, setOpenIconList] = useState(true);
  const [iconList, setIconList] = useState([]);
  const [values, setValues] = useState({
    user: "",
    firstName: "",
    lastName: "",
    title: "",
    description: "",
    degree: "",
    email: "",
    phone: "",
    location: {
      city: "",
      country: "",
    },
    social: [{ icon: "", id: "", name: "", url: "" }],
  });
  console.log(values);

  const {
    firstName,
    lastName,
    title,
    description,
    degree,
    email,
    phone,
    location,
    social,
  } = values;

  const { city, country } = location;

  const getAbout = async () => {
    try {
      const res = await Network.run(
        null,
        "GET",
        "/about/aboutget?id=" + userId,
        null
      );
      const icons = await Network.run(null, "GET", "icons", null);
      setValues(res.data);
      setIconList(icons.data ?? []);
    } catch (error) {
      setDataOk(false);
      console.log(error);
    }
  };
  const changeHandler = (name: string, value: any) => {
    setValues({ ...values, [name]: value });
  };
  const changeHandlerLocation = (name: string, value: any) => {
    setValues({ ...values, location: { ...location, [name]: value } });
  };
  const changeHandlerSocial = (value: string, index: any) => {
    const filteredSocial = social.filter((_, ind) => ind !== index);
    let currentSocial = social.find((_, ind) => ind == index);
    if (currentSocial) {
      currentSocial.url = value;
      setValues({ ...values, social: [...filteredSocial, currentSocial] });
    }
  };
  const pickIcon = (value: any, index: number) => {
    console.log(value);

    const filteredSocial = social.filter((_, ind) => ind !== index);
    let currentSocial = social.find((_, ind) => ind == index) ?? { url: "" };
    console.log("currentSocial", currentSocial);

    if (currentSocial) {
      currentSocial = { ...currentSocial, ...value };
      setValues({ ...values, social: [...filteredSocial, currentSocial] });
    }
  };

  const saveAbout = async () => {
    try {
      const res = await Network.run(
        null,
        !dataOk ? "POST" : "PATCH",
        "/about/updateabout",
        {
          data: values,
          method: !dataOk ? "POST" : "PATCH",
        }
      );
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div className='grid grid-cols-12 gap-3 self-stretch w-full h-full'>
      <div className='col-span-12 md:col-span-8'>
        <div className='p-1 grid grid-cols-1 md:grid-cols-4 gap-3'>
          <TextInput
            name={"firstName"}
            placeholder={"Ad"}
            value={firstName}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
          <TextInput
            name={"lastName"}
            placeholder={"Soyad"}
            value={lastName}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
          <TextInput
            name={"title"}
            placeholder={"Title"}
            value={title}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
          <TextInput
            name={"degree"}
            placeholder={"Pozisyon"}
            value={degree}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
        </div>
        <div className='p-1 grid grid-cols-1 md:grid-cols-4 gap-3'>
          <TextInput
            name={"email"}
            placeholder={"Email"}
            value={email}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
          <TextInput
            name={"phone"}
            placeholder={"Telefon"}
            value={phone}
            setValue={(e: any) => changeHandler(e.target.name, e.target.value)}
          />
          <TextInput
            name={"city"}
            placeholder={"Şehir"}
            value={city}
            setValue={(e: any) =>
              changeHandlerLocation(e.target.name, e.target.value)
            }
          />
          <TextInput
            name={"country"}
            placeholder={"Ülke"}
            value={country}
            setValue={(e: any) =>
              changeHandlerLocation(e.target.name, e.target.value)
            }
          />
        </div>

        <Tiptap description={description} changeHandler={changeHandler} />
      </div>
      <div className='col-span-12 md:col-span-4 self-stretch'>
        <div className='flex items-center justify-between mt-1'>
          <span className='h-10 w-20 flex justify-center items-center rounded-l border bg-slate-500 border-slate-500 text-white'>
            UserId
          </span>
          <span className='h-10 cursor-pointer w-full flex text-slate-900 font-semibold justify-center items-center border-slate-500 rounded-r border border-l-0 bg-slate-100'>
            {values.user}
          </span>
        </div>
        <h6 className='w-full my-0 mt-5'>Sosyal Medya</h6>
        <div>
          {social.map((item: any, index: number) => {
            return (
              <div key={item.id} className='flex justify-between items-center'>
                <div className='w-12 h-10  mr-1 mb-2' title={item.name}>
                  <Icon icon={social[index].icon} fontSize={40} />
                </div>
                <TextInput
                  name=''
                  value={social[index].url}
                  setValue={(e: any) => {
                    changeHandlerSocial(e.target.value, index);
                  }}
                  placeholder=''
                />
                <div className='w-12 h-10  mr-1 mb-2 flex justify-center items-center ml-1 rounded cursor-pointer'>
                  <Icon
                    icon={"oi:delete"}
                    fontSize={30}
                    className='text-slate-600 hover:text-orange-600'
                  />
                </div>
              </div>
            );
          })}
          <div className='flex justify-between items-center'>
            <div
              className='w-12 h-10  mr-1 mb-2 relative'
              onClick={() => setOpenIconList(true)}
              onMouseLeave={() => setOpenIconList(false)}
            >
              <Icon
                icon={"oi:plus"}
                fontSize={30}
                className='text-slate-600 hover:text-orange-600'
              />
              {/* <Icon
                icon={social[social.length]?.icon ?? "gg:select"}
                fontSize={40}
              /> */}
              {openIconList && (
                <div className='absolute w-11 -translate-y-1/4 h-40 bg-white border overflow-auto'>
                  {iconList?.map((item: any) => {
                    return (
                      <div
                        onClick={() => pickIcon(item, social.length)}
                        key={item.id}
                        className='w-full p-0.5 flex justify-center items-center cursor-pointer mb-1 hover:text-orange-600'
                      >
                        <Icon icon={item.icon} fontSize={40} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <TextInput
              name=''
              value={social[social.length]?.url}
              setValue={(e: any) => {
                changeHandlerSocial(e.target.value, social.length);
              }}
              placeholder=''
            />
            <div className='w-12 h-10  mr-1 mb-2 flex justify-center items-center ml-1 rounded cursor-pointer'></div>
          </div>
        </div>
      </div>
      <div className='w-full mt-2 py-2 flex justify-end items-center col-span-12 border-t'>
        <button
          className='p-2 bg-blue-600 rounded text-white'
          onClick={saveAbout}
        >
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
