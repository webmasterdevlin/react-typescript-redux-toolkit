import { render, screen } from "test-utils/testing-library-utils";
import HomePage from "../../pages/HomePage";

it("Navigation menus are present", () => {
  render(<HomePage />);

  const antiHeroes = screen.getByRole("button", { name: "Anti Heroes" });
  expect(antiHeroes).toHaveTextContent("Anti Heroes");

  const heroes = screen.getByRole("button", { name: "Heroes" });
  expect(heroes).toHaveTextContent("Heroes");

  const villains = screen.getByRole("button", { name: "Villains" });
  expect(villains).toHaveTextContent("Villains");
});
