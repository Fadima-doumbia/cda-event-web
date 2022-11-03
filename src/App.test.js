import { render, screen } from '@testing-library/react';
import App from './App';
import { compareEmail, filtered, formDataVerifyPassword, verifyIfStringIsEmpty } from './utils/UserFonction';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('compare email with input value email', () => {
  let mail = "";
  let response = verifyIfStringIsEmpty(mail);
  expect(response).toBeFalsy();
});

test('verify if variable content something', () => {
  let mail = "a";
  let response = verifyIfStringIsEmpty(mail);
  expect(response).toBeTruthy();
});

test('verify if variable number > 0', () => {
  let num = 0;
  let response = verifyIfStringIsEmpty(num);
  expect(response).toBeFalsy();
});

test('verify if variable number equal 4', () => {
  let num = 4;
  let response = verifyIfStringIsEmpty(num);
  expect(response).toBeTruthy();
});

test('verify if passsword is not good', () => {
  let passsword = "toto";
  let response = formDataVerifyPassword(passsword);
  expect(response).toBeFalsy();
});

test('verify if password is good', () => {
  let passsword = "Simplon93+";
  let response = formDataVerifyPassword(passsword);
  
  expect(response).toBeTruthy();
});

test('filtered by param', () => {
  let array = [{
    lastName: "doumbouya",
    username: "farida",
    role: {id:1, name: "user"},
    email: "farida@mail.com",
    phone: "786669090",
  },{
    lastName: "doum",
    username: "tata",
    role: {id:1, name: "user"},
    email: "farima@mail.com",
    phone: "786669090",
  },{
    lastName: "doumbia",
    username: "farima",
    role: {id:1, name: "user"},
    email: "farima@mail.com",
    phone: "786669090",
  },{
    lastName: "nathan",
    username: "pezz",
    role: {id:1, name: "admin"},
    email: "pezz@nath.com",
    phone: "786669090",
  }];
  let arrayFiltered = [{
    lastName: "doumbouya",
    username: "farida",
    role: {id:1, name: "user"},
    email: "farida@mail.com",
    phone: "786669090",
  },{
    lastName: "doumbia",
    username: "farima",
    role: {id:1, name: "user"},
    email: "farima@mail.com",
    phone: "786669090",
  }];
  let response = filtered(array, "lastName", "doumb");
  expect(response).toEqual(arrayFiltered);
});