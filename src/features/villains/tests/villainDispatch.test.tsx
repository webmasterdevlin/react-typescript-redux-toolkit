import {
  getVillainsAction,
  postVillainAction,
  deleteVillainAction,
} from "../villainAsyncActions";
import { softDeleteVillainAction } from "../villainSlice";
import { VillainStateType } from "../villainTypes";
import { store } from "../../../App";

describe("VillainsPage dispatch", () => {
  let state: VillainStateType;
  let newVillain = {
    id: "123",
    firstName: "Devlin",
    lastName: "Duldulao",
    house: "Angular Devs",
    knownAs: "Angular trainer",
  };

  /* Select the store.getState().villain again
   * before running another expect. It's just how it is */
  it("should dispatch getVillainsAction", async () => {
    await store.dispatch(getVillainsAction());
    state = store.getState().villain;
    expect(state.villains).toHaveLength(2);
  });

  it("should dispatch postVillainAction", async () => {
    await store.dispatch(postVillainAction(newVillain));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(3);
  });

  it("should dispatch deleteVillainByIdAction", async () => {
    await store.dispatch(deleteVillainAction(state.villains[0].id));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(2);
  });

  it("should dispatch removeVillainByIdTemporaryAction", () => {
    store.dispatch(softDeleteVillainAction(state.villains[0].id));
    state = store.getState().villain;
    expect(state.villains).toHaveLength(1);
  });
});
