import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../app/(auth)/login/page";

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
