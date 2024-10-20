import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog"; // Adjust the path to Blog component
import "@testing-library/jest-dom/vitest"; // For Jest matchers

beforeEach(() => {
  // Simulate a logged-in user with a token
  window.localStorage.setItem(
    "loggedBlogappUser",
    JSON.stringify({ token: "dummyToken" })
  );
});

afterEach(() => {
  // Clear localStorage after each test
  window.localStorage.clear();
});

// Mock Togglable component to bypass its internal logic
vi.mock("../components/Togglable", () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>, // Mock Togglable as a simple div
}));

test("renders blog title and author", () => {
  // Mock blog data
  const blog = {
    title: "Component testing with React Testing Library",
    author: "Test Author",
    url: "www.test.com",
    likes: 5,
  };

  // Render the Blog component with mock data
  render(<Blog blog={blog} />);

  // Assert that the title and author are rendered
  const titleAndAuthorElement = screen.getByText(
    "Component testing with React Testing Library Test Author"
  );

  expect(titleAndAuthorElement).toBeInTheDocument();
});
