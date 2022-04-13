import React, { useState, useContext, useEffect } from "react";
import { Label, FormGroup, Input, Form, Button } from "reactstrap";
import Stars from "../stars/stars";
import { Context } from "../../context";
import "./guest-form-edit.css";

export default function GuestFormEdit({ showModal, guestsData }) {
  const [formIsValid, setformIsValid] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [phoneIsChecked, setPhoneIsChecked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentIsValid, setCommentIsValid] = useState(true);
  const [commentIsChecked, setCommentIsChecked] = useState(false);
  const phoneReg = /^\s*\+?375((33\d{7})|(29\d{7})|(44\d{7}|)|(25\d{7}))\s*$/;

  const {
    guestFormId,
    starRateValue,
    refreshData,
    closeGuestForm
  } = useContext(Context);

  useEffect(() => {
    formIsValidCheck();
  });

  const formIsValidCheck = () => {
    if (phoneIsChecked && commentIsChecked) {
      setformIsValid(true);
    } else {
      setformIsValid(false);
    }
  };

  const spaceCheck = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
    }
  };

  const phoneOnInput = (e) => {
    setPhone(e.target.value);
    if (phoneReg.test(e.target.value) && e.target.value.length > 12) {
      setPhoneIsValid(true);
      setPhoneIsChecked(true);
    } else {
      setPhoneIsChecked(false);
    }
  };

  const phoneIsValidCheck = (e) => {
    if (phoneReg.test(e.target.value) && e.target.value.length > 12) {
      setPhoneIsValid(true);
    } else {
      setPhoneIsValid(false);
    }
  };

  const commentOnInput = (e) => {
    setComment(e.target.value);
    if (e.target.value.length > 20) {
      setCommentIsValid(true);
      setCommentIsChecked(true);
    } else {
      setCommentIsValid(true);
      setCommentIsChecked(false);
    }
  };

  const commentIsValidCheck = (e) => {
    if (e.target.value.length > 20) {
      setCommentIsValid(true);
    } else {
      setCommentIsValid(false);
    }
  };

  const submitForm = () => {
    if (!localStorage.getItem("guestsList")) {
      localStorage.setItem("guestsList", JSON.stringify(guestsData));
    }
    let data = JSON.parse(localStorage.getItem("guestsList"));
    let guestData = {
      key: guestFormId,
      name: data[guestFormId].name,
      eatsPizza: true,
      madeFeedback: true,
      comment: comment,
      phone: phone,
      stars: starRateValue
    };
    let newData = data.map((item, index) => {
      if (item.key === guestFormId) {
        return guestData;
      } else {
        return item;
      }
    });
    localStorage.setItem("guestsList", JSON.stringify(newData));
    refreshData();
  };

  return (
    <Form>
      <FormGroup>
        <Label for="phone">Enter Your Phone:</Label>
        <Input
          id="phone"
          name="phone"
          placeholder="+375XXXXXXXXX"
          autoComplete="off"
          valid={phoneIsChecked}
          invalid={!phoneIsValid}
          onInput={phoneOnInput}
          onKeyPress={spaceCheck}
          onBlur={phoneIsValidCheck}
          onClick={() => {
            setPhoneIsValid(true);
          }}
          maxLength={13}
        />
        {!phoneIsValid ? (
          <div className="error">
            Enter correct number (+375(29/33/25/44)XXXXXXX)
          </div>
        ) : null}
      </FormGroup>
      <FormGroup>
        <div>Rate us, please:</div>
        <Stars starRateValue={starRateValue} />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Comment:</Label>
        <Input
          id="exampleText"
          name="text"
          type="textarea"
          onClick={() => {
            setCommentIsValid(true);
          }}
          onBlur={commentIsValidCheck}
          onInput={commentOnInput}
          invalid={!commentIsValid}
          valid={commentIsChecked}
          maxLength={200}
        />
        {!commentIsValid ? (
          <div className="error">Please, type at least 20 symbols</div>
        ) : null}
      </FormGroup>
      <Button onClick={closeGuestForm}>Cancel</Button>{" "}
      {formIsValid ? (
        <Button
          color="primary"
          onClick={submitForm}
          // disabled={!formIsValid}
          // disabled={!formIsValid}
        >
          Submit
        </Button>
      ) : null}
    </Form>
  );
}
