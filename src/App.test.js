import { render, screen } from '@testing-library/react';
import App from './App';
import { compareEmail, verifyIfStringIsEmpty } from './utils/UserFonction';

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