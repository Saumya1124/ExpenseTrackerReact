import { render , screen} from "@testing-library/react";
import Head from "./head";

test('test' , () => {
    render(<Head />);

    const testText = screen.getByText(/Hello/i)
    expect(testText).toBeInTheDocument()
})