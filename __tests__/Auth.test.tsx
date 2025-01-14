import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../app/(auth)/login/page";
import SignupPage from "@/app/(auth)/signup/page";

describe("LoginPage", () => {
  it("allows user to enter email", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const passwordInput = screen.getByPlaceholderText("password@johndoe");
    const loginButton = screen.getByRole("button", { name: /submit-login/i });

    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "testuser@password" } });

    const logspy = jest.spyOn(console, "log");
    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(logspy).toHaveBeenCalledWith({
        email: "testuser@gmail.com",
        password: "testuser@password",
      }),
    );

    logspy.mockRestore();
  });
});

describe("SingupPage", () => {
  it("Allows user to Create a new account.", async () => {
    render(<SignupPage />);

    const nameInput = screen.getByPlaceholderText("john doe");
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const passwordInput = screen.getByTestId("password");
    const confirmationPasswordInput = screen.getByTestId(
      "confirmationPassword",
    );
    const loginButton = screen.getByRole("button", { name: /submit-signup/i });

    fireEvent.change(nameInput, { target: { value: "test user" } });
    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "testuser@password" } });
    fireEvent.change(confirmationPasswordInput, {
      target: { value: "testuser@password" },
    });

    const logspy = jest.spyOn(console, "log");
    fireEvent.click(loginButton);

    await waitFor(() =>
      expect(logspy).toHaveBeenCalledWith({
        name: "test user",
        email: "testuser@gmail.com",
        password: "testuser@password",
      }),
    );

    logspy.mockRestore();
  });

  it("Displays error if different passwords are provided.", async () => {
    render(<SignupPage />);

    const nameInput = screen.getByPlaceholderText("john doe");
    const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
    const passwordInput = screen.getByTestId("password");
    const confirmationPasswordInput = screen.getByTestId(
      "confirmationPassword",
    );
    const loginButton = screen.getByRole("button", { name: /submit-signup/i });

    fireEvent.change(nameInput, { target: { value: "test user" } });
    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "testuser@password" } });
    fireEvent.change(confirmationPasswordInput, {
      target: { value: "testuserDifferent@password" },
    });

    fireEvent.click(loginButton);

    let errorMessage;

    await waitFor(
      () => (errorMessage = screen.getByLabelText("error-message")),
    );
    expect(errorMessage).toHaveTextContent("Passwords don't match");
  });
});
