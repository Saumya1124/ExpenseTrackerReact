import { render , screen} from "@testing-library/react";
import Login from "./Login";

test('test' , () => {
    render(<Login />);

    const testText = screen.getByText(/LogIn/i)
    expect(testText).toBeInTheDocument()
})