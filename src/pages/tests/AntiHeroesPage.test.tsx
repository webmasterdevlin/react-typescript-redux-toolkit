import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "test-utils/testing-library-utils";

import AntiHeroesPage from "pages/AntiHeroesPage";
import { getAntiHeroesAction } from "features/antiHeroes/antiHeroAsyncActions";
import { store } from "App";

describe("Anti Heroes Page", () => {
  const changeHandler = jest.fn();

  it("should render title", () => {
    render(<AntiHeroesPage />);

    const title = screen.getByRole("heading", { name: "Anti HeroesPage" });
    expect(title).toBeInTheDocument();
  });

  it("should render loading message", async () => {
    render(<AntiHeroesPage />);

    const loading = screen.getByRole("heading", {
      name: "Loading.. Please wait..",
    });
    expect(loading).toHaveTextContent("Loading.. Please wait..");
  });

  it("should dispatch getAntiHeroesAction", async () => {
    await store.dispatch(getAntiHeroesAction());
    let state = store.getState().antiHero;
    expect(state.antiHeroes).toHaveLength(6);
  });

  it("should save character button be in disabled", () => {
    render(<AntiHeroesPage />);

    const saveCharacterButton = screen.getByRole("button", {
      name: "Save Character",
    });
    expect(saveCharacterButton).toBeDisabled();
  });

  it("should show exact number of anti heroes in main content and navigation bar", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(6);
      expect(screen.queryByRole("total-anti-heroes")).toHaveTextContent("6");
    });
  });

  it("should be able to add new anti hero", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      expect(screen.queryAllByRole("card")).toHaveLength(6);
      expect(screen.queryByRole("total-anti-heroes")).toHaveTextContent("6");
    });
  });

  it("should add new anti hero", async () => {
    render(<AntiHeroesPage />);

    await waitFor(() => {
      const firstNameTextInput = screen.getByLabelText("firstName");
      expect(firstNameTextInput).toBeInTheDocument();
      fireEvent.change(firstNameTextInput, { target: { value: "Devlin" } });
      expect(firstNameTextInput).toHaveValue("Devlin");

      const lastNameTextInput = screen.getByLabelText("lastName");
      expect(lastNameTextInput).toBeInTheDocument();
      fireEvent.change(lastNameTextInput, { target: { value: "Duldulao" } });
      expect(lastNameTextInput).toHaveValue("Duldulao");

      const houseTextInput = screen.getByLabelText("house");
      expect(houseTextInput).toBeInTheDocument();
      fireEvent.change(houseTextInput, { target: { value: "Marvel" } });
      expect(houseTextInput).toHaveValue("Marvel");

      const knownAsTextInput = screen.getByLabelText("knownAs");
      expect(knownAsTextInput).toBeInTheDocument();
      fireEvent.change(knownAsTextInput, { target: { value: "React Man" } });
      expect(knownAsTextInput).toHaveValue("React Man");
    });
  });
});
